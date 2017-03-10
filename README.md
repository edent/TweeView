# TweeView

A Tree View For Tweets

## Demo

## Requirements

* PHP (sorry haters, but it works everywhere)
* [Multibyte Support for PHP](http://php.net/manual/en/mbstring.installation.php)
* Twitter API keys
	* OK, so this is the controversial bit.  Twitter has a *private* API for getting conversation threads.  It is not exposed to normal developers.
	* In order for this to work, you will need a copy of Twitter's private API keys.
	* I've **no idea** where to get them from. If you ask me, I cannot help you.
	* Using these private keys *may* be a breach of [Twitter's Developers Agreement](https://dev.twitter.com/overview/terms/agreement-and-policy). I'm not a lawyer (sorry mum) but loads of big Twitter apps already breach these.
	* Use at your own risk. Don't come crying to me if Twitter shouts at you.

## History

This was inspired by [Lucy Pepper](http://www.lucypepper.com/lp/) who pitched the concept of the "Monkey Deck" on fledgling social network App.net.

<a data-flickr-embed="true" data-footer="true"  href="https://www.flickr.com/photos/unkemptwomen/8080741422/in/photostream/" title="monkey.deck2"><img src="https://c1.staticflickr.com/9/8324/8080741422_267d0213c7_h.jpg" width="1600" height="666" alt="monkey.deck2"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

From that, I built [HyperThread](https://shkspr.mobi/blog/2012/09/visualising-conversation-threads-in-hyperbolic-space/) - a viewer for App.net conversations.

Recently, [Paul Butler](http://www.paulbutler.org/) produced [Treeverse](https://github.com/paulgb/Treeverse) - a wonderful [Chrome plugin](https://chrome.google.com/webstore/detail/treeverse/aahmjdadniahaicebomlagekkcnlcila) for visualising Twitter conversations.

From there, I've built TweeView as a standalone webapp.

## Contributions

I'm lazy. Help me out by fixing things :-)

1. Open an issue
1. Fork the code
1. Create a branch
1. Write a patch
1. Make a Pull Request **which references the issue**

## Licenses

TweeView is heavily based on several amazing Open Source projects:

* [TreeVerse](https://github.com/paulgb/Treeverse) by @paulgb - which is MIT
* [CodeBird](https://github.com/jublonet/codebird-php) - which is [GPLv3](https://github.com/jublonet/codebird-php/blob/develop/LICENSE)
* [d3js](https://d3js.org/) - which is [Copyright Mike Bostock](https://github.com/d3/d3/blob/master/LICENSE)
* [Semantic UI](https://github.com/semantic-org/semantic-ui/) - which is [MIT](https://github.com/Semantic-Org/Semantic-UI/blob/master/LICENSE.md)
* [`catcert.pem`](https://curl.haxx.se/docs/caextract.html) - which is [Mozilla Public License, v. 2.0](https://hg.mozilla.org/releases/mozilla-release/raw-file/default/security/nss/lib/ckfw/builtins/certdata.txt)
* Some of the functions for dealing with [TWARC](https://github.com/DocNow/twarc/) (Twitter Archive) may be [CC0](https://github.com/DocNow/twarc/blob/master/LICENSE)

As a consequence, the minor changes to CodeBird are *also* GPLv3.

The rest of TweeView is MIT.
