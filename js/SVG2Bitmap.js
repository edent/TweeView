function SVG2Bitmap(svg, receiver, params) {

    "use strict";

    // check-in
    if (!params) {
        params = {};
    }
    if (!params.scale || params.scale < 0) {
        params.scale = 1;
    }

    if (!svg || !svg.nodeName) {
        console.error('Wrong arguments : should be \n SVG2Bitmap(SVGElement, function([canvasElement],[dataURL]) || IMGElement || CanvasElement [, {parameters})');
        return;
    }

    // in case user passed a framed svg
    var frame;
    // for both <iframe> and <embed>, we can try to wait for the load event
    var loadHandler = function() {
        // remove our handler
        this.removeEventListener('load', loadHandler);
        // recall the function
        SVG2Bitmap(this, receiver, params);
    };

    if (svg.nodeName === "OBJECT" || svg.nodeName === "IFRAME") {
        if (!svg.contentDocument || (svg.contentDocument.readyState === 'complete' && !svg.contentDocument.documentElement)) {
            console.error('Unable to access the svg node : make sure it comes from the same domain or that the container has finished loading');
            return;
        }
        // we can add a loadHandler to iframe elements, so we do it
        if (svg.contentDocument.readyState !== 'complete') {
            svg.addEventListener('load', loadHandler);
            return;
        }
        // keep it somewhere so we can replace it further
        frame = svg;
        svg = svg.contentDocument.documentElement;

    } else if (svg.nodeName === 'EMBED' && svg.getSVGDocument) {
        frame = svg;
        svg = svg.getSVGDocument();
        if (!svg) {
            frame.addEventListener('load', loadHandler);
            frame.onerror = function() {
                console.error('Unable to access the svg node : make sure it comes from the same domain or that the container has finished loading');
            };
            frame.src = frame.src;
            return;
        }
    }

    // the element passed is not an svg element
    if (svg.nodeName !== 'svg') {
        // get the first one in its content
        var target = svg.querySelector('svg');
        if (!target) {
        	var qS = '[src*=".svg"]';
        	var obj = svg.querySelector('iframe'+qS+', embed'+qS) || svg.querySelector('object[data*=".svg"]');
        	if(obj){
        		SVG2Bitmap(obj, receiver, params);
        		return;
        		}
            console.error('unable to access the svg node, make sure it has been appended to the document');
            return;
        }else{
        	svg = target;
        }
    }


    var xlinkNS = "http://www.w3.org/1999/xlink",
        svgNS = 'http://www.w3.org/2000/svg';

    // avoid modifying the original one
    var clone = svg.cloneNode(true);

    var defs;
    var getDef = function() {
        // Do we have a `<defs>` element already ?
        defs = clone.querySelector('defs') || document.createElementNS(svgNS, 'defs');
        if (!defs.parentNode) {
            clone.insertBefore(defs, clone.firstElementChild);
        }
    };

    // an object to do some various tests
    var tester = (function() {
        // check if the canvas is tainted
        var tCanvas = document.createElement('canvas');
        var tCtx = tCanvas.getContext('2d');
        tCanvas.width = tCanvas.height = 1;
        var isTainted = function(canvas) {
            var tainted = false;
            tCtx.drawImage(canvas, 0, 0);
            try {
                tCanvas.toDataURL();
            } catch (e) {
                tainted = true;
                tCanvas = tCanvas.cloneNode(true);
                tCtx = tCanvas.getContext('2d');
            }
            return tainted;
        };
        var doc = document.implementation.createHTMLDocument('test');
        var base = document.createElement('base');
        doc.head.appendChild(base);
        var anchor = document.createElement('a');
        doc.body.appendChild(anchor);
        var URL = function(url, baseIRI) {
            base.href = baseIRI;
            anchor.href = url;
            return anchor;
        };
        return {
            isTainted: isTainted,
            URL: URL
        };
    })();

    // a simple flag used for some edge cases with dirty nameSpace declarations
    var cleanedNS = false;
    // The final function that will export our svgNode to our receiver

    var exportDoc = function() {
        // check if our svgNode has width and height properties set to absolute values
        // otherwise, canvas won't be able to draw it
        var bbox = frame ? frame.getBoundingClientRect() : svg.getBoundingClientRect();

        if (svg.width.baseVal.unitType !== 1) {
            clone.setAttribute('width', bbox.width);
        }

        if (svg.height.baseVal.unitType !== 1) {
            clone.setAttribute('height', bbox.height);
        }

        // serialize our node
        var svgData;
        // detect IE, that's dirty...
        if(typeof ActiveXObject !== 'undefined'){
        	// IE's XMLSerializer mess around with non-default namespaces, 
			// no way to catch it ; we make the removal default then...
			var cleanNS = function(el) {
				var attr = Array.prototype.slice.call(el.attributes);

				for (var i = 0; i < attr.length; i++) {
					var name = attr[i].name;
					if (name.indexOf(':') > -1 && name.indexOf('xlink') < 0){
						el.removeAttribute(name);
					}
				}   
			};
			cleanNS(clone);
			var children = clone.querySelectorAll('*');
			for (var i = 0; i < children.length; i++) {
				cleanNS(children[i]);
			}
        }
        
        // we don't need the style attribute of the clone since we'll use the one from the original node
        // Thus, it can create bad things with absolutely positioned elements.
        clone.removeAttribute('style');
        
        svgData = (new XMLSerializer()).serializeToString(clone);

        var svgURL = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData);

        var svgImg = new Image();

        var load_handler = function() {

            // if we set a canvas as receiver, then use it
            // otherwise create a new one
            var canvas = (receiver && receiver.nodeName === 'CANVAS') ? receiver : document.createElement('canvas');

            // keep a reference of the original node into our canvas
            canvas.originalSVG = frame || svg;

            // IE11 doesn't set a width on svg images...
            canvas.width = bbox.width * params.scale;
            canvas.height = bbox.height * params.scale;

            if (!canvas.width || !canvas.height) {
                console.error('The document is not visible and can not be rendered');
                return;
            }
            var ctx = canvas.getContext('2d');
            if (params.backgroundColor) {
                ctx.fillStyle = params.backgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            var s = params.scale;
            var innerRect = frame ? svg.getBoundingClientRect() : {top: 0,left: 0};
            
            // strange bug in IE11 where it seems the image isn't loaded the first time...
			try{
	            ctx.drawImage(this, innerRect.left, innerRect.top, this.width * s || canvas.width, this.height * s || canvas.height);
			}catch(e){
				setTimeout(load_handler.bind(this), 200);
			}
            // a default function to replace the svg element with the bitmap version
            if (!receiver) {
                receiver = function(c) {
                    var original = frame || svg;
                    original.parentNode.replaceChild(c, original);
                };
            }

            if (tester.isTainted(canvas)) {
                console.warn("Your browser has tainted the canvas.");
                if (receiver.nodeName === 'IMG') {
                    receiver.parentNode.replaceChild(canvas, receiver);
                } else {
					// make the canvas looks like the svg
					canvas.setAttribute('style', getSVGStyles(canvas));
					// a container element
					if (receiver !== canvas && receiver.appendChild) {
						receiver.appendChild(canvas);
					}
					// if we did set a function
					else if (typeof receiver === 'function') {
						receiver(canvas, null);
					}
				}
				return;
            }

            if (receiver.nodeName === 'IMG') {
                // make the img looks like the svg
                receiver.setAttribute('style', getSVGStyles(receiver));
                receiver.src = canvas.toDataURL(params.type, params.quality);
            } else {
                // make the canvas looks like the svg
                canvas.setAttribute('style', getSVGStyles(canvas));
                // a container element
                if (receiver !== canvas && receiver.appendChild) {
                    receiver.appendChild(canvas);
                }
                // if we did set a function
                else if (typeof receiver === 'function') {
                    receiver(canvas, canvas.toDataURL(params.type, params.quality));
                }
            }
        };

        var error_handler = function(e) {
			console.error("Couldn't export svg, please check that the svgElement passed is a valid svg document.");
			return;
        };

		svgImg.onload = load_handler;
        svgImg.onerror = error_handler;

        svgImg.src = svgURL;

    };
    // get all the rules applied to our svg elements 
    var parseStyles = function() {
        var cssIRIs = [],
            styleSheets = [];
        var i;
        // get the stylesheets of the document (ownerDocument in case svg is in <iframe> or <object>)
        var docStyles = svg.ownerDocument.styleSheets;

        // transform the live StyleSheetList to an array to avoid endless loop
        for (i = 0; i < docStyles.length; i++) {
            styleSheets.push(docStyles[i]);
        }

        if (styleSheets.length) {
            getDef();
            svg.matches = svg.matches || svg.webkitMatchesSelector || svg.mozMatchesSelector || svg.msMatchesSelector || svg.oMatchesSelector;
        }

        // iterate through all document's stylesheets
        for (i = 0; i < styleSheets.length; i++) {
        	var currentStyle = styleSheets[i]

            var rules;
            try {
                rules = currentStyle.cssRules;
            } catch (e) {
                continue;
            }
            // create a new style element
            var style = document.createElement('style');
            // some stylesheets can't be accessed and will throw a security error
            var l = rules && rules.length;
            // iterate through each cssRules of this stylesheet
            for (var j = 0; j < l; j++) {
                // get the selector of this cssRules
                var selector = rules[j].selectorText;
                // probably an external stylesheet we can't access
                if(!selector){
                	continue;
                	}
                
                // is it our svg node or one of its children ?
                if ((svg.matches && svg.matches(selector)) || svg.querySelector(selector)) {

                    var cssText = rules[j].cssText;
                    
					var reg = new RegExp(/url\((.*?)\)/g);
	                var matched = [];
					while ((matched = reg.exec(cssText)) !== null) {
                        var ext = matched[1].replace(/\"/g, '');
                        var href = currentStyle.href || location.href;
                        cssIRIs.push([ext, href]);
                        var a = tester.URL(ext, href);
                        var iri = (href===location.href && ext.indexOf('.svg')<0)? a.hash : a.href.substring(a.href.lastIndexOf('/') + 1);
                        var newId = '#' + iri.replace(/\//g, '_').replace(/\./g, '_').replace('#', '_');
                        cssText = cssText.replace(ext, newId);
					}
                    // append it to our <style> node
                    style.innerHTML += cssText + '\n';
                }
            }
            // if we got some rules
            if (style.innerHTML) {
                // append the style node to the clone's defs
                defs.appendChild(style);
            }
        }
        // small hack to avoid border and margins being applied inside the <img>
        var s = clone.style;
        s.border = s.padding = s.margin = 0;
        s.transform = 'initial';

        parseXlinks(cssIRIs);
    };

    var getSVGStyles = function(node) {

        // create a testing element
        var dest = node.cloneNode(true);

        // insert the clone in the document if the parentNode is not a Document.
        if (!svg.parentNode.documentElement) {
            svg.parentNode.insertBefore(dest, svg);
        } else {
            svg.parentNode.documentElement.appendChild(dest);
        }

        // get the destination's computed styles
        var dest_comp = getComputedStyle(dest);
        // get the iframe or svg's computed styles
        var svg_comp = getComputedStyle(frame || svg);
        var mods = "";
        for (var i = 0; i < svg_comp.length; i++) {
            // the witdh and height are set from bbox so we should not need this
            // also, this allows us to scale the export
            if (svg_comp[i] === 'width' || svg_comp[i] === 'height') {
                continue;
            }
            // different styles
            if (svg_comp[svg_comp[i]] !== dest_comp[svg_comp[i]]) {
                // append it
                mods += svg_comp[i] + ':' + svg_comp[svg_comp[i]] + ';';
            }
        }
        // remove our testing element
        dest.parentNode.removeChild(dest);
        return mods;
    };

    var parseImages = function() {

        var images = clone.querySelectorAll('image'),
            total = images.length,
            encoded = 0,
            i;

        // if there is no <image> element
        if (total === 0) {
            exportDoc();
            return;
        }
        // get the already appended images bounding rect
        var originalImages = [];
        var oImg = svg.querySelectorAll('image');
        for (i = 0; i < images.length; i++) {
            // that should be the same ones but better to check
            if (oImg[i] && oImg[i].isEqualNode(images[i])) {
                originalImages.push(oImg[i]);
                continue;
            } else {
                var found = null;
                for (var j = 0; j < oImg.length; j++) {
                    if (oImg[j].isEqualNode(images[i])) {
                        found = oImg[j];
                        break;
                    }
                }
                originalImages.push(found);
            }
        }

        // that's quite a bit of lines, but it saves a lot of computations if we do treat large images
        var preserveAspectRatio = function(source, destination, userString) {

            var srcWidth = source.width,
                srcHeight = source.height,
                destinationW = destination.width,
                destinationH = destination.height;

            // we should keep the whole source
            var aRMeet = function(args) {

                var srcRatio = (srcHeight / srcWidth),
                    destRatio = (destinationH / destinationW),

                    resultWidth = destRatio > srcRatio ? destinationW : destinationH / srcRatio,
                    resultHeight = destRatio > srcRatio ? destinationW * srcRatio : destinationH;

                var getPos = function(arg, res, dest) {

                    var max = Math.max(res, dest),
                        min = Math.min(res, dest);

                    switch (arg) {
                        case 'Min': return 0;
                        case 'Mid': return (max - min) / 2;
                        case 'Max': return max - min;
                        default:    return 'invalid';
                    }
                };

                var obj = [
                    returnedImg,
                    0,
                    0,
                    srcWidth,
                    srcHeight,
                    getPos(args[0], resultWidth, destinationW),
                    getPos(args[1], resultHeight, destinationH),
                    resultWidth,
                    resultHeight
                ];

                if (obj[5] === 'invalid' || obj[6] === 'invalid') {
                    return default_obj;
                }

                return obj;
            };

            // we should slice the larger part
            var aRSlice = function(args) {

                var resultWidth, resultHeight;

                var a = function() {
                    resultWidth = destinationW;
                    resultHeight = srcHeight * destinationW / srcWidth;
                };

                var b = function() {
                    resultWidth = srcWidth * destinationH / srcHeight;
                    resultHeight = destinationH;
                };

                if (destinationW > destinationH) {
                    a();
                    if (destinationH > resultHeight) {
                        b();
                    }
                } else if (destinationW === destinationH) {
                    if (srcWidth > srcHeight) {
                        b();
                    } else {
                        a();
                    }
                } else {
                    b();
                    if (destinationW > resultWidth) {
                        a();
                    }
                }

                var getPos = function(arg, res, dest, src) {
                    switch (arg) {
                        case 'Min': return 0;
                        case 'Mid': return (res - dest) / 2 * src / res;
                        case 'Max': return (res - dest) * src / res;
                        default:    return 'invalid';
                    }
                };

                var x = getPos(args[0], resultWidth, destinationW, srcWidth);
                var y = getPos(args[1], resultHeight, destinationH, srcHeight);

                var obj = [
                    returnedImg,
                    x,
                    y,
                    srcWidth - x,
                    srcHeight - y,
                    0,
                    0,
                    resultWidth - (x * (resultWidth / srcWidth)),
                    resultHeight - (y * (resultHeight / srcHeight)),
                ];

                if (obj[1] === 'invalid' || obj[2] === 'invalid') {
                    return default_obj;
                }

                return obj;
            };

            // check if the object passed was drawable over a canvas
            var returnedImg = source.nodeName === 'IMG' || source.nodeName === 'VIDEO' || source.nodeName === 'CANVAS' ? source : null;

            // if an invalid string or none is set as the preserveAspectRatio, this should be considered as "xMidYMid meet"
            var default_obj = aRMeet(['Mid', 'Mid']);

            if (!userString) {
                return default_obj;
            } else {

                var args = userString.trim().split(' '),
                    minMidMax = args[0].replace('x', '').split('Y');

                switch (args[args.length - 1]) {
                    case "meet":  return aRMeet(minMidMax);
                    case "slice": return aRSlice(minMidMax);
                    default:      return default_obj;
                }

            }
        };

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // some UAs don't fire a load event on <image> element
        var loader = function(url) {
            var img = new Image();
            img.onload = function() {
                // that was the last one
                if (++encoded === total) {
                    exportDoc();
                }
            };
            img.src = url;
        };


        // convert an external bitmap image to a dataURL
        var toDataURL = function(image, original) {

            var img = new Image();

            var error_handler = function() {

                console.warn('failed to load an image at : ', img.src);
                if (!params.keepImageHolder) {
                    image.parentNode.removeChild(image);
                }
                if (--total === encoded) {
                    exportDoc();
                }

            };

            if (!params.noCORS) {
                img.crossOrigin = 'Anonymous';
            }

            img.onload = function() {
                var attr, rect;
                if (original) {
                    attr = image.getAttribute('preserveAspectRatio');
                    rect = original.getBoundingClientRect();
                }
                // if the image is scaled down in the image
                if (original && rect && (rect.width * params.scale < this.width || rect.height * params.scale < this.height)) {
                    // set the canvas size to the <image>'s one
                    canvas.width = rect.width * params.scale;
                    canvas.height = rect.height * params.scale;
                    // draw only what is needed (About 3000ms saved on 5M images !)
                    var ar = preserveAspectRatio(this, canvas, attr);
                    ctx.drawImage.apply(ctx, ar);

                } else {

                    canvas.width = this.width;
                    canvas.height = this.height;
                    ctx.drawImage(this, 0, 0);

                }

                if (tester.isTainted(canvas)) {
                    error_handler();
                    return;
                }

                var dataURL = canvas.toDataURL();
                image.setAttributeNS(xlinkNS, 'href', dataURL);
                loader(dataURL);

            };

            // No CORS set in the response		
            img.onerror = function() {
                // save the src
                var oldSrc = this.src;
                // there is an other problem
                this.onerror = error_handler;
                // remove the crossorigin attribute
                this.removeAttribute('crossorigin');
                // retry
                this.src = '';
                this.src = oldSrc;
            };

            // load our external image into our img
            img.src = image.getAttributeNS(xlinkNS, 'href');
        };

        // get an external svg doc to data String
        var parseFromUrl = function(url, element) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {

                if (this.status === 200) {

                    var response = this.responseText || this.response;
                    var dataUrl = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent('<svg' + response.split('<svg')[1]);
                    element.setAttributeNS(xlinkNS, 'href', dataUrl);
                    loader(dataUrl);

                }
                // request failed with xhr, try as an <img>
                else {
                    toDataURL(element);
                }

            };
            xhr.onerror = function() {
                toDataURL(element);
            };
            // IE will throw an error if we try to get a file from an other domain
            try {
                xhr.open('GET', url);
            } catch (e) {
                toDataURL(element);
                return;
            }
            xhr.send();
        };

        // loop through all our <images> elements
        for (i = 0; i < images.length; i++) {

            var href = images[i].getAttributeNS(xlinkNS, 'href');
            // check if the image is external
            if (href && href.indexOf('data:image') < 0) {
                // if it points to another svg element
                if (href.indexOf('.svg') > 0) {
                    parseFromUrl(href, images[i]);
                } else {
                    // a pixel image
                    toDataURL(images[i], originalImages[i]);
                }
            }
            // else increment our counter
            else if (++encoded === total) {
                exportDoc();
                return;
            }
        }
    };

    var parseXlinks = function(css) {

        var i;
        var elemToParse = 0;
        var docsToFetch = 0;
        // our actual doc
        var current_doc = {
            href: location.href.replace(location.hash, '').replace(/#/g, ''),
            pathname: location.pathname,
            filename: '',
            innerElements: [],
            parsedElements: [],
            doc: svg.ownerDocument,
            base : location.href.replace(location.hash, '').replace(/#/g, '')
        };
        // an array for our external documents		
        var documents = [current_doc];

        var nsSelector_support = (function() {
            // create a test element
            var test = document.createElementNS(svgNS, 'use');
            // set its href attribute to something that should be found
            test.setAttributeNS(xlinkNS, 'href', '#__#');
            // append it to our document
            clone.appendChild(test);
            // if querySelector returns null then the selector is not supported
            var supported = !!clone.querySelector('[*|href*="#"]');
            // the test is done, remove the element
            clone.removeChild(test);
            return supported;
        })();

        var queryXlinks = function(el) {
            return nsSelector_support ? el.querySelectorAll('[*|href*="#"]') :
                // if the selector is not supported
                (function() {
                    var arr = [];
                    var children = el.querySelectorAll('*');
                    for (i = 0; i < children.length; i++) {
                        // search the xlink:href attribute
                        var xl_attr = children[i].getAttributeNS(xlinkNS, 'href');
                        // we only want the ones that refer to elements
                        if (xl_attr && xl_attr.indexOf('#') > -1) {
                            arr.push(children[i]);
                        }
                    }
                    return arr;
                })();
        };

        var getURLs = function(el) {
            // the list of all attributes that can have a <funciri> (url()) as value
            var url_attrs = ["style", "clip-path", "src", "cursor", "fill", "filter", "marker", "marker-start", "marker-mid", "marker-end", "mask", "stroke"];
            // build our selector string
            var urlSelector = '[*|' + url_attrs.join('*="url"], *[*|') + '*="url"]';

            var list = el.querySelectorAll(urlSelector);
            return list;
        };

        var getXternalAttributes = function(el, doc) {

            var externals = [];

            var ext_attr = function(ele, type) {
                var that = {};
                that.element = ele;
                that.type = type;
                that.attributes = [];
                that.requestedElements = [];
                that.parentDoc = doc;
                var att;
                if (type === 'xl') {

                    att = ele.attributes['xlink:href'];
                    if(!att){
                    	var href = ele.attributes.href;

                    	if(href && href.namespaceURI && href.namespaceURI.indexOf('xlink')>-1){
                    		att = href;
                    	}else{
                    		return false;
                    	}
                    }
                    that.attributes.push(att);
                    that.requestedElements.push(att.value);

                } else {

                    att = ele.attributes;
                    for (var j = 0; j < att.length; j++) {
	                    var reg = new RegExp(/url\((.*?)\)/g);
	                    var matched = [];
						while ((matched = reg.exec(att[j].value)) !== null) {
							that.attributes.push(att[j]);
							that.requestedElements.push(matched[1].replace(/"/g, ''));
						}
                    }
                }
                return that;

            };

            var xl = queryXlinks(el);

            var url = getURLs(el);

            var i;

            var att;

            for (i = 0; i < xl.length; i++) {
            	att = ext_attr(xl[i], 'xl');
            	if(!att){
            		continue;
            	}
                externals.push(att);
                att = null;
            }
  
            for (i = 0; i < url.length; i++) {
            	att = ext_attr(url[i], 'url');
            	if(!att){
            		continue;
            	}
                externals.push(att);
                att = null;
            }

            var self_attrs = el.attributes;

            for (i = 0; i < self_attrs.length; i++) {
                var self_attr = self_attrs[i];
                if (self_attr.name === 'xlink:href') {
                    externals.push(
                        new ext_attr(el, 'xl')
                    );
                } else {
                    var matched = self_attr.value.match(/url\((.*)\)/);
                    if (matched && matched.length > 1) {
                        externals.push(
                            new ext_attr(el, 'url')
                        );
                    }
                }
            }



            return externals;
        };

        var changeImagesHref = function(elem, base) {
            var images = elem.querySelectorAll('image');
            for (var i = 0; i < images.length; i++) {
                var href = images[i].getAttributeNS(xlinkNS, 'href');
                var newHref = tester.URL(href, base).href;
                if (href !== newHref) {
                    images[i].setAttributeNS(xlinkNS, 'href', newHref);
                }
            }
        };

        var getInnerElements = function() {
            var i;
            for (i = 0; i < documents.length; i++) {
                var doc = documents[i];
                if (!doc.doc) {
                    continue;
                }
                var inners = doc.innerElements;
                if (inners.length === doc.parsedElements.length) {
                    continue;
                }
                var j;
                for (j = 0; j < inners.length; j++) {
                    var node = doc.doc.getElementById(inners[j]);
                    if (!node) {
                        console.warn("Couldn't find this element", inners[j]);
                        elemToParse--;
                        continue;
                    }
                    var clone = node.cloneNode(true);
                    clone.id = doc.filename + '_' + inners[j];

                    changeImagesHref(clone, doc.base);

                    defs.appendChild(clone);
                    parse_attributes(getXternalAttributes(clone, doc));
                    doc.parsedElements.push(inners[j]);
                    elemToParse--;
                }
            }

            if (!docsToFetch && !elemToParse) {
                parseImages();
            }
        };

        // fetch the external documents
        var fetchExternalDoc = function(ext_doc) {
            var url = ext_doc.href;
            // create a new request
            var xhr = new XMLHttpRequest();

            xhr.onload = function() {
                // everything went fine
                if (this.status === 200) {
                    var response = this.responseText || this.response;
                    if (!response) {
                        return;
                    }
                    try {
                        ext_doc.doc = new DOMParser().parseFromString(response, 'text/html');
                    } catch (ie) {
                        ext_doc.doc = document.implementation.createHTMLDocument(ext_doc.filename);
                        ext_doc.doc.body.innerHTML = response;
                    }

                    ext_doc.base = url;
                } else {
                    ext_doc.doc = null;
                    elemToParse -= ext_doc.innerElements.length;
                    console.warn('could not load this external document :', url, '\n' +
                        'Those elements are lost : ', ext_doc.innerElements.join(' , '));
                }
                // In case we were the last one
                if (!--docsToFetch) {
                    getInnerElements();
                }
            };
            xhr.onerror = function(e) {
                ext_doc.doc = null;
                elemToParse -= ext_doc.innerElements.length;
                console.warn('could not load this external document', url);
                console.warn('Those elements are lost : ', ext_doc.innerElements.join(' , '));
                if (!--docsToFetch) {
                    getInnerElements();
                }
            };
            xhr.open('GET', url);
            xhr.send();
        };

        var append_doc = function(iri, doc) {
            var a = tester.URL(iri, doc.base);
            var original_filename = a.href.substring(a.href.lastIndexOf('/') + 1).replace(a.hash, '');
            var filename = original_filename.replace(/\./g, '_');
            var hash = a.hash.replace('#', '');
            var href = a.href.replace(a.hash, '');
            var newId = filename + '_' + hash;

            for (var i = 0; i < documents.length; i++) {
                var docI = documents[i];
                // already in the list
                if (docI.href === href) {
                    // not an external doc
                    if (i === 0) {	
                        if (clone.getElementById(hash)) {
                            return hash;
                        } else {
                            newId = '_' + hash;
                        }
                    }
                    // but not in the innerElements
                    if (docI.innerElements.indexOf(hash) < 0) {
                        // this would mean we failed to load it
                        if (docI.doc !== null) {
                            elemToParse++;
                        } else {
                            console.warn('this element is also lost ', hash);
                        }
                        docI.innerElements.push(hash);
                        return newId;
                    }
                    // someone else already asked for this element
                    else {
                        return newId;
                    }
                }
            }

            elemToParse++;
            docsToFetch++;

            var that = {
                href: href,
                filename: filename,
                innerElements: [hash],
                parsedElements: [],
            };

            // add it to our array
            documents.push(that);
            fetchExternalDoc(that);
            return newId;

        };

        var parse_attributes = function(external_attributes) {

            if (external_attributes.length && !defs) {
                getDef();
            }

            var i, j;
            for (i = 0; i < external_attributes.length; i++) {

                var ext = external_attributes[i];

                for (j = 0; j < ext.requestedElements.length; j++) {

                    var requested = ext.requestedElements[j];
                    var newId = '#' + append_doc(requested, ext.parentDoc);
                    var attr = ext.attributes[j];
                    var newValue = attr.value.replace(requested, newId);
                    // fixes a strange UpperCase bug in Edge
                    var name = (attr.name.toUpperCase() === attr.name) ? attr.name.toLowerCase() : attr.name;
                    ext.element.setAttribute(name, newValue);

                }

            }
        };

        for (i = 0; i < css.length; i++) {
            append_doc(css[i][0], {
                base: css[i][1]
            });
        }

        parse_attributes(getXternalAttributes(clone, documents[0]));

        if (!docsToFetch) {
            if (!elemToParse) {
                parseImages();
            } else {
                getInnerElements();
            }
        }
    };

    parseStyles();
}