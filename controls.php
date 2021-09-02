<div id="feedContainer">
	<div id="infoBox">
		<p>Welcome to <a href="https://shkspr.mobi/blog/tag/tweeview/">TweeView</a> - a Tree-based way to visualise Twitter conversations.</p>
		<form action="/importer.php" method="post">
			<input type="url" name="url" id="urlBox" size="40" required placeholder="Paste a Twitter status URL here...">
			<select id="page" name="page">
				<option value="index.php">2D Vertical</option>
				<option value="collapse.php">2D Interactive</option>
				<option value="force.php">3D Force Directed</option>
				<option value="3d.php">HyperTree</option>
			</select>
			<button>Generate TweeView</button>
		</form>
		<p>Note - only works for Tweets sent in the last 7 days.</p>
		<p>Made in 🇬🇧 by <a href="https://twitter.com/edent">@edent</a>. Proudly <a href="https://github.com/edent/TweeView">Open Source</a>.</p>
		<p><a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="I just visualised a tree of my tweets using TweeView!" data-url="https://tweeview.ml/" data-via="edent" data-related="edent" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script><button id="hide-button" onclick="this.parentNode.parentNode.style.display = 'none';">Hide</button></p>
		<img id="download"/>
	</div>
</div>
<hr id="beta" aria-label="Warning this page is a beta.">