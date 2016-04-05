var map;
var imagesLoaded = false;
var mapLoaded = false;
var mapReady = false;

function initMap() {
    mapReady = true;
}

function loadMap() {
    var myLatLng = {
        lat: 43.393762,
        lng: -5.658392
    }
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 16,
        scrollwheel: false
    });
    var infowindow = new google.maps.InfoWindow({
        content: '<table><thead><tr><th colspan="2">Pintor y Decorador POLI</th></tr></thead><tbody><tr><td>Dirección:</td><td>C/ Ángel Embil, 1 Bajo - 33510 Pola de Siero (Asturias)</td></tr><tr><td>Teléfono:</td><td>(+34) 985 720 492 - (+34) 639 914 748</td></tr><tr><td>Fax:</td><td>(+34) 985 720 492</td></tr><tr><td>Email:</td><td><a href=mailto:poli@pinturaspoli.es>poli@pinturaspoli.es</a></td></tr></tbody></table>'
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Pintor y Decorador POLI'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

function setImagesToPortfolio() {
    var items = $("section#portfolio ul li");
    items.each(function() {
        $(this).css('background-image', 'url("img/works/' + $(this).data("name") + '.jpg")');
    });
}

function toogleMenu() {
    $("nav div.menu span").toggleClass("click");
    $("nav ul").toggleClass("visible");
}

$(function() {
    $("nav a.option").click(function(e) {
        e.preventDefault();

        var target = $(this);

        $("html, body").stop().animate({
            scrollTop: $(target.attr("href")).offset().top - 64
        }, 1000);
    });

    $(window).scroll(function() {
        if (!imagesLoaded && ($(window).scrollTop() * 2 > $("#portfolio").offset().top)) {
            imagesLoaded = true;
            setImagesToPortfolio();
        }
        if (mapReady && !mapLoaded && ($(window).scrollTop() * 2 > $("#contact").offset().top)) {
            mapLoaded = true;
            loadMap();
        }
        if (map != undefined) {
            map.setOptions({
                scrollwheel: false
            });
        }
    })

    $("#map").click(function(e) {
        map.setOptions({
            scrollwheel: true
        });
    });

    $(".menu").click(function(e) {
        e.preventDefault();
        toogleMenu();
    })

});
