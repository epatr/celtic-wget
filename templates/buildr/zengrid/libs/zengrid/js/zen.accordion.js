(function ($) {
    $.fn.zenaccordion = function (options) {
    
    	// Accordion options
       var settings = $.extend({
               openfirst: false,
               openicon: 'angle-up',
               closeicon: 'angle-down',
               showactive: false,
               type: 'accordion'
       }, options);
     
       
      // Add the icons where necesary
      $('.zen-accordion > li.parent > span.zen-menu-heading,.zen-accordion > li.parent > a').prepend('<span class="zen-accordion-trigger zen-icon zen-icon-' + settings.closeicon + '"></span>');
      
      // Open First
     if(settings.openfirst) {
       		$('.zen-accordion').find('ul:first').slideDown().parent().addClass('open').find('.zen-icon').removeClass('zen-icon-'+ settings.closeicon).addClass('zen-icon-'+ settings.openicon);
      }
      
      // Show Active
      if(settings.showactive) {
      		$('.zen-accordion li.active').find('ul').slideDown().parent().addClass('open').find('.zen-icon').removeClass('zen-icon-'+ settings.closeicon).addClass('zen-icon-'+ settings.openicon);
      }
      
      $(document).on('click', '.zen-accordion > li.parent > span.zen-menu-heading,.zen-accordion > li.parent > a', function(e) {
		
           // Markup can define the type of accordion used but if none is specified 
           // we default to the Template setting
           if($(this).parent().parent().hasClass('zen-accordion-panel')) {
           		var type = "panel";
           } else if($(this).parent().parent().hasClass('zen-accordion')) {
           		var type = "accordion";
           } else {
           		var type = settings.type;
           }

           var menu = $(this).parent().parent();
           	
           if ($(this).parent().hasClass('open')){
           		
           		// User clicked on open parent
           		$(this).parent().removeClass('open').find('ul').slideUp();
           		
           		$(this).parent().find('.zen-accordion-trigger').removeClass('zen-icon-'+ settings.openicon).addClass('zen-icon-'+ settings.closeicon);
           		
           } else {
            	
            	// User has clicked on a non-open parent
            	// Close all items
            	if(type == "accordion") {
            		$(menu).find('ul').slideUp();
            		
            		// Remove Active class
            		$(menu).find('li.parent').removeClass('open');
            		$(menu).find('.zen-accordion-trigger').removeClass('zen-icon-'+ settings.openicon).addClass('zen-icon-'+ settings.closeicon);
            	}
            	
            	
            	// Make current active and open next ul
            	$(this).parent().addClass('open').find('ul').slideDown();
            	
            	// Change the icon
            	$(this).parent().find('.zen-accordion-trigger').removeClass('zen-icon-'+ settings.closeicon).addClass('zen-icon-'+ settings.openicon);
           }
           
           if(!$(this).hasClass('clicked')) {
          		$(this).addClass('clicked')
           		return false;
           } 
           
           if($(e.target).hasClass('zen-accordion-trigger')) {
	           	return false;	
           }
       }); 
    }
})(jQuery);