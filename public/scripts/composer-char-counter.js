$(document).ready(function() {
	const $counter = $('.counter');
	const $tweetText = $('textarea');
	const charMax = $counter.val();


	$tweetText.on('keyup', function() {
		let textLength = $(this).val().length;
		let totalCount = charMax - textLength;
		if (totalCount < 0) {
			$counter.val(totalCount).addClass('over-limit');
		} else {
			$counter.val(totalCount).removeClass('over-limit');
		};
	});
	
});
