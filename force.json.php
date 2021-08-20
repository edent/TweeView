<?php

require_once (__DIR__ . '/vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
use Coderjerk\ElephantBird\TweetLookup;
use Coderjerk\ElephantBird\RecentSearch;

if(isset($_GET["id"])) {
	$twid = $_GET["id"];
} else {
	//	Default conversation to view
	$twid = "1427312962646298626";
}

	//	Get the head of the conversation
	$id = [$twid];

	$params = [
	    'tweet.fields' => 'attachments,author_id,created_at,conversation_id',
		 "expansions"   => "author_id",
		 'user.fields'  => "username,profile_image_url",
	];

	$lookup = new TweetLookup;
	$root = $lookup->getTweetsById($id, $params);

	// Get the conversation - minus the root of the tree
	$params = [
	    'query'        => "conversation_id:{$twid}",
		 'tweet.fields' => "in_reply_to_user_id,author_id,created_at,conversation_id,referenced_tweets,public_metrics",
		 "expansions"   => "author_id",
		 'user.fields'  => "username,profile_image_url",
		 'max_results'  => 100
	];

	$search = new RecentSearch;
	$conversation = $search->RecentSearchRequest($params);


	$references = array();

	$posts = $conversation->data;
	// Add root to start
	array_unshift($posts , $root->data[0]);

	$user_objects = $conversation->includes->users;
	$root_user = $root->includes->users[0];
	array_unshift($user_objects , $root_user);

	$users = array();

	foreach ($user_objects as $user) {
		$users[$user->id] = $user->profile_image_url;
	}

	// var_dump($users);
	$nodes = array();
	$links = array();

	// add in dummy data for deleted nodes
	$all_ids = array();
	foreach ($posts as $post)
	{
		array_push($all_ids, $post->id);
	}

	//	Iterate through, generating the object needed
	foreach ($posts as $post)
	{
		$post_id = $post->id;
		$reference_id = $post->referenced_tweets[0]->id;

		if (null != $post_id) {
			$node = array('id' => $post_id, "text"=> $post->text);
			array_push($nodes,$node);
		}

		$link = array('source' => $post_id, "target" => $reference_id);
		array_push($links,$link);

		//	If the node doesn't exist (it has been delete) add in a placeholder
		if (null != $reference_id) {
			if (array_search($reference_id, $all_ids) === false) {
				$node = array('id' => $reference_id);
				array_push($nodes,$node);
			}
		}
	}

//	Remove null
array_shift($links);

$tree = array('nodes' => $nodes, "links" => $links);
header('Content-Type: application/json');
echo json_encode($tree,JSON_PRETTY_PRINT);
die();