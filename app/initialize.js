const IndexPage = require('./pages/IndexPage');

$(document).ready(() => {
  const indexPage = new IndexPage(document.getElementById('root'));

  $('select').material_select();
  $('.carousel').carousel({
      duration: 100,
      indicators: true,
      onCycleTo: function(data) {
        let val = (data[0].id);
        //console.log(val);
        $('#team-select').val(val);
        $('#team-select').material_select();
        // console.log((data[0].id).substring(0, (data[0].id).indexOf('_')));
        //console.log(data);
     }
  });


  indexPage.render();
});

