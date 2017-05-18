module.exports = function renderIndex(teams){

  var teamNamesOptions = '';

  for(let id in teams){
    teamNamesOptions += `<option value='${id}' selected>${teams[id].city} ${teams[id].name}</option>`;
  }

  return `<nav class="uk-navbar">
  <ul class="uk-navbar-nav">
      <li class="uk-active"><a href="">Home</a></li>
      <li class='nfl'><a href="">All NFL</a></li>
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
              ${teamNamesOptions}
            </select>
        </div>
        <button id='submit-team-button' type='submit' class="uk-button uk-button-default">select</button>

    </fieldset>
</form>
</div>
`;
}