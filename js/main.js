$(document).ready(function () {
    $('.header__burger').click(function (event) {
        $('.header-menu').removeClass('close');
        $('.arrow').removeClass('active');
        $('.header-sub-menu__list, .header-sub-sub-menu__list').removeClass('open');
        $('.header__burger, .header-menu, .logo, .logo__link').toggleClass('active');
        $('body').toggleClass('lock');
        document.getElementById("logo__link").setAttribute('href', 'https://drive.google.com/drive/folders/1jCa0I_LPhQG-qI8pH4kPLxY4MVwvnFrI?usp=share_link');
    });
});
$(document).ready(function () {
    $('.header-sub-sub-menu__link').click(function (event) {
        $('.header__burger, .header-menu, .logo, .logo__link').removeClass('active');
        $('body').removeClass('lock');
        $('.header-sub-sub-menu__link, .header-menu').addClass('close');
        document.getElementById("logo__link").setAttribute('href', '#');
    });
});

let isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

let body = document.querySelector('body');
if (isMobile.any()) {
    body.classList.add('touch');
    let arrow = document.querySelectorAll('.arrow');
    for (i = 0; i < arrow.length; i++) {
        let thisLink = arrow[i].previousElementSibling;
        let subMenu = arrow[i].nextElementSibling;
        let thisArrow = arrow[i];

        thisLink.classList.add('parent');
        arrow[i].addEventListener('click', function () {
            subMenu.classList.toggle('open');
            thisArrow.classList.toggle('active');

        });
    }
} else {
    body.classList.add('mouse');
}
