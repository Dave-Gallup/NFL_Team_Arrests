const IndexPage = require('./pages/IndexPage');

$(document).ready(() => {
  const indexPage = new IndexPage(document.getElementById('root'));
  indexPage.render();
});

// document.addEventListener('DOMContentLoaded', function() {
//   // do your setup here
//   console.log('Initialized app');
// });
