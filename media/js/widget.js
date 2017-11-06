!(function($){
	$(function(){

		var searchButtonSelector = "#btn-widget-search";
		var keywordsInputSelector = "#keywords1";
				
		$("#widget-search").keypress(function(e){
			if ( 13 == e.which )
			{
				$(searchButtonSelector).mousedown();
				$(searchButtonSelector).click();
				return false;
			}
		});
		
		// uniform 
		if ( $.fn.customSelect )
		{
			$("select").customSelect();
		}

	});
})(jQuery);