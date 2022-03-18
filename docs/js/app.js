$(document).ready(function() {
    $('.rf').each(function() {
    		var img = $(this).find('img');

    		var ih = img.height();
    		var iw = img.width();

    		var h = $(window).height() - ih;
    		var w = $(window).width() - iw;

    		var nh = Math.floor(Math.random() * h);
    		var nw = Math.floor(Math.random() * w);

    		$(this).css('top',nh);
    		$(this).css('left',nw);
    })

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
    var rand = back[Math.floor(Math.random() * back.length)];
    $('body').css('background-color',rand);
    $('.grid-container').css('opacity',1);
    $('.grid-container').css('visibility','visible');

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
            $("#" + collectionId + " .floaters").addClass("active-floaters");
            $(".collection-name").addClass("active-collection");
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

            /* $("#home").append(pagination); */
            $(".pagination a").on("click",$.scrollify.move);
        }
    });

    Fancybox.defaults.Hash = false;

    Fancybox.bind("[data-fancybox]", {
      infinite: true,
      hideScrollbar: false,
      animated: true,
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
          $(".grid-container").addClass("hidden");
        },
        destroy: (fancybox, slide) => {
          $(".grid-container").removeClass("hidden");
        },
      }
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
