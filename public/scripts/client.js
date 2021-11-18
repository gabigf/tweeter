/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(() => {
	const $newTweetForm = $('#new-tweet-form');
	

	$newTweetForm.on("submit", function(event) {
		event.preventDefault();
		const dataToSend = $(this).serialize();
		
		
		$.ajax({
			url: '/tweets',
			method: 'POST',
			data: dataToSend
		})
		

	});

	const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

	const renderTweets = tweetsArr => {
		for (const tweet of tweetsArr) {
			const tweetToAppend = createTweetElement(tweet);
			$('#tweets').append(tweetToAppend);
		}
	}

	const createTweetElement = tweetObj => {
		const formattedTime = timeago.format(tweetObj.created_at);
		const newTweetHTML = `
		<article class="tweet-container">
			<header>
				<div class="user-identity-container">
					<i class="user-icon far fa-user"></i>
					<span class="user-name">${tweetObj.user.name}</span>
				</div>
				<p class="user-handle">${tweetObj.user.handle}</p>
			</header>
			<p class="user-tweet">${tweetObj.content.text}</p>
			<footer>
				<div class="when-tweet">${formattedTime}</div>
				<div class="tweet-icon-container">
					<i class="report-icon fas fa-flag"></i>
					<i class="retweet-icon fas fa-retweet"></i>
					<i class="like-icon fas fa-heart"></i>
				</div>
			</footer>
		</article>
		`
		return newTweetHTML;
	}

	
	

	renderTweets(data);

});