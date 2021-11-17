$(document).ready(function() {
	let $counter = $('.counter');
	const $tweetText = $('textarea');
	const charMax = 140;

	$tweetText.on('keyup', function() {
		let textLength = $(this).val().length;
		let totalCount = charMax - textLength;
		if (totalCount < 0) {
			$counter.val(totalCount).addClass('over-limit');
		} else {
			$counter.val(totalCount).removeClass('over-limit');
		}
	});
});