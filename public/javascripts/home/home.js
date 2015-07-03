(function(){
    'use strict';

    var WCSZH = {

        /**
         * Initialize
         *
         * @return {void}
         */
        init: function(){

            WCSZH.addListeners();
            WCSZH.initWowPlugin();
            if(window.google !== undefined){
                WCSZH.initGoogleMap();
            }
        },

        /**
         * Handleing listeners
         *
         * @return {void}
         */
        addListeners: function(){
            var $innerCircle = $('.inner-circle');

            $innerCircle.mouseover(WCSZH.showOrHideInfo);
            $innerCircle.mouseout(WCSZH.showOrHideInfo);

            $(window).scroll(function () {
                var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                var $menu = $('.navbar-default'),
                    $logo = $('.navbar-brand img');

                if(top > 40){
                    $menu.removeClass('nav-animate-out');
                    $menu.addClass('nav-animate-in');
                }
                else{
                    $menu.removeClass('nav-animate-in');
                    $menu.addClass('nav-animate-out');
                }

                if(top > window.innerHeight){
                    $logo.addClass('active');
                }
                else{
                    $logo.removeClass('active')
                }

            });

        },

        /**
         * Helper method for the toggle feature
         * in the firsttime section
         *
         * @return {void}
         */
        showOrHideInfo: function(){
            var info = $(this).data('info');
            $('.' + info).toggle('slow');
        },

        /**
         * Initializes WOW.js
         *
         * @return {void}
         */
        initWowPlugin: function(){
            var wow = new WOW(
                {
                    mobile: false,
                    animateClass: 'animated'
                }
            );
            wow.init();
        },

        /**
         * Initializes GoogleMap
         *
         * @return {void}
         */
        initGoogleMap: function(){
            var myLatlng = new window.google.maps.LatLng(47.381929, 8.536647);
            var mapProp = {
                center: myLatlng,
                zoom:15,
                scrollwheel: false,
                mapTypeId:window.google.maps.MapTypeId.ROADMAP
            };

            var map = new window.google.maps.Map(document.getElementById('wcszhmap'), mapProp);

            var marker = new window.google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Atelier Tanz',
                animation: window.google.maps.Animation.DROP,
                //icon: '/images/home/carmarker.png'
            });
            window.google.maps.event.addDomListener(window, 'load', initialize);
        }

    }

    WCSZH.init();

})();
