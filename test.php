<?php

require_once (__DIR__ . '/vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
use Coderjerk\ElephantBird\TweetLookup;
use Coderjerk\ElephantBird\RecentSearch;

$posts = array();
$users = array();
$references = array();


function get_all($twid, $next=null) {

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

	$search = new RecentSearch;
	$results = $search->RecentSearchRequest($params);

	$result_count = $results->meta->result_count;


	global $posts;
	$post_objects = $results->data;
	foreach ($post_objects as $post) {
		array_push($posts, $post);
	}

	global $users;
	$user_objects = $results->includes->users;

	foreach ($user_objects as $user) {
		$users[$user->id] = $user->profile_image_url;
	}

	if (100 == $result_count) {
		get_all($twid, $results->meta->next_token);
	} else {
	}
}

function get_conversation($twid) {
	//	Get the head of the conversation
	$id = [$twid];

	$params = [
		 'tweet.fields' => 'attachments,author_id,created_at,conversation_id,public_metrics',
		 "expansions"   => "author_id",
		 'user.fields'  => "username,profile_image_url",
	];

	$lookup = new TweetLookup;
	$root = $lookup->getTweetsById($id, $params);

	//	Add root
	array_push($posts, $root->data[0]);
	array_push($users, $root->includes->users[0]);
	//	Get conversation
	get_all($id[0]);

	//	Iterate through, generating the object needed
	foreach ($posts as $post)
	{
		//	Get the data from the post
		$id = $post->id;
		$parent = $post->referenced_tweets[0]->id;
		$text = $post->text;
		// $bodyHTML = twitter_format($post);
		// $username = $post['user']['screen_name'];
		// $name = $post['user']['name'];
		$avatar = $users[$post->author_id];
		$time = strtotime($post->created_at)*1000;

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
				// "avatar" => "https://eu.ui-avatars.com/api/?name={$id}",
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
		if (!$parentId)
		{
			$tree[] =& $references[$id];
		}
		//	If this is a reply, add it as a child of its parent
		else
		{
			$references[$parentId]['children'][] =& $post;
		}
		//	Clear the reference
		unset($post);
	}
	//	Get rid of all the null values - otherwise things screw up
	$tree = array_filter($tree);

	//	Pretty Print so we can visually assess if this has worked
	$output = json_encode($tree,JSON_PRETTY_PRINT);

	// var_dump($output);

	//	Trim the "[" and "]"
	$output = substr($output, 1, -1);

	//	Output into the JavaScript
	return $output;
}
