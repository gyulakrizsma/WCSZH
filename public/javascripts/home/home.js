(function ($) {
    'use strict';

    var WCSZH = {
        $ipadSize: 980,
        
        /**
         * Initialize
         *
         * @return {void}
         */
        init: function () {

            WCSZH.addListeners();
            WCSZH.initWowPlugin();
            WCSZH.initCarousel();
            if (window.google !== undefined) {
                WCSZH.initGoogleMap();
            }
        },

        /**
         * Handling listeners
         *
         * @return {void}
         */
        addListeners: function () {
            var $innerCircle = $('.inner-circle'),
                $titleCont = $('.title-cont'),
                $bouncingArrow = $('.arrow'),
                $videoCont = $('.video-cont');

            $innerCircle.mouseover(WCSZH.showInfo);
            $innerCircle.mouseout(WCSZH.hideInfo);
            $bouncingArrow.click(WCSZH.scrollTo);
            
            /*
            Handling the video inject based on screensize
            */
            if (document.body.clientWidth >= WCSZH.$ipadSize) {
                WCSZH.addVideo($videoCont);
            }
        
            // If you want to autoplay when the window resized wider than 780px 
            // after load, you can add this:
            $(window).resize(function () {
                if (document.body.clientWidth >= WCSZH.$ipadSize) {
                    WCSZH.addVideo($videoCont);
                }
                else {
                    WCSZH.removeVideo($videoCont);
                }
            });
            
            // Handling the menu which comes in when you scroll down
            $(window).scroll(function () {
                var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                var $menu = $('.navbar-default'),
                    //$logoHeight = $('.title-cont').height(),
                    $logo = $('.navbar-brand img');

                //if (top > window.innerHeight / 3) {
                if (top > 100) {
                    $menu.removeClass('nav-animate-out');
                    $menu.addClass('nav-animate-in');
                    $titleCont.addClass('loaded');
                    $logo.addClass('active');
                }
                else {
                    $menu.removeClass('nav-animate-in');
                    $menu.addClass('nav-animate-out');
                    $titleCont.removeClass('loaded');
                    $logo.removeClass('active')
                }
            });

        },
        
        /**
         * Scrolls to the target
         */
        scrollTo: function (event) {
            var target = $($(this).attr('href'));
            
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        },
        
        /**
         * Helper method for the toggle feature to show infobox
         * in the firsttime section
         *
         * @return {void}
         */
        showInfo: function () {
            var $mainCircleContainer = '.main-circle-container';
            $(this).parents($mainCircleContainer).addClass('active');
            $($mainCircleContainer).not('.active').addClass("not-active")

            var info = $(this).data('info');
            $('.' + info).slideToggle(500);
        },
        
        /**
         * Helper method for the toggle feature to hide infobox
         * in the firsttime section
         *
         * @return {void}
         */
        hideInfo: function () {
            var $mainCircleContainer = $('.main-circle-container');
            $mainCircleContainer.removeClass('not-active')
            $mainCircleContainer.removeClass('active')

            var info = $(this).data('info');
            $('.' + info).slideToggle(500);
        },
        
        /**
         * Helper method for adding the video tag to the page
         * @return {void}
         */
        addVideo: function ($videoCont) {

            $videoCont.prepend(
                '<video autoplay="" loop="" muted="">' +
                '<source src="/public/images/home/03.mp4" type="video/mp4">' +
                '</video>');

            $videoCont.removeClass('video-bg')
        },
        
        /**
         * Helper method for removing the video tag to the page
         * @return {void}
         */
        removeVideo: function ($videoCont) {
            $videoCont.addClass('video-bg')
            $videoCont.remove('video');
        },

        /**
         * Initializes WOW.js
         *
         * @return {void}
         */
        initWowPlugin: function () {
            var wow = new WOW(
                {
                    mobile: false,
                    animateClass: 'animated'
                }
                );
            wow.init();
        },

        initCarousel: function () {

            $('.carousel').carousel({
                interval: 6000,
                pause: "false"
            });
        },

        /**
         * Initializes GoogleMap
         *
         * @return {void}
         */
        initGoogleMap: function () {
            var myLatlng = new window.google.maps.LatLng(47.381929, 8.536647);
            var mapProp = {
                center: myLatlng,
                zoom: 15,
                scrollwheel: false,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP
            };

            if (document.body.clientWidth <= WCSZH.$ipadSize) {
                mapProp.draggable = false;
            }

            var map = new window.google.maps.Map(document.getElementById('wcszhmap'), mapProp);

            var marker = new window.google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Atelier Tanz',
                animation: window.google.maps.Animation.DROP,
            });

            WCSZH.attachSecretMessage(marker, 'Atelier Tanz <br /><a target="_blank" href="https://www.google.ch/maps/dir//Atelier:Tanz+Tanzschule+Z%C3%BCrich,+Ausstellungsstrasse+25,+8005+Z%C3%BCrich/@47.3818112,8.4626751,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x47900a0e9d43e57b:0xa883f7e0926304a6!2m2!1d8.5366626!2d47.3817188?hl=hu">Ausstellungsstrasse 25</a>');
        },
        
        /**
         * Attaches an info window to a marker with the provided message. When the
         * marker is clicked, the info window will open with the secret message.
         *
         * @return {void}
         */
        attachSecretMessage: function (marker, secretMessage) {
            var infowindow = new window.google.maps.InfoWindow({
                content: secretMessage
            });

            marker.addListener('click', function () {
                infowindow.open(marker.get('map'), marker);
            });
        }
    }

    WCSZH.init();

})(window.jQuery);