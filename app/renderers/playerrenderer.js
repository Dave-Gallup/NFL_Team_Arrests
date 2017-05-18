module.exports = function renderPlayer(name){

  var cleanName = name.replace(/%20/g, ' ');

  return `<nav class="uk-navbar">
  <ul class="uk-navbar-nav">
      <li class="uk-active"><a href="">Home</a></li>
      <li class='nfl'><a href="">All NFL</a></li>
  </ul>
  </nav>
  <h1 id='pageHeader' class="uk-text-center">${cleanName} Arrests</h1>

  <div class="uk-container uk-container-center">
    <div id='player-arrests-list' class='uk-text-center'></div>
  </div>`;

}