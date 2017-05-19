module.exports = function renderPlayer(name){

  var cleanName = name.replace(/%20/g, ' ');

  return `
<div class="container">
  <h3 id='pageHeader' class="center-align">${cleanName} Arrests</h3>

  <div id='arrest-details'></div>

  

</div>
  `;

}