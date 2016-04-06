var images = {
    aislamientostermicos: 8,
    curiosidades: 18,
    decorativas: 17,
    exteriores: 28,
    iglesias: 10,
    imitaciones: 8,
    industriales: 7,
    interiores: 13,
    panelesfibra: 4,
    restaurantes: 6,
    tejados: 2
};

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

function loadGallery(name, title) {
    $(".gallery p.title").text(title);
    var fotorama = $('#fotorama').fotorama().data('fotorama');
    if (fotorama.size > 0) {
        fotorama.show(0);
    }
    var imagesArray = [];
    for (var i = 1; i <= images[name]; i++) {
        var file = "img/works/" + name + "/" + i + ".jpg";
        imagesArray.push({
            img: file
        });
    }
    console.log(imagesArray);
    fotorama.load(imagesArray);
}

function setImagesToPortfolio() {
    var items = $("section#portfolio ul li");
    items.each(function() {
        $(this).css('background-image', 'url("img/works/' + $(this).data("name") + '.jpg")');
        $(this).click(function(e) {
            e.preventDefault();
            var name = $(this).data("name");
            var title = $(this).find("p:first").html();
            loadGallery(name, title);
        });
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

        $("nav div.menu span").removeClass("click");
        $("nav ul").removeClass("visible");
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
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $("body").removeClass("modal-open");
        }
    });

    $(".gallery .close").click(function(e) {
        e.preventDefault();
        $("body").removeClass("modal-open");
    });

    $("section#portfolio li").click(function(e) {
        e.preventDefault();
        $("body").addClass("modal-open");
    });
});
