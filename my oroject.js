document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = function() {
        document.getElementById('backToTop').style.display =
            (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? 'block' : 'none';
    };
    document.getElementById('backToTop').onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
});