/* @insert _zepto.min.js */
window.Zepto = Zepto;
window.jQuery = Zepto;

/* @insert _lunr.min.js */
/* @insert _awesomplete.min.js */
/* @insert _bigslide.min.js */
/* @insert _json-formatter.js */
/* @insert _perfect-scrollbar.jquery.min.js */

$(document).ready(function () {
    $('.menu-link').bigSlide();
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').scrollTop(0);
        });
    }

    index = null;
    store = null;
    query = null;
    var input = document.getElementById("searchbox");
    if (input !== null) {
        var awesomplete = new Awesomplete(input, {
            minChars: 1,
            autoFirst: false,
            filter: function (text, input) {
                return true;
            }
        });
    }

    window.addEventListener("awesomplete-selectcomplete", function (e) {
        // User made a selection from dropdown.
        // This is fired after the selection is applied
        console.log(e);
        $(input).val(e.text.label);
        window.open(e.text.value, '_self', false);
    }, false);

    $.getJSON('/index.json', function (data) {
        console.log('Loading Search Index');
        store = data.store;
        index = lunr.Index.load(data.index);
        console.log('Search Index loaded');
        if (index === null) {
            console.error('Index is still undefined');
        }
    });
    function performSearch() {
        query = $('#searchbox').val();
        var results = index.search(query);
        console.log('Query: ' + query);
        console.log('Total Results found:' + results.length);
        matches = results.map(function (result) {
            return {
                label: store[result.ref].title,
                value: store[result.ref].href
            };
        });
        awesomplete.list = matches;
    }
    $('#searchbox').on('keyup', function () { performSearch(); });
    function keepFooterAtBottom() {
        var docHeight = $(window).height();
        var footerHeight = $('#footer').height();
        var footerTop = $('#footer').position().top + footerHeight;

        if (footerTop < docHeight) {
            $('#footer').css('margin-top', (docHeight - footerTop) + 'px');
        }
    }
    keepFooterAtBottom();
    $(window).resize(function () { keepFooterAtBottom(); });

    var displayJson = function (div) {
        var json = JSON.parse($(div).find("code.source").html());
        var formatter = new JSONFormatter(json);
        $(div).find("div.json").append(formatter.render());
    };

    // Enable the json formatter in all places that it's required
    $(".terminal-example").each(function(i, item) {
        // Process the request
        if ($(item).find(".request code.source").length > 0) {
            displayJson($(item).find(".request"));
        }
        // Process the response
        if ($(item).find(".response code.source").length > 0) {
            displayJson($(item).find(".response"));
        }
    });

    // Enable perfect scrollbar on left nav bar
    $(".scrollable").perfectScrollbar();
});
