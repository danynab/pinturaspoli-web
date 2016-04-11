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

function checkEmptyField(field) {
    var text = $(field).val();
    if (text.length == 0) {
        $(field).parent(".form-group").addClass("error");
        return false;
    } else  {
        $(field).parent(".form-group").removeClass("error");
        return true;
    }
}

function validateEmailField(field) {
    var email = $(field).val();
    var parent = $(field).parent(".form-group");
    parent.find("p.error").removeClass("hidden");
    parent.find("p.error-email").addClass("hidden");
    if (checkEmptyField(field)) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if (re.test(email)) {
            return true;
        } else {
            parent.addClass("error");
            parent.find("p.error").addClass("hidden");
            parent.find("p.error-email").removeClass("hidden");
            return false;
        }
    } else {
        return false;
    }
}

function checkField() {
    var field = $(this);
    if (field.attr("name") == "email") {
        validateEmailField(field);
    } else {
        checkEmptyField(field);
    }
}

function checkAllFields() {
    var nameField = $("input#name");
    var emailField = $("input#email");
    var phoneField = $("input#phone");
    var commentsField = $("textarea#comments");
    var nameValid = checkEmptyField(nameField);
    var emailValid = validateEmailField(emailField);
    var phoneValid = checkEmptyField(phoneField);
    var commentsValid = checkEmptyField(commentsField);
    var captchaValid = grecaptcha.getResponse().length != 0;
    return nameValid && emailValid && phoneValid && commentsValid && captchaValid;
}

function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (re.test(email)) {
        return true;
    } else {

        return false;
    }
}

function checkSubmitVisibility() {
    var name = $("input#name").val();
    var email = $("input#email").val();
    var phone = $("input#phone").val();
    var comments = $("textarea#comments").val();
    var sendButton = $("input[type=submit]");
    var captchaValid = grecaptcha.getResponse().length != 0;
    if (captchaValid && name.length > 0 && email.length > 0 && phone.length > 0 && comments.length > 0 && validateEmail(email)) {
        sendButton.removeClass("disabled");
        sendButton.prop("disabled", false);
    } else  {
        sendButton.addClass("disabled");
        sendButton.prop("disabled", true);
    }
}

function onFormClick(event) {
    event.preventDefault();
    if (checkAllFields()) {
        var data = {
            nombre: $("input#name").val(),
            email: $("input#email").val(),
            telefono: $("input#phone").val(),
            texto: $("textarea#comments").val()
        };
        onDoneComment();
        $.post("https://formspree.io/poli@pinturaspoli.es", data, "json").done(onDoneComment);
    }
}

function onDoneComment() {
  $("div.sent").removeClass("hidden");
  $("form").addClass("overlap");
}

function resetForm() {
  $("input#name").val("");
  $("input#email").val("");
  $("input#phone").val("");
  $("textarea#comments").val("");
  grecaptcha.reset();
  var sendButton = $("input[type=submit]");
  sendButton.addClass("disabled");
  sendButton.prop("disabled", true);
  $("div.sent").addClass("hidden");
  $("form").removeClass("overlap");
}

function onCorrectCaptcha(response) {
  checkSubmitVisibility();
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

    $(".form form").submit(onFormClick);

    $("form input, form textarea").on("input", checkSubmitVisibility);
    $("form input, form textarea").blur(checkField);

    $(".sent button").click(resetForm);
});
