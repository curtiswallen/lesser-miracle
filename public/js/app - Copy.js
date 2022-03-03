$(document).ready(function() {
    $('.rf').each(function() {
        animateDiv($(this));
    })

    $('.rf').hover(function() {
        $(this).clearQueue();
        $(this).stop();
    }, function() {
        animateDiv($(this));
    });

    var back = ["#9c0012","#85a2bb","#a76429"];

    $('.scroll-section').each(function() {
        var rand = back[Math.floor(Math.random() * back.length)];
        back.splice(back.indexOf(rand), 1);
        $(this).css('background-color',rand);
    })

    $(".big-logo").click(function () {
        $.scrollify.next();
    })

    $("#about").click(function () {
        if ($("#about-content").hasClass("hidden")) {
            $("#about-content").removeClass("hidden");
            $("#contact-content").addClass("hidden");
        } else {
            $("#about-content").addClass("hidden");
        }
    });

    $("#about-content").click(function () {
        $("#about-content").addClass("hidden");
    })

    $("#contact").click(function () {
        if ($("#contact-content").hasClass("hidden")) {
            $("#contact-content").removeClass("hidden");
            $("#about-content").addClass("hidden");
        } else {
            $("#contact-content").addClass("hidden");
        }
    });

    $("#contact-content").click(function () {
        $("#contact-content").addClass("hidden");
    })


    $(".floaters img").click(function () {
        var parentTag = $(this).parents().eq(2).attr("id");
        $("#about").addClass("hidden");
        $("#contact").addClass("hidden");
        $(".pagination").addClass("hidden");
        $.scrollify.disable()
        $("#" + parentTag + " .collection-name").removeClass("active-collection");
        $("#" + parentTag + " .grid-container").addClass("active-grid");
        $("#" + parentTag + " .floaters").removeClass("active-floaters");
        $('.grid').masonry({
          itemSelector: '.grid-item',
          columnWidth: '.grid-sizer',
          percentPosition: true
        });
    });

    $(".grid-close").click(function () {
        var parentTag = $(this).parents().eq(2).attr("id");
        $("#" + parentTag + " .grid-container").removeClass("active-grid");
        $("#" + parentTag + " .floaters").addClass("active-floaters");
        $("#" + parentTag + " .collection-name").addClass("active-collection");
        $("#about").removeClass("hidden");
        $("#contact").removeClass("hidden");
        $(".pagination").removeClass("hidden");
        $.scrollify.enable()
    });

    $.scrollify({
        section : ".scroll-section",
        easing: "easeOutExpo",
        scrollSpeed: 1100,
        offset : 0,
        scrollbars: false,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        updateHash: true,
        touchScroll: true,
        before: function(i,panels) {
            var ref = panels[i].attr("data-section-name");
            $(".pagination .active").removeClass("active");
            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
            $(".floaters").removeClass("active-floaters");
            $(".big-logo").removeClass("active-logo");
            var collectionId = panels[i].attr("id");
            if ($("#" + collectionId + " .grid-container").hasClass("active-grid")) {
                $("#" + collectionId + " .floaters").removeClass("active-floaters");
                $("#" + collectionId + " .collection-name").removeClass("active-collection");
            } else {
                $("#" + collectionId + " .floaters").addClass("active-floaters");
                $("#" + collectionId + " .collection-name").addClass("active-collection");
            }
            if (collectionId === "home") {
                $(".big-logo").addClass("active-logo");
                $(".collection-name").css("position", "absolute");
            }
        },
        after: function(i,panels) {
        		var collectionId = panels[i].attr("id");
        		if (collectionId != "home") {
                $(".collection-name").css("position", "fixed");
            }
        },
        afterRender: function() {
            $(".big-logo").addClass("active-logo");
            var pagination = "<ul class=\"pagination\">";
            var activeClass = "";
            $(".scroll-section").each(function(i) {
            activeClass = "";
            if(i===$.scrollify.currentIndex()) {
              activeClass = "active";
            }
            pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
            });

            pagination += "</ul>";

            $("#home").append(pagination);
            $(".pagination a").on("click",$.scrollify.move);
        }
    });

    Fancybox.defaults.Hash = false;

    Fancybox.bind("[data-fancybox]", {
      infinite: true,
      hideScrollbar: false,
      animated: false,
      showClass: false,
      hideClass: false,
      placeFocusBack: false,
      dragToClose: false,
      trapFocus: true,
      clickContent: false,
      toolbar: false,
      Image: {
        zoom: false,
        wheel: false,
        click: false
      },
      on: {
        load: (fancybox, slide) => {
          $(".rf").addClass("hidden");
          $("#contact").addClass("hidden");
          $("#about").addClass("hidden");
          $(".pagination").addClass("hidden");
          $.scrollify.disable();
        },
        destroy: (fancybox, slide) => {
          if ($(".grid-container").hasClass("active-grid")) {
            $(".rf").removeClass("hidden");
          } else {
            $.scrollify.enable();
            $(".rf").removeClass("hidden");
            $("#contact").removeClass("hidden");
            $("#about").removeClass("hidden");
            $(".pagination").removeClass("hidden");
          }
        },
      }
    });

});

var $grid = $('.grid').imagesLoaded( function() {

  $grid.masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: 0
  });

});

function makeNewPosition($container) {

    // Get viewport dimensions (remove the dimension of the div)
    var img = $container.find('img');

    var ih = img.height();
    var iw = img.width();

    var h = $(window).height() - ih;
    var w = $(window).width() - iw;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function animateDiv($target) {
    var newq = makeNewPosition($target.parent());
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $target.animate({
        top: newq[0],
        left: newq[1]
    }, speed, function() {
        animateDiv($target);
    });

};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = .1;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;

}