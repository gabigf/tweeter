/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(() => {
	const $newTweetForm = $('#new-tweet-form');
	const $tweetContainer = $('#tweets');
	const $tweetText = $('#tweet-text');
	const $newTweetContainer = $('.new-tweet');
	const $errorMsg = $('.new-tweet aside');
	const $newTweetToggle = $('.tweet-toggle-container');
	const url = '/tweets';
	
	/* 
		Submit form event to create a new tweet
	*/
	$newTweetForm.on("submit", function(event) {
		event.preventDefault();
		const dataToSend = $(this).serialize();

		// Error Messages
		if ($tweetText.val().length === 0 || $tweetText.val().length > 140) {
			if ($tweetText.val().length === 0) {
				$errorMsg
				.html(`
					<div class="error-text-container">
						<p>You're gonna need to type something in there bud</p>
						<i class="close-error fas fa-times"></i>
					</div>
					`);
			}
			if ($tweetText.val().length > 140) {
				$errorMsg
					.html(`
					<div class="error-text-container">
						<p>Too many words there, might want to take it down a notch</p>
						<i class="closeError fas fa-times"></i>
					</div>
					`);
			}
			$errorMsg
			.slideDown('fast')
			
			const $errorClose = $('.close-error');
			$errorClose.click(e => {
				e.preventDefault();
				$errorMsg.slideUp('fast');
			});
		}
		
		// Sends the tweet data to the 'server'
		$.post('/tweets', dataToSend)
			.then(res => {
				loadTweets();
				$errorMsg.slideUp('fast');
			});

		// Resets the form so that it's ready for anote=her tweet
		$newTweetForm.trigger('reset');
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
		$tweetContainer.empty();
		for (const tweet of tweetsArr) {
			const tweetToAppend = createTweetElement(tweet);
			$tweetContainer.prepend(tweetToAppend);
		}
	}


	const createTweetElement = tweetObj => {
		const escape = function (str) {
			let div = document.createElement("div");
			div.appendChild(document.createTextNode(str));
			return div.innerHTML;
		};
		const formattedTime = timeago.format(tweetObj.created_at);
		const $newTweetHTML = `
		<article class="tweet-container">
			<header>
				<div class="user-identity-container">
					<img class="user-avatar" src="${tweetObj.user.avatars}" />
					<span class="user-name">${tweetObj.user.name}</span>
				</div>
				<p class="user-handle">${tweetObj.user.handle}</p>
			</header>
			<p class="user-tweet">${escape(tweetObj.content.text)}</p>
			<footer>
				<div class="when-tweet">${formattedTime}</div>
				<div class="tweet-icon-container">
					<i class="report-icon fas fa-flag"></i>
					<i class="retweet-icon fas fa-retweet"></i>
					<i class="like-icon fas fa-heart"></i>
				</div>
			</footer>
		</article>
		`;
		return $newTweetHTML;
	}

	// STRETCH: Made 'Write a tweet' a button to toggle the new tweet form. Also closes any error messages if there are any.
	$newTweetToggle.on('click', e => {
		e.preventDefault();
		$errorMsg.slideUp();
		$newTweetContainer.toggle('hide');
		$tweetText.focus();
	});


	loadTweets();
});