const IndexPage = require('./pages/IndexPage');

$(document).ready(() => {
  const indexPage = new IndexPage(document.getElementById('root'));

    $('select').material_select();
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({fullWidth: true});


  indexPage.render();
});

