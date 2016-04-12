$(function() {
    $(".menu").click(function(e) {
        e.preventDefault();
        $("nav div.menu span").toggleClass("click");
        $("nav ul").toggleClass("visible");
    });
});
