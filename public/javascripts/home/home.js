(function(){
    'use strict';

    var opened;

    function initialize() {
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
    }
    window.google.maps.event.addDomListener(window, 'load', initialize);
    //MAP

    $('.inner-circle').mouseover(showOrHideInfo);

    $('.inner-circle').mouseout(showOrHideInfo);

    function showOrHideInfo() {

        var info = $(this).data('info');
        $('.' + info).toggle('slow');
    }

})();
