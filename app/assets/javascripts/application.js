// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

(function($) {
  $.fn.menumaker = function(options) {
    var cssmenu, settings;
    cssmenu = $(this);
    settings = $.extend({
      title: 'Menu',
      format: 'dropdown',
      breakpoint: 768,
      sticky: false
    }, options);
    return this.each(function() {
      var multiTg, resizeFix, selectList;
      cssmenu.find('li ul').parent().addClass('has-sub');
      if (settings.format !== 'select') {
        cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
        $(this).find('#menu-button').on('click', function() {
          var mainmenu;
          $(this).toggleClass('menu-opened');
          mainmenu = $(this).next('ul');
          if (mainmenu.hasClass('open')) {
            mainmenu.hide().removeClass('open');
          } else {
            mainmenu.show().addClass('open');
            if (settings.format === 'dropdown') {
              mainmenu.find('ul').show();
            }
          }
        });
        multiTg = function() {
          cssmenu.find('.has-sub').prepend('<span class="submenu-button"></span>');
          cssmenu.find('.submenu-button').on('click', function() {
            $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open')) {
              $(this).siblings('ul').removeClass('open').hide();
            } else {
              $(this).siblings('ul').addClass('open').show();
            }
          });
        };
        if (settings.format === 'multitoggle') {
          multiTg();
        } else {
          cssmenu.addClass('dropdown');
        }
      } else if (settings.format === 'select') {
        cssmenu.append('<select style="width: 100%"/>').addClass('select-list');
        selectList = cssmenu.find('select');
        selectList.append('<option>' + settings.title + '</option>', {
          'selected': 'selected',
          'value': ''
        });
        cssmenu.find('a').each(function() {
          var element, i, indentation;
          element = $(this);
          indentation = '';
          i = 1;
          while (i < element.parents('ul').length) {
            indentation += '-';
            i++;
          }
          selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
        });
        selectList.on('change', function() {
          window.location = $(this).find('option:selected').val();
        });
      }
      if (settings.sticky === true) {
        cssmenu.css('position', 'fixed');
      }
      resizeFix = function() {
        if ($(window).width() > settings.breakpoint) {
          cssmenu.find('ul').show();
          cssmenu.removeClass('small-screen');
          if (settings.format === 'select') {
            cssmenu.find('select').hide();
          } else {
            cssmenu.find('#menu-button').removeClass('menu-opened');
          }
        }
        if ($(window).width() <= settings.breakpoint && !cssmenu.hasClass('small-screen')) {
          cssmenu.find('ul').hide().removeClass('open');
          cssmenu.addClass('small-screen');
          if (settings.format === 'select') {
            cssmenu.find('select').show();
          }
        }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);
    });
  };
})(jQuery);

(function($) {
  $(document).ready(function() {
    $(document).ready(function() {
      $('#cssmenu').menumaker({
        title: 'Menu',
        format: 'dropdown'
      });
      $('#cssmenu a').each(function() {
        var linkTitle;
        linkTitle = $(this).text();
        $(this).attr('data-title', linkTitle);
      });
    });
  });
})(jQuery);
