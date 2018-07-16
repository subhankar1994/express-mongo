$(document).ready(function(){
	$('.delete-article').on('click', function(e){
		$target = $(e.target);
		var id = $target.attr('data-id');
		$.ajax({
			type: 'DELETE',
			url: '/delete/'+id,
			success: function(response){
				alert('deleting article....');
				window.location.href='/';

			},
			error: function(err){
				console.log(err);

			}
		});

	});
});