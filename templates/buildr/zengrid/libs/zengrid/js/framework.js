jQuery(document).ready(function($) {
	
	// Fixes for the Wordpress menu classes to make them comaptible for existing themes
	var menuspeed = $('html').attr('data-menu-speed');
		if(typeof menuspeed !=="undefined") {
			menuspeed = menuspeed.replace('s', '') * 1000;
		}
		
	$('#menu .menu-item-has-children').addClass('deeper parent');
	
	
	// Make all justified menus the full width of the container
	$('.zen-menu.zen-menu-horizontal .first-level > li.justify').each(function() {
		var container_width = $(this).parent().parent().parent().parent().parent().parent().outerWidth();

		// Right aligned menu
		var offset = $(this).parent().parent().parent().parent().position();
		var parent_offset = $(this).parent().parent().parent().parent().parent().parent().position();
		var offset = offset.left - parent_offset.left;
		
		$(this).find('ul:first').css({"width":container_width,"margin-left": -offset});	
	});	
	
	// Dropdown Menu
	$("#menu.zen-menu-fading ul li.parent").hover(function(){
		 $(this).children("ul").fadeIn(menuspeed);
	},
	  	function(){
		     $(this).children("ul").fadeOut(menuspeed);   
	});
	
	
	// Fix for bootstrap hiding dropdowns
	setTimeout(function() {
		$("#menu.zen-menu-zoom ul ul,#menu.zen-menu-below ul ul,#menu.zen-menu-no-animation ul ul").css({'display': ""});
	}, 1000)
	
	
	// Tell which div has the menu
	if($('#menu').length > 0) {
		$('#menu').parent().parent().parent().parent().parent().addClass('menu-wrapper');
	} else {
		$('#onepage').parent().parent().parent().parent().parent().addClass('menu-wrapper');
	}

	
	// Check if dropdown is offscreen
		// Check if dropdown is offscreen
	$(".zen-menu-horizontal li.parent").not('.justify').on('mouseenter mouseleave', function () {
		var item = $(this).index();
		$('.zen-menu-horizontal li').removeClass('zen-menu-offscreen');
	    
	    if(!$('html').hasClass('touch')) {
	   	 	$('body').offscreen_check(item);
	   	}
	});
	
	
	// *TODO* Need to add throttle here
	$(window).scroll(function() {
		if (100 < $(window).scrollTop()) {
		    $('html').addClass("has-scrolled");
		} else {
		    $('html').removeClass("has-scrolled");
		}
	});
	
	
	
	// Touch devices
	if (Modernizr.touch) {   
		jQuery('li.parent > a').click(function(e){
		
			//If a menu item is a parent and a link then prevent default if sub is hidden
			if (!jQuery(this).closest('li.parent').hasClass('open')){
				e.preventDefault();
				jQuery(this).closest('li.parent').addClass('open');
			}
		});
		
		jQuery('body').click(function(e){
			//If there is a click elsewhere then remove the open class from parents
			if ( !jQuery(e.target).is('li.parent > a') ) {
				jQuery('.zen-menu li.parent').removeClass('open');
			}
		});
	}
	
	

	// Append link to next prev / pagination if no link exists
	$('.pager li').each(function(index, value) {
		if($(this).find('a').length == 0) {
			var html = $(this).html();
			$(this).html('<a href="#" class="btn disabled">'+html+'</a>');
		}	
	});
	
	$(document).on('click','.pager a.disabled', function() {
		return false;
	});
	
	
	
	var isMobile = {
	   
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    }
	};
	
	if(!isMobile.iOS()) {
	
		// Uber Easy Parallax
		jQuerywindow = jQuery(window);
			 
			 jQuery('section[data-type="background"]').each(function(){
			     var jQuerybgobj = jQuery(this); // assigning the object
			                    
			     jQuery(window).scroll(function() {
			                    
					// Scroll the background at var speed
					// the yPos is a negative value because we're scrolling it UP!								
					var yPos = -( (jQuerywindow.scrollTop() - jQuerybgobj.offset().top) / jQuerybgobj.data('speed'));
					
					// Put together our final background position
					var coords = '50% '+ yPos + 'px';
			
					// Move the background
					jQuerybgobj.css({ backgroundPosition: coords });
					
			}); // window scroll Ends
		});
	} else {
		
		$('html').addClass('is-ios')
	}
	
	//
	 // Nav tabs
	 //
	 //
	 //
	 //
	 
	 $(document).on('click', '.zen-nav-tabs li', function() {
	 	
	 	// Active class on nav
	 	$(this).parent().find('li').removeClass('active');
	 	$(this).addClass('active');
	 	
	 	// Activate content block
	 	var target = $(this).attr('data-target');
	 	$(this).parent().next('.zen-tab-content').find('.zen-tab-pane').hide();
	 	$(this).parent().next('.zen-tab-content').find('[data-id="'+ target +'"]').fadeIn();
	 	
	 	return false;
	 });
	 
	 
	 //
	 // Sliders
	 //
	 //
	 //
	 //
	 
	 // Open items on load
	 $('.zen-slide-content.open').slideDown();
	 
	 $(document).on('click', '.zen-slide-trigger', function() {
	 	$(this).next('.zen-slide-content').slideToggle();
	 	return false;
	 });
	 
	 
	 //
	 // Modal
	 //
	 //
	 //
	 //
	 
	 $(document).on('click', '.zen-modal-trigger', function() {
	 	var target = $(this).attr('data-target');
	 	var content = $('[data-id="' + target + '"]').html();
	 	$('#modal-place-holder').html(content);
	 	$('#modal-place-holder,.zen-modal-overlay').fadeToggle().addClass('active');
	 	return false;
	 });
	 
	 $(document).on('click', '.zen-modal-overlay,.zen-modal-close', function() {
	 	$('.zen-modal.active,.zen-modal-overlay').fadeToggle().removeClass('active');
	 	$('#modal-place-holder').html('');
	 	return false;
	 });
	 
	 
	 //
	 // Scroll to top
	 //
	 //
	 //
	 
	 $(".zen-scroll-top").click(function() {
	 	$("html, body").animate({ scrollTop: 0 }, "slow");
	 	 return false;
	 });
	 
	 
	 // 
	 // Scroll to bottom
	 //
	 //
	 //
	 
	 $(".zen-scroll-bottom").click(function() {
	 	$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	 	 return false;
	 });
	 
	 
	 
	 
	 $(window).scroll(function () {
			if ($(this).scrollTop() >200) {
			 	$(".zen-scroll-fade").fadeIn();
			}
			else {
			 	$(".zen-scroll-fade").fadeOut();
			}
	 });
	 
	 
	
    
    
    //
     // Alert Close button
     //
     //
     //
     //
    
    $('[data-dismiss="alert"]').click(function() {
    	$(this).parent().fadeOut();
    });
    
    
     // Sticky module
    var menuheight = $('.menu-wrapper').outerHeight();
    
    
    $(".sticky-module").stick_in_parent({
  		'parent': '.mainwrap',
  		'recalc_every': 1000,
  		'offset_top': menuheight + 30
  	});
  	
  	
  	// Used for cases where content is dynamic and the sticky element doesnt get calc. properly
  	setTimeout(function() {
  			$(document.body).trigger("sticky_kit:recalc");
  	}, 1000);
  	$('.zen-anchor').each(function() {
		var text = $(this).text();
		var anchor =  $(this).attr('name');
		$('ul#zen-anchor-list').append('<li><a class="zen-anchor-scroll" href="#'+anchor+'">'+text+'</a></li>');
	});
	
	// Das ist Smooth linking
	$('.zen-anchor-scroll').smoothScroll({
		offset: -(menuheight + 220),
		easing: 'swing'
	});
	
	$('.zen-anchor-scroll').on('click', function() {
		$('.zen-anchor-scroll').parent().removeClass('active'); 
		$(this).parent().addClass('active');
		return false;
	});


    
   });


(function ($) {
	
	$.fn.offscreen_check = function (item) {
		var item = item + 1;
		var elm = $('.zen-menu-horizontal li:nth-child(' + item + ') ul:first', this);
		var off = elm.offset();
		var l = off.left;
		var w = elm.width() + 50;
		var docH = $(window).height();
		var docW = $(window).width();
		var isEntirelyVisible = (l+ w <= docW);
			        
		if ( ! isEntirelyVisible ) {
		    $('.zen-menu-horizontal li:nth-child(' + item + ')').addClass('zen-menu-offscreen');
		} else {
		    $(this).parent().removeClass('zen-menu-offscreen');
		}
	};
	
	// Checks to see if menu is offscreen and attaches zen-menu-offscreen class
	$.fn.append_nav = function (collapse,content,addicons) {
		
		var window_width = $(window).width();
	
		if(window_width < collapse) {
			$('#off-canvas-menu ul.off-canvas-menu:not(.content-added)').prepend(content).parent().addClass('accordion');
			
			// Add the icons where necesary
			if(addicons) {
				$('#off-canvas-menu ul:not(.content-added) > li.parent > span.zen-menu-heading,#off-canvas-menu ul:not(.content-added) > li.parent > a').prepend('<span class="zen-accordion-trigger zen-icon zen-icon-angle-down"></span>');
			}
			
			$('#off-canvas-menu ul.off-canvas-menu:not(.content-added)').addClass('content-added');
		}
	};
})(jQuery);