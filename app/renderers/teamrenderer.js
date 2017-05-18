module.exports = function renderTeam(team){

  return `<nav class="uk-navbar">
  <ul class="uk-navbar-nav">
      <li class="uk-active"><a href="">Home</a></li>
      <li><a href="">All NFL</a></li>
  </ul>
</nav>
<h1 id='pageHeader' class='uk-text-center'>${team}</h1>

<div class="uk-container uk-container-center">
  <div class='uk-text-center'>
    <div id="team-line-chart"></div>
    <div id="team-donut-chart"></div>
    <div id="team-players-list" class=''></div>

  </div>

</div>`;
}