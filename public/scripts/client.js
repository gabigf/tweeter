/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(() => {
	const $newTweetForm = $('#new-tweet-form');
	const url = '/tweets';
	
	$newTweetForm.on("submit", function(event) {
		event.preventDefault();
		const $tweetText = $('#tweet-text');
		const dataToSend = $(this).serialize();
		
		if ($tweetText.val().length === 0) {
			alert(`You're gonna need to type something in there bud`);
			return;
		}

		if ($tweetText.val().length > 140) {
			alert(`Too many words there, might want to take it down a notch`);
			return;
		}
		
		$.post('/tweets', dataToSend)
			.then(res => {
				loadTweets();
				createTweetElement(res[res.length]);
			});

		$newTweetForm.trigger('reset')
	});

	const loadTweets = () => {
		$.ajax({
			url: url,
			method: 'GET',
			dataType: 'json'
		})
		.done(tweets => {
			renderTweets(tweets)
		})
		
	};


	const renderTweets = tweetsArr => {
		for (const tweet of tweetsArr) {
			const tweetToAppend = createTweetElement(tweet);
			$('#tweets').prepend(tweetToAppend);
		}
	}

	const createTweetElement = tweetObj => {
		const formattedTime = timeago.format(tweetObj.created_at);
		const newTweetHTML = `
		<article class="tweet-container">
			<header>
				<div class="user-identity-container">
					<img class="user-avatar" src="${tweetObj.user.avatars}" />
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

	loadTweets();
});