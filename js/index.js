var active_column_id = 'col1hdr';
var colpaper_map = { 'col1hdr': '000', 'col2hdr': '000', 'col3hdr': '000' };
var text_map = ['English: (SRT 0.20)',
                'Русский: (UF 1997-1.9)',
                'Български: (UF 2013-1.0)',
                'Deutsch: (UF 2015-1)'];
var text_options = '';
$.each(text_map, function(idx, item) { text_options += '<option value=' + idx + '>' + text_map[idx] + '</option>'; });

$.extend($.expr[':'], { /* case-insensitive version of :contains() */
  'containsic': function(elem, i, match, array) {
    return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});

$('#tabs').tabs();
$('#tabs').on('click', 'a', function(e) { if (e.target.id == '#forum') location.href = e.target.href; });

$('.radio').checkboxradio({ icon: false });
$('#' + active_column_id.replace('hdr','rad')).prop('checked', true).checkboxradio('refresh');
$('#' + active_column_id).css('border', 'solid darkblue 2px');
$('.radio').on('change', function() {
   $('#' + active_column_id.replace('hdr','toc')).addClass('hidden');
   active_column_id = $(this).attr('id').replace('rad','hdr');
   $('#' + active_column_id.replace('hdr','toc')).removeClass('hidden');
   $('.txthdr').css('border', 'solid darkgrey 2px');
   $('#' + active_column_id).css('border', 'solid darkblue 2px');
});

$('.colmod').html(text_options).selectmenu({
  change: function(event, ui) {
     var col = $(this).attr('id').replace('mod', '');
     var mod_idx = ui.item.value;
     var paper = colpaper_map[col + 'hdr'];
     var paper_num = paper.replace(/0*(..*)/,'$1'); /* strip the leading zeros */
     $('#' + col + 'txt').load('text/' + mod_idx + '/p' + paper + '.html');
     $('#' + col + 'toc').load('text/' + mod_idx + '/toc.html', function() {
        var toc = $(this).find('.toc');
        toc.bonsai();
        $('#' + col + 'title').html(toc.find('.U' + paper_num + '_0_1').html());
        document.cookie = col + 'mod=' + mod_idx + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
     });
  },
  width: 220
}).each(function() {
   var cnum = $(this).attr('id').replace(/col([0-9][0-9]*)mod/,'$1');
   var mod_idx = getCookie('col' + cnum + 'mod');
   if (mod_idx === undefined) {
      switch(+cnum) {
         case 1: mod_idx = 1; break;
         case 2: mod_idx = 0; break;
         case 3: mod_idx = 3; break;
         default: mod_idx = 1; break;
      }
   }
   $(this).val(mod_idx).selectmenu('refresh');
});

$('.coltxt').each(function() {
   var col = $(this).attr('id').replace('txt', '');
   var col_id = col + 'hdr';
   var toc_id = '#' + col + 'toc';
   var mod_idx = $('#' + col + 'mod').val();
   var paper = colpaper_map[col_id];
   var paper_num = paper.replace(/0*(..*)/,'$1'); /* strip the leading zeros */
   $(this).load('text/' + mod_idx + '/p' + paper + '.html');
   $(toc_id).load('text/' + mod_idx + '/toc.html', function() {
      var toc = $(this).find('.toc');
      toc.bonsai();
      $('#' + col + 'title').html(toc.find('.U' + paper_num + '_0_1').html());
      if (active_column_id == col_id) $(toc_id).removeClass('hidden');
      /* XXX: the following code is executed three times, but if we use deferred functions we could run it only once */
      if (!$('#tooltips').is(':checked')) { $(document).tooltip('option', 'disabled', true); }
   });
});

$('#search_part').selectmenu({width: 120});
$('#search_mode').selectmenu({width: 130});
$('#search_range').selectmenu({width: 180});
$('.buttons').button();
$(document).tooltip({ content: function () { return this.getAttribute("title"); }, }); /* this enables html in tooltips */
$('#tooltips').change(function() {
    if ($(this).is(':checked')) {
       $(document).tooltip('option', 'disabled', false);
       document.cookie = 'tooltips=1; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    } else {
       $(document).tooltip('option', 'disabled', true);
       document.cookie = 'tooltips=0; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    }
});

$('#animations').change(function() {
   document.cookie = 'animations=' + ($(this).is(':checked') ? 1 : 0) + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
});

$('#help').draggable();
$('#help_button').click(function(event) { $('#help').toggleClass('hidden'); });
$('#clear').click(function(event) { $('#search_text').val('').trigger('focus'); });

$('.toc_container,#search_results').on('click', 'a', function(e) {
  e.preventDefault();
  var delay = $('#animations').is(':checked') ? 606 : 0;
  var href = $(this).attr('href');
  var paper_num = href.replace(/.U([0-9][0-9]*)_.*_.*/,'$1');
  var paper = ("000" + paper_num).slice(-3);
  var col = active_column_id.replace('hdr', '');
  var coltxt = '#' + col + 'txt';
  if (colpaper_map[active_column_id] != paper) { /* need to load a different paper */
     var mod_idx = $('#' + col + 'mod').val();
     $(coltxt).load('text/' + mod_idx + '/p' + paper + '.html', function() {
        var title = $('#' + col + 'toc').find('.toc').find('.U' + paper_num + '_0_1').html();
        $('#' + col + 'title').html(title);
        colpaper_map[col + 'hdr'] = paper;
        $(coltxt).scrollTo(href, delay);
     });
  } else {
     $(coltxt).scrollTo(href, delay);
  }
});

$('.coltxt').on('click', 'a', function(e) {
  e.preventDefault();
  var this_column = e.delegateTarget;
  var delay = $('#animations').is(':checked') ? 606 : 0;
  var href = $(this).attr('href');
  var paper_num = href.replace(/.U([0-9][0-9]*)_.*_.*/,'$1');
  var paper = ("000" + paper_num).slice(-3);
  $('.coltxt').not(this_column).each(function() {
      var col = $(this).attr('id').replace('txt','');
      var mod_idx = $('#' + col + 'mod').val();
      var coltxt = '#' + col + 'txt';
      if (colpaper_map[col + 'hdr'] != paper) { /* need to load a different paper */
         $(coltxt).load('text/' + mod_idx + '/p' + paper + '.html', function() {
             var title = $('#' + col + 'toc').find('.toc').find('.U' + paper_num + '_0_1').html();
             $('#' + col + 'title').html(title);
             colpaper_map[col + 'hdr'] = paper;
             $(coltxt).scrollTo(href, delay);
         });
      } else {
         $(coltxt).scrollTo(href, delay);
      }
  });
  $(this_column).scrollTo(href, delay);
});

$('.colupdown').click(function() {
  var coltxt = '#' + $(this).parent().attr('id').replace('hdr','txt');
  var delay = $('#animations').is(':checked') ? 606 : 0;
  offset = $(this).attr('name') == 'up' ? 0 : $(coltxt)[0].scrollHeight;
  $(coltxt).scrollTo(offset, delay);
});

$('.closewin').click(function() { switch_active_column('.' + $(this).parent().attr('id').replace('hdr','')); });

$('#language').selectmenu({
  change: function(event, ui) {
     document.cookie = 'lang=' + ui.item.value + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
     location.reload();
  },
  width: 140
});

$('#themes').selectmenu({
  change: function(event, ui) {
     document.cookie = 'theme=' + ui.item.value + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
     location.reload();
  },
  width: 200
});

$('#toc_expand_collapse').click(function(event) {
    var toc_id = $('#' + active_column_id.replace('hdr', 'toc')).find('.toc');
    $(toc_id).find('li.expanded').length != 0 ? $(toc_id).bonsai('collapseAll') : $(toc_id).bonsai('expandAll');
});

var ic = 1;

$('#ic').click(function(event) {
   $('#ic_lab').html(ic ? 'a &#8800; A' : 'a = A');
   ic = 1 - ic;
   $('#search_text').trigger('focus');
});

$('#max_height').click(function(event) {
    var ctl_height = $('#panels td').offset().top + 27;
    var data_height = $(window).height() - ctl_height;
    $('.data').height(data_height);
});

$('#max_width').click(function(event) {
    var ncolumns = $('.headers').not('.hidden').length;
    var column_width = $(window).width()/ncolumns;
    $('.headers,.toc_container,#search_results').width(column_width);
});

$('#search').click(function(event) {
    var html = $('#search_text').val().trim(); /* may contain html tags */
    var text = $('<div/>').html(html).text(); /* strip html tags, if any */
    if (text) {
       var col = active_column_id.replace('hdr', '');
       var mod_idx = $('#' + col + 'mod').val();
       var search_req = "search.php" + "?text=" + encodeURIComponent(text) + "&mod_idx=" + mod_idx + "&ic=" + ic;
       var txtmod = text_map[mod_idx];
       $('#search_status').removeClass('ui-icon-search').addClass('ui-icon-refresh');
       $('#search_text').prop('disabled', true);
       $.ajax({url: search_req, success: function(data) {
          var regflags = ic ? 'gi' : 'g';
          var colored = data.replace(new RegExp('(' + text + ')', regflags), '<span style="background-color:yellow;">$1</span>');
          $('#search_results').html(colored);
          $('#search_status').removeClass('ui-icon-refresh').addClass('ui-icon-search');
          $('#search_text').prop('disabled', false).trigger('focus');
       }, dataType: "html"});
    }
});

$(document).keydown(function(event) {
   var key = event.which, ctrl = event.ctrlKey;
   //console.log("key=" + key);
   if (key == 112) { /* F1 */
      event.preventDefault();
      $('#help_button').trigger("click");
   } if (key == 13 && event.target.id == 'search_text') { /* ENTER in a search input box */
      event.preventDefault();
      $('#search').trigger("click");
   } else if (ctrl && key == 48) { /* Ctrl + 0 */
      event.preventDefault();
      $('.col0').toggleClass('hidden');
      $('#max_width').trigger("click");
   } else if (ctrl && key == 49) { /* Ctrl + 1 */
      event.preventDefault();
      switch_active_column('.col1');
   } else if (ctrl && key == 50) { /* Ctrl + 2 */
      event.preventDefault();
      switch_active_column('.col2');
   } else if (ctrl && key == 51) { /* Ctrl + 3 */
      event.preventDefault();
      switch_active_column('.col3');
   } else if (ctrl && key == 52) { /* Ctrl + 4 */
      event.preventDefault();
      $('.col4').toggleClass('hidden');
      $('#max_width').trigger("click");
   } else if (ctrl && key == 53) { /* Ctrl + 5 */
      event.preventDefault();
      $('.col5').toggleClass('hidden');
      $('#max_width').trigger("click");
   } else if (ctrl && key == 72) { /* Ctrl + H */
      event.preventDefault();
      $('#tabs_top').toggleClass('hidden');
      $('#max_height').trigger("click");
   } else if (ctrl && key == 66) { /* Ctrl + B */
      event.preventDefault();
      $('#max_width').trigger("click");
   } else if (ctrl && key == 86) { /* Ctrl + V */
      event.preventDefault();
      $('#max_height').trigger("click");
   } else if (ctrl && key == 83) { /* Ctrl + S */
      event.preventDefault();
      $('#controls').toggleClass('hidden');
      $('#max_height').trigger("click");
   } else if (ctrl && key == 88) { /* Ctrl + X */
      event.preventDefault();
      $('#clear').trigger("click");
   } else if (ctrl && key == 79) { /* Ctrl + O */
      event.preventDefault();
      $('#toc_expand_collapse').trigger("click");
   } else if (ctrl && key == 65) { /* Ctrl + A */
      event.preventDefault();
      $('#ic').trigger("click");
   } else if (ctrl && key == 80) { /* Ctrl + P */
      event.preventDefault();
      $('#tooltips').click();
   } else return;
});

$('.colsize_controls').trigger('click');

function getCookie(name) {
   var value = "; " + document.cookie;
   var parts = value.split("; " + name + "=");
   if (parts.length == 2) return parts.pop().split(";").shift();
}

function switch_active_column(current_column) {
   $(current_column).toggleClass('hidden');
   $('#max_width').trigger("click");
   var newcol = $('.txthdr').not('.hidden').first().attr('id');
   if (newcol != undefined) $('#' + newcol.replace('hdr','rad')).click();
}