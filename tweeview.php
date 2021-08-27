<?php
//	Set up all the libraries
require_once (__DIR__ . '/vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
use Coderjerk\ElephantBird\TweetLookup;
use Coderjerk\ElephantBird\RecentSearch;

//	Arrays for holding the Twitter data
$conversation_data = array();
$conversation_includes = array();

//	Get the conversation. Note: does NOT get the root node.
function get_all($twid, $next=null) {
	global $conversation_data;
	global $conversation_includes;

	//	If there are more replies to get, send the next_token so Twitter gets the next set of results
	if (null != $next) {
		$params = [
		    'query'        => "conversation_id:{$twid}",
			 'tweet.fields' => "in_reply_to_user_id,author_id,created_at,conversation_id,referenced_tweets,public_metrics",
			 "expansions"   => "author_id",
			 'user.fields'  => "username,profile_image_url",
			 "next_token"   => $next,
			 'max_results'  => 100
		];
	} else {
		$params = [
		    'query'        => "conversation_id:{$twid}",
			 'tweet.fields' => "in_reply_to_user_id,author_id,created_at,conversation_id,referenced_tweets,public_metrics",
			 "expansions"   => "author_id",
			 'user.fields'  => "username,profile_image_url",
			 'max_results'  => 100
		];
	}

	//	Perform the search
	$search = new RecentSearch;
	$results = $search->RecentSearchRequest($params);

	//	Add the responses to the temporary storage arrays
	$data_objects = $results->data;
	foreach ($data_objects as $datum) {
		array_push($conversation_data, $datum);
	}

	$includes_objects = $results->includes->users;
	foreach ($includes_objects as $included) {
		array_push($conversation_includes, $included);
	}

	//	If there's a next token, there are more results. Can't rely on the number of results returned
	if (null != $results->meta->next_token) {
		get_all($twid, $results->meta->next_token);
	} else {
		// echo "Done!\n";
	}
}

//	Get the root node. This is the first Tweet in the conversation.
function get_root($id) {

	//	Set up parameters
	$params = [
	    'tweet.fields' => 'attachments,author_id,created_at,conversation_id',
		 "expansions"   => "author_id",
		 'user.fields'  => "username,profile_image_url",
	];

	//	Perform the search
	$lookup = new TweetLookup;
	$root = $lookup->getTweetsById([$id], $params);

	//	Get the ID of the Tweet. This may be different from the conversation ID
	$this_id = $root->data[0]->id;
	$con_id  = $root->data[0]->conversation_id;

	//	If the conversation starts at another node, get that instead
	if ($this_id != $con_id) {
		return get_root($con_id);
	} else {
		return $root;
	}
}

//	This function called from index.php
function get_conversation($twid) {
	global $conversation_data;
	global $conversation_includes;

	//	Get the head of the conversation
	$root = get_root($twid);

	//	Get the conversation ID
	$conversation_id = $root->data[0]->conversation_id;

	//	Get all the Tweets in the conversation
	get_all($conversation_id);
	$conversation = array("data" => $conversation_data, "includes" => $conversation_includes);

	//	All the individual Tweets
	$posts = $conversation["data"];

	// Add root Tweet to start of array
	array_unshift($posts , $root->data[0]);

	//	Get all the Includes
	$user_objects = $conversation["includes"];

	//	Add root Includes to start of array
	$root_user = $root->includes->users[0];
	array_unshift($user_objects , $root_user);

	//	Get the users from the includes
	$users = array();
	foreach ($user_objects as $user) {
		$users[$user->id] = $user->profile_image_url;
	}

	//	Placeholder for references
	$references = array();

	//	Iterate through, generating the object needed
	foreach ($posts as $post) {
		//	Get the data from the post
		$id = $post->id;
		$parent = $post->referenced_tweets[0]->id;
		$text = $post->text;
		// $username = $post['user']['screen_name'];
		// $name = $post['user']['name'];
		$avatar = $users[$post->author_id];
		$time = strtotime($post->created_at)*1000;
		// if($rt) {
		// 	$retweets = $post['retweet_count'];
		// }
		// if($fav) {
		// 	$favs = $post['favorite_count'];
		// }

		//	Place the post in the array based on its ID
		$references[$id] = array(
			"tweet" => array(
				"reply_to" => $parent,
				// "images"   => array(),	//	TODO
				// "username" => htmlspecialchars($username,ENT_QUOTES),
				// "name"     => htmlspecialchars($name,ENT_QUOTES),
				"bodyText" => html_entity_decode($text),
				// "bodyHtml" => $bodyHTML,
				"id"       => $id,
				"avatar"   => $avatar,
				"time"     => $time,
				// "replies"  => 0,
				// "retweets" => $retweets,
				// "favs"     => $favs,
			),
			"children" => array()
		);
	}

	//	Create the Tree
	$tree = array();

	//	Iterate through the references, using `&` means this is a reference,
	//	http://php.net/manual/en/language.references.php
	foreach ($references as &$post)
	{
		$id = $post['tweet']['id'];
		$parentId = $post['tweet']['reply_to'];

		//	If this is the start of the conversation
		if (!$parentId) {
			$tree[] =& $references[$id];
		}
		//	If this is a reply, add it as a child of its parent
		else {
			$references[$parentId]['children'][] =& $post;
		}
		//	Clear the reference
		unset($post);
	}

	//	Get rid of all the null values - otherwise things screw up
	$tree = array_filter($references[$conversation_id]);

	//	Pretty Print so we can visually assess if this has worked
	$output = json_encode($tree,JSON_PRETTY_PRINT);

	//	Output into the JavaScript
	return $output;
}