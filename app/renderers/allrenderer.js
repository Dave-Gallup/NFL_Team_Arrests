module.exports = function renderAllTeams(){

  return `<nav class="uk-navbar">
  <ul class="uk-navbar-nav">
      <li class="uk-active"><a href="">Home</a></li>
  </ul>
</nav>
<h1 id='pageHeader' class='uk-text-center'>All NFL Arrests By Team</h1>

<div class="uk-container uk-container-center">
  <div class='uk-text-center'>
    <div id="all-teams-line-chart"></div>
  </div>

</div>`;
}