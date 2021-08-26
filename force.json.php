<?php

require_once (__DIR__ . '/vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
use Coderjerk\ElephantBird\TweetLookup;
use Coderjerk\ElephantBird\RecentSearch;

//	Get the ID of the Tweet
if(isset($_GET["id"])) {
	$twid = $_GET["id"];
} else {
	//	Default conversation to view
	$twid = "1427312962646298626";
}

$id = [$twid];

//	Set up the arrays
$posts = array();
$users = array();
$nodes = array();
$links = array();

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

	//	If there's a next token, there are more results. Can't rely on the number of results returned
	if (null != $results->meta->next_token) {
		get_all($twid, $results->meta->next_token);
	} else {
		// echo "Done!\n";
	}
}

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

// add in dummy data for deleted nodes
$all_ids = array();
foreach ($posts as $post) {
	array_push($all_ids, $post->id);
}

//	Iterate through, generating the object needed
foreach ($posts as $post) {
	$post_id = $post->id;
	$referenced_tweets = $post->referenced_tweets;

	//	Referenced tweets can include quoted tweets. Only grab the replied to tweet
	if ($referenced_tweets.length > 1){
		foreach ($referenced_tweets as $referenced_tweet) {
			if ($referenced_tweet->type == "replied_to") {
				$reference_id = $referenced_tweet->id;
			}
		}
	} else {
		$reference_id = $post->referenced_tweets[0]->id;
	}

	$retweets = $post->public_metrics->retweet_count + $post->public_metrics->quote_count;
	$likes = $post->public_metrics->like_count;

	//	Construct the HTML to pop up
	if (null != $post_id) {
		$node = array('id' => $post_id,
			"text"=> "<span class='label'>" .
							"<img class='avatar' src='" . $users[$post->author_id] . "'>" .
							$post->text .
						"</span>",
			"likes"    => $likes,
			"retweets" => $retweets
			);
		array_push($nodes,$node);
	}

	//	Construct the links between nodes
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

//	Construct the JSON
$tree = array('nodes' => $nodes, "links" => $links);
header('Content-Type: application/json');
echo json_encode($tree,JSON_PRETTY_PRINT);
die();
