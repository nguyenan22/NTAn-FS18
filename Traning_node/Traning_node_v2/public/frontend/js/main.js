
$(document).ready(function() {
    "use strict";

    var window_width = $(window).width(),
        window_height = window.innerHeight,
        header_height = $(".default-header").height(),
        header_height_static = $(".site-header.static").outerHeight(),
        fitscreen = window_height - header_height;

    $(".fullscreen").css("height", window_height)
    $(".fitscreen").css("height", fitscreen);

    //------- Niceselect  js --------//  

    if (document.getElementById("default-select")) {
        $('select').niceSelect();
    };
    if (document.getElementById("default-select2")) {
        $('select').niceSelect();
    };

    //------- Lightbox  js --------//  

    $('.img-gal').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.play-btn').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    //------- Datepicker  js --------//  

      $( function() {
        $( "#datepicker" ).datepicker();
        $( "#datepicker2" ).datepicker();
      } );


    //------- Superfist nav menu  js --------//  

    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        },
        speed: 400
    });


    //------- Accordion  js --------//  

    jQuery(document).ready(function($) {

        if (document.getElementById("accordion")) {

            var accordion_1 = new Accordion(document.getElementById("accordion"), {
                collapsible: false,
                slideDuration: 500
            });
        }
    });

    //------- Owl Carusel  js --------//  

    $('.active-gallery-carusel').owlCarousel({
        items:1,
        loop:true,
        nav:true,
        navText: ["<span class='lnr lnr-arrow-left'></span>",
        "<span class='lnr lnr-arrow-right'></span>"],  
        smartSpeed:650,           
    });

    $('.active-testimonial').owlCarousel({
        items: 2,
        loop: true,
        margin: 30,
        autoplayHoverPause: true,
        dots: true,
        autoplay: true,
        nav: true,
        navText: ["<span class='lnr lnr-arrow-up'></span>", "<span class='lnr lnr-arrow-down'></span>"],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1,
            },
            768: {
                items: 2,
            }
        }
    });

    $('.active-brand-carusel').owlCarousel({
        items: 4,
        loop: true,
        margin: 30,
        autoplayHoverPause: true,
        smartSpeed:650,         
        autoplay:true, 
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 2,
            },
            768: {
                items: 4,
            }
        }
    });

    //------- Search Form  js --------//  

    $(document).ready(function(){
      $('#search').on("click",(function(e){
      $(".form-group").addClass("sb-search-open");
        e.stopPropagation()
      }));
       $(document).on("click", function(e) {
        if ($(e.target).is("#search") === false && $(".form-control").val().length == 0) {
          $(".form-group").removeClass("sb-search-open");
        }
      });
        $(".form-control-submit").click(function(e){
          $(".form-control").each(function(){
            if($(".form-control").val().length == 0){
              e.preventDefault();
              $(this).css('border', '2px solid red');
            }
        })
      })
    })

    //------- Mobile Nav  js --------//  

    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body .main-menu').append($mobile_nav);
        // $('body .main-menu').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i><span class="menu-title">Menu</span> </button>');
        $('body .main-menu').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
            $('#mobile-body-overly').toggle();
        });

            $(document).on('click', function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }


    //------- Sticky Main Menu js --------//  


    window.onscroll = function() {stickFunction()};

    var navbar = document.getElementById("main-menu");
    var sticky = navbar.offsetTop;
    function stickFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }


    //------- Smooth Scroll  js --------//  

    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($('#header').length) {
                    top_space = $('#header').outerHeight();

                    if (!$('#header').hasClass('header-fixed')) {
                        top_space = top_space;
                    }
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('lnr-times lnr-bars');
                    $('#mobile-body-overly').fadeOut();
                }
                return false;
            }
        }
    });

    $(document).ready(function() {

        $('html, body').hide();

        if (window.location.hash) {

            setTimeout(function() {

                $('html, body').scrollTop(0).show();

                $('html, body').animate({

                    scrollTop: $(window.location.hash).offset().top - 108

                }, 1000)

            }, 0);

        } else {

            $('html, body').show();

        }

    });


    //------- Google Map  js --------//  

    if (document.getElementById("map")) {
        google.maps.event.addDomListener(window, 'load', init);

        function init() {
            var mapOptions = {
                zoom: 11,
                center: new google.maps.LatLng(40.6700, -73.9400), // New York
                styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e9e9e9"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 29
                    }, {
                        "weight": 0.2
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 18
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }, {
                        "lightness": 21
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#dedede"
                    }, {
                        "lightness": 21
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#ffffff"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "saturation": 36
                    }, {
                        "color": "#333333"
                    }, {
                        "lightness": 40
                    }]
                }, {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f2f2f2"
                    }, {
                        "lightness": 19
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#fefefe"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#fefefe"
                    }, {
                        "lightness": 17
                    }, {
                        "weight": 1.2
                    }]
                }]
            };
            var mapElement = document.getElementById('map');
            var map = new google.maps.Map(mapElement, mapOptions);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(40.6700, -73.9400),
                map: map,
                title: 'Snazzy!'
            });
        }
    }

    //------- Mailchimp js --------//  

    $(document).ready(function() {
        $('#mc_embed_signup').find('form').ajaxChimp();
    });

});


// youtube custom play button and thumbail script


    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    var onYouTubeIframeAPIReady = function () {
        player = new YT.Player('player', {
            height: '244',
            width: '434',
            videoId: 'VZ9MBYfu_0A',  // youtube video id
            playerVars: {
                'autoplay': 0,
                'rel': 0,
                'showinfo': 0
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    var p = document.getElementById ("player");
    $(p).hide();

    var t = document.getElementById ("thumbnail");
    //t.src = "img/video/play-btn.png";

    var onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            $('.start-video').fadeIn('normal');
        }
    }

    $(document).on('click', '.start-video', function () {
        $(this).hide();
        $("#player").show();
        $("#thumbnail_container").hide();
        player.playVideo();
    });


    ///

    function formatStringHelper(content,count) { 
        if (content=='') return ''
        let formatString = content.replace( /(<[^>]+>)/igm , "")
        if (formatString.length < count) return formatString
        return content.replace( /(<[^>]+>)/igm , "").substring(0,count)+ '...'}

    $(document).ready(function(){
        const items_per_page=2
        let page=2
        const folderUpload='uploads/articles/'
        $('.primary-btn').click(function() {
            let html=''
            $.ajax({
                url: `${window.location.href}/${page}/${items_per_page}`,
                type: 'GET',
                dataType: 'json', // added data type
                success: function(res) {
                    res.slice(0,items_per_page).forEach(data =>{
                        console.log(res.length)
                        page +=1
                        
                        html += `            <div class="single-latest-post row align-items-center">
                        <div class="col-lg-5 post-left">
                            <div class="feature-img relative">
                                <div class="overlay overlay-bg"></div>
                                <img class="img-fluid" src="${folderUpload}/${data.thumb}" alt="">
                            </div>
                            <ul class="tags">
                                <li>
                                    <a href="${window.location.href}">${$('#category-name').text()}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-7 post-right">
                            <a href="${'/post/'+ data.slug }">
                                <h4>${data.title} </h4>
                            </a>
                            <ul class="meta">
                                <li>
                                    <a href="#">
                                        <span class="lnr lnr-user"></span>${data.created.user_name}  </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="lnr lnr-calendar-full"></span>${data.createdAt} </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="lnr lnr-bubble"></span>06 Comments</a>
                                </li>
                            </ul>
                            <p class="excert">
                                ${formatStringHelper(data.editorData,100)}
                            </p>
                        </div>
                    </div>`
                    }
                    )
                    if (res.length <= items_per_page) {
                        $('.primary-btn').remove()
                    }
                    $('#load-more').append(html)
                }
            })
            
        })
        
        let slugCategory=$('.slugCategory').text()
        let dataLength=$('.dataLength').text()
         
        $('.next'). click(function () {
            let currentIndex=(parseInt($('.currentIndexArticle').text()) < dataLength-1)? parseInt($('.currentIndexArticle').text())+1 : dataLength -1
            $.ajax({
                url: `http://localhost:3000/post/${slugCategory}/${currentIndex}`,
                type: 'GET',
                dataType: 'json', // added data type
                success: function(res) {

                    let xhtml=`<div class="overlay overlay-bg"></div>
                                <img class="img-fluid" src="${folderUpload}${res[0].thumb}" alt="">`
                    let contentHtml=`
                    <ul class="tags mt-10">
                    <li><a href="/category/${slugCategory}">
                    ${$('#category-name').text()}
                    </a></li>
                </ul>
                <a href="/post/${res[0].slug}">
                    <h3>${res[0].title}</h3>
                    <h3 class="currentIndexArticle" hidden>${currentIndex}</h3>
                    <h3 class="slugCategory" hidden>${slugCategory}</h3>
                    <h3 class="dataLength" hidden>${dataLength}</h3>
                </a>
                <ul class="meta pb-20">
                    <li><a href="#"><span class="lnr lnr-user"></span>${res[0].created.user_name}  </a></li>
                    <li><a href="#"><span class="lnr lnr-calendar-full"></span>${res[0].createdAt}</a></li>
                    <li><a href="#"><span class="lnr lnr-bubble"></span>06 </a></li>
                </ul>
                <p>
                    ${formatStringHelper(res[0].editorData)}
                </p>
                    `
                    $('.feature-img-thumb').html(xhtml) 
                    $('.content-post').html(contentHtml)
                    history.pushState(null, null,`/post/${res[0].slug}`)
                }
        })
        
    })
    
        $('.prev'). click(function () {
            let currentIndex=(parseInt($('.currentIndexArticle').text())>0)? parseInt($('.currentIndexArticle').text())-1 : 0
            console.log(currentIndex)
            $.ajax({
                url: `http://localhost:3000/post/${slugCategory}/${currentIndex}`,
                type: 'GET',
                dataType: 'json', // added data type
                success: function(res) {

                    let xhtml=`<div class="overlay overlay-bg"></div>
                                <img class="img-fluid" src="${folderUpload}${res[0].thumb}" alt="">`
                    let contentHtml=`
                    <ul class="tags mt-10">
                    <li><a href="/category/${slugCategory}">
                    ${$('#category-name').text()}
                    </a></li>
                </ul>
                <a href="/post/${res[0].slug}">
                    <h3>${res[0].title}</h3>
                    <h3 class="currentIndexArticle" hidden>${currentIndex}</h3>
                    <h3 class="slugCategory" hidden>${slugCategory}</h3>
                    <h3 class="dataLength" hidden>${dataLength}</h3>
                </a>
                <ul class="meta pb-20">
                    <li><a href="#"><span class="lnr lnr-user"></span>${res[0].created.user_name}  </a></li>
                    <li><a href="#"><span class="lnr lnr-calendar-full"></span>${res[0].createdAt}</a></li>
                    <li><a href="#"><span class="lnr lnr-bubble"></span>06 </a></li>
                </ul>
                <p>
                    ${formatStringHelper(res[0].editorData)}
                </p>
                    `
                    $('.feature-img-thumb').html(xhtml) 
                    $('.content-post').html(contentHtml)
                    history.pushState(null, null,`/post/${res[0].slug}`)

                }
        })
        })
    })

