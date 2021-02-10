/*jQuery time*/
$(document).ready(function(){
	$(".accordeon li h3").click(function(){
		//slide up all the link lists
		$(".accordeon ul").slideUp();
		//slide down the link list below the h3 clicked - only if its closed
		if(!$(this).next().is(":visible"))
		{
			$(this).next().slideDown();
		}
	})
})