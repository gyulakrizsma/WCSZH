(function(){

    //MAP
    function initialize() {
        var mapCanvas = document.getElementById('wcszhmap');
        var mapOptions = {
            center: new google.maps.LatLng(47.381929, 8.536647),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    //MAP

})();
