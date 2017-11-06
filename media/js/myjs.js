// regular js

function formatDate( myDate )
{
	var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var myDay = "<span class='rss-item-pubDate-date'>" + myDate.getUTCDate() + "</span> ";
	var myMonth = "<span class='rss-item-pubDate-month'>" + monthList[myDate.getUTCMonth()] + "</span> ";
	var myYear = "<span class='rss-item-pubDate-full-year'>" + myDate.getUTCFullYear() + "</span> ";

	return myDay + "<br>" + myMonth;
}

function blog_posts(obj)
{
		// add post span
		// var myContainer = $(".b_blog-posts-container")
		var myCategory = obj[0].categories[0].toLowerCase().replace('&amp;','').replace(/ /g,'');
		var myContainer = $(".b_blog-posts-container[data-category='" + myCategory + "']");

		var myDesc = obj[0].excerpt;
		myDesc = myDesc.substr(0,120);
		// console.log( myContainer.length + " " + myCategory );
		myContainer.append("<span class='b_blog-post'></span>");
		// add thumbnail span
		myContainer.children(".b_blog-post").append("<span class='b_blog-post-thumbnail'><a target='_blank' href='" + obj[0].permalink + "'><img src='" + obj[0].thumbnail.split(" ")[0] + "' /></a></span>");
		// add title span
		myContainer.children(".b_blog-post").append("<span class='b_blog-post-title'><a target='_blank' href='" + obj[0].permalink + "'>" + obj[0].title + "</a></span>");
		// add description span
		myContainer.children(".b_blog-post").append("<span class='b_blog-post-description'>" + myDesc + "</span>");

		// add date span
		//             \/make into a date          \/remove the time element, which is after the space
		var postDate = new Date(Date.parse(obj[0].date.substr(0, obj[0].date.indexOf(" "))));
		// myContainer.children(".b_blog-post-" + 0).append("<span class='b_blog-post-date'>" + formatDate(postDate) + "</span>");
	
}
	
!(function($){

	// jquery
	$(function(){
		
	$('link[href="/media/COMMON/newdash/lib/bootstrap.min.css"]').remove();
		
	if ($('#site-topnav .user-loggedIn').length) {
		$('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
	}	

	var currentPage = window.location.pathname.toLowerCase();

	// remove empty li's on the system pages. 
	$("#side-left li:empty").remove();

	// remove empty left side bar
	if ($('#prefix_left-navigation').children().length == 0) {
		$('#prefix_left-navigation').remove();
	}
	if ($('#side-left').children().length == 0) {
		$('#side-left').remove();
	}
	
	/* Adding Bootstrap Classes */
	// Section > Div.container
	$('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');

	// Left side bar column
	$('#dynamic-side-left-container, #side-left').addClass('hidden-xs col-sm-4 col-md-3');
	//$('#dynamic-side-left-container, #job-side-column, #side-left').addClass('hidden-xs col-sm-4 col-md-3');


	// Right side bar column
	$('#dynamic-side-right-container, #side-right').addClass('hidden-xs hidden-sm hidden-md hidden-lg');

	// Content column
		if (!$.trim($('#dynamic-side-right-container').html()).length || !$.trim($('#side-right').html()).length || !$("#r_full-width").length ) {
		$('#dynamic-content, #content-container #content').addClass('col-sm-8 col-md-9');
		}
		else {
        	$('#dynamic-content, #content').addClass('col-sm-8 col-md-6');
       }
		$('#job-dynamic-container #content').addClass('col-sm-12');
		//$('#job-dynamic-container #content').addClass('col-sm-8 col-md-9');  

	// dynamic side columns column
	//Full width landing page
	if ( $("#r_full-width").length )
	{
		$('#dynamic-content, #content').removeClass('col-sm-12 col-md-12 col-sm-8 col-md-9');	
		$('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
		$('#dynamic-container').removeClass('container').css('padding-top', '0').css('padding-bottom', '0'); 
		$("#dynamic-content h1:first, #content-container h1:first").appendTo( $("#header .inner_banner .landing-title") );
	} 


	// Repsonsive image
	$('.dynamic-content-holder img').addClass('img-responsive');

	// Responsive table
	$('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');


	// Convert top menu to Boostrap Responsive menu
	$('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
	$('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
	$('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
	$('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
	$('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle','dropdown').addClass('dropdown-toggle');
	$('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');

	// add placeholder for search widget text field
	$('#keywords1').attr('placeholder','Keywords search');

	// add active class to links.
	$("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
	$("li.active li.active").parent().closest("li.active").removeClass("active");
	$("li li.active").parent().parent().addClass("active")
	
	// add last-child class to navigation 
	$("#prefix_navigation > ul > li:last").addClass("last-child");
	
	// add btn style
	$(".backtoresults a").addClass("btn btn-default");
	$(".apply-now-link a").addClass("btn btn-primary");
	$(".job-navbtns a").addClass("btn btn-default");
	
	//.left-hidden show
		if((document.URL.indexOf("/advancedsearch.aspx") >= 0)){
			$(".left-hidden").css( "display", "block" );
		}
		if((document.URL.indexOf("/advancedsearch.aspx?") >= 0)){
			$(".left-hidden").css( "display", "none" );
		}
		if((document.URL.indexOf("/member/createjobalert.aspx") >= 0)){
			$(".left-hidden").css( "display", "block" );
		}
		if((document.URL.indexOf("/member/login.aspx") >= 0)){
			$(".left-hidden").css( "display", "block" );
		}
		if((document.URL.indexOf("/member/register.aspx") >= 0)){
			$(".left-hidden").css( "display", "block" );
		}

	$('#content-container h1:first').text($('#content-container h1:first').text());

	// Wrap first word of H1 in span
	$('#dynamic-content h1:first, #content-container h1:first').html(function (i, html) {
	    return html.replace(/(\w+\s+)/, '<span>$1</span>');
	}); 
	
	$("#dynamic-content h1:first, #content-container h1:first").appendTo( $("#header .inner_banner") );

	// Contact - Google map
	$( "#footer" ).prepend( $( "#contact-map" ) );
	$("#contact-map-overlay").click(function(){
		$(this).hide();
	});
	// add iframe url for a map
		function loadMap(iframeObject)
		{
			// if the iframe has no src or a blank src, and it has a data-src attribute
			if ( !(iframeObject.attr("src") && iframeObject.attr("src").length) && iframeObject.attr("data-src") )
			{
				iframeObject.attr("src", iframeObject.attr("data-src"));
			}
		}
		// scroll to a map
		function scrollToDiv(divID)
		{
			$("html, body").animate({
				scrollTop: $(divID).offset().top - ( $("#Top-nav-sticky").height() || 0 ) - 20
			}, 300);
		}
		// if a location hash is on the url, add active to the div.
		if ( location.hash && $(location.hash + ".r24_map").length )
		{
			$(location.hash + ".r24_map").addClass("active");
		}
		else
		{
			// otherwise, just make the first map active.
			$(".r24_map:first").addClass("active");
		}
		loadMap($(".r24_map.active iframe"));
		// contact page maps on click
		$(".r24_contact-map-link").click(function(e){
			var myLink = $(this).attr("href")
			var targetMap = $( myLink.substr(myLink.indexOf("#")) );
			if ( targetMap.length )
			{
				e.preventDefault();
				loadMap(targetMap.children("iframe"));
				scrollToDiv(targetMap);
				$(".r24_map").not(targetMap).removeClass("active");
				targetMap.addClass("active");
			}
		});

	
	// generate select navigation from sidebar Dynamic menu
	$("#dynamic-content").convertNavigation({
		title: "Related Pages", 
		links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
	});
	
	// generate actions button on Job Listing page
	$(".job-navbtns").convertButtons({
		buttonTitle: "Actions&hellip;", 
		title: "Please choose&hellip;", 
		links: ".job-navbtns a"
	});
	
	// generate filters button on Job Listing page
	$(".job-navbtns").convertFilters({
		buttonTitle: "Filters&hellip;", 
		filteredTitle: "Applied Filters", 
		title: "Please choose&hellip;", 
		filtered: ".search-query p", 
		list: "ul#side-drop-menu", 
		excludeFromList: "#AdvancedSearchFilter_PnlCompany"
	});
		
		// Home services - carousel
		$('.t-gallery').Gallerycarousel({ autoRotate: 4000, visible: 4, speed: 1200, easing: 'easeOutExpo', itemMinWidth: 250, itemMargin: 30 })
		$('.t-gallery-awards').Gallerycarousel({ autoRotate: 4000, visible: 5, speed: 1200, easing: 'easeOutExpo', itemMinWidth: 180, itemMargin: 5 })
		
		
		// Latest Jobs widget
		$("#myJobsList ul").includeFeed({
			baseSettings: { rssURL: "/job/rss.aspx?search=1&addlocation=1" }, 
			elements: { pubDate: formatDate, title: 1, description: 1 }, 
			complete: function(){
				if( $(this).children().length ) {
                   $(this).children().each( function(){
                       $(this).find('.rss-item-pubDate-month').text( $(this).find('.rss-item-pubDate-month').text().substr(0,3) );
                   }); 
               }
				
				if ($(this).children().length > 2){ 
					$(this).simplyScroll({frameRate:60});
				}
			}
		});
		// Awards list on Home Page
	/* $(".awards-list ul").each(function() {
                if ($(this).children().length > 3) {
                       $(this).simplyScroll({frameRate: 90})
                      } 
          });*/
	// Equal Height	
	$.fn.eqHeights = function(options) {
	
		var defaults = {child: false};  
		var options = $.extend(defaults, options); 
		var el = $(this);
		if (el.length > 0 && !el.data('eqHeights')) {
			$(window).bind('resize.eqHeights', function() {
				el.eqHeights();
			});
			el.data('eqHeights', true);
		}
		if( options.child && options.child.length > 0 ){
			var elmtns = $(options.child, this);
		} else {
			var elmtns = $(this).children();
		}
	
		var prevTop = 0;
		var max_height = 0;
		var elements = [];
		elmtns.height('auto').each(function() {
	
			var thisTop = this.offsetTop;
			if (prevTop > 0 && prevTop != thisTop) {
				$(elements).height(max_height);
				max_height = $(this).height();
				elements = [];
			}
			max_height = Math.max(max_height, $(this).height());
			prevTop = this.offsetTop;
			elements.push(this);
		});
	
		$(elements).height(max_height);
	};

	// Equal Height - Usage
	$('.service-holder').eqHeights();

	// if there is a hash, scroll down to it. Sticky header covers up top of content.
	if ( $(window.location.hash).length )
	{
		$("html, body").animate({
			scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - 40
		}, 100);
	}
	
	// detect blog posts and load jsonp, populate. see JS section for definition of blog_posts
	 $(".b_blog-posts-container").each(function(){
	 	var baseUrl = "https://www.onestaff.co.nz/blog"
		var baseSuffix = "?feed=json&callback=blog_posts";
		if ( $(this).attr("data-category").length )
		{
			var fullUrl = baseUrl + "/category/" + $(this).attr("data-category") + "/" + baseSuffix;
		}
		else
		{
			var fullUrl = baseUrl + baseSuffix;
			//console.log('this');
		}
		$.getScript(fullUrl);	
	 });
				
	});


	
})(jQuery);

