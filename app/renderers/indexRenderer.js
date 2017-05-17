module.exports = function renderIndex(){
  return `<nav class="uk-navbar">
  <ul class="uk-navbar-nav">
      <li class="uk-active"><a href="">Home</a></li>
      <li><a href="">Players</a></li>
      <li><a href="">All NFL</a></li>
  </ul>
</nav>
<h1 id='pageHeader' class="uk-text-center">Select a team</h1>

<div class="uk-container uk-container-center">
  <div class="uk-slidenav-position uk-margin" data-uk-slider="{center:true}">

      <div class="uk-slider-container">
          <ul class="uk-slider uk-grid-width-medium-1-4">
              <li><img src="images/DEN_sm.png" alt=''/></li>
              <li><img src="images/DEN_sm.png" alt=''/></li>
              <li><img src="images/DEN_sm.png" alt=''/></li>
              <li><img src="images/DEN_sm.png" alt=''/></li>
              <li><img src="images/DEN_sm.png" alt=''/></li>
              <li><img src="images/DEN_sm.png" alt=''/></li>
              <li><img src="images/DEN_sm.png" alt=''/></li>
              <li><img src="images/DEN_sm.png" alt=''/></li>
              <li><img src="images/DEN_sm.png" alt=''/></li>
              <li><img src="images/DEN_sm.png" alt=''/></li>
          </ul>
      </div>

      <a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slider-item="previous"></a>
      <a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slider-item="next"></a>

  </div>
  <form id='team-submit-form'>
    <fieldset class="uk-fieldset uk-text-center">
        <div class="uk-margin">
            <select id='team-select' class="uk-select uk-form-large">
              <option value='CHI' selected>Chicago Bears</option>
              <option value='MIN'>Minnesota Vikings</option>
              <option value='TEN'>Nashville Titans</option>
              <option value='HOU'>Houston Texans</option>
              <option value='PIT'>Pittsburgh Steelers</option>
              <option value='SEA'>Seattle Seahawks</option>
              <option value='NO'>New Orleans Saints</option>
              <option value='WAS'>Washington DC Redskins</option>
              <option value='BAL'>Baltimore Ravens</option>
              <option value='LA'>Los Angeles Rams</option>
              <option value='OAK'>Oakland Raiders</option>
              <option value='NE'>New England Patriots</option>
              <option value='CAR'>Charlotte Panthers</option>
              <option value='GB'>Green Bay Packers</option>
              <option value='NYG'>New York NY Giants</option>
              <option value='DET'>Detroit Lions</option>
              <option value='NYJ'>New York Jets</option>
              <option value='JAC'>Jacksonville Jaguars</option>
              <option value='ATL'>Atlanta Falcons</option>
              <option value='PHI'>Philadelphia Eagles</option>
              <option value='MIA'>Miami Dolphins</option>
              <option value='DAL'>Dallas Cowboys</option>
              <option value='IND'>Indianapolis Colts</option>
              <option value='KC'>Kansas City Chiefs</option>
              <option value='LAC'>Los Angeles Chargers</option>
              <option value='ARI'>Phoenix Cardinals</option>
              <option value='BUF'>Buffalo Bills</option>
              <option value='TB'>Tampa Bay Buccaneers</option>
              <option value='CLE'>Cleveland Browns</option>
              <option value='DEN'>Denver Broncos</option>
              <option value='CIN'>Cincinnati Bengals</option>
              <option value='SF'>San Francisco 49ers</option>
            </select>
        </div>
        <button id='submit-team-button' type='submit' class="uk-button uk-button-default">select</button>

    </fieldset>
</form>
</div>
`;
}