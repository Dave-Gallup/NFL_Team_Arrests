module.exports = function renderIndex(teams){

  var teamNamesOptions = '';

  for(let id in teams){
    teamNamesOptions += `<option id='${id}_select' value='${id}' selected>${teams[id].city} ${teams[id].name}</option>`;
  }

  return `<div class="container">
    <div class='row'>
      <div class='col s2'>
      </div>
      <div class='col s8'>
        <div class="carousel">
          <a class="carousel-item" href="#ARI!"><img src="images/ARI.png"></a>
          <a class="carousel-item" id="ATL_img" href="#ATL!"><img src="images/ATL.png"></a>
          <a class="carousel-item" id="BAL_img" href="#BAL!"><img src="images/BAL.png"></a>
          <a class="carousel-item" id="BUF_img" href="#BUF!"><img src="images/BUF.png"></a>
          <a class="carousel-item" id="CAR_img" href="#CAR!"><img src="images/CAR.png"></a>
          <a class="carousel-item" id="CHI_img" href="#CHI!"><img src="images/CHI.png"></a>
          <a class="carousel-item" id="CIN_img" href="#CIN!"><img src="images/CIN.png"></a>
          <a class="carousel-item" id="CLE_img" href="#CLE!"><img src="images/CLE.png"></a>
          <a class="carousel-item" id="DAL_img" href="#DAL!"><img src="images/DAL.png"></a>
          <a class="carousel-item" id="DEN_img" href="#DEN!"><img src="images/DEN.png"></a>
          <a class="carousel-item" id="DET_img" href="#DET!"><img src="images/DET.png"></a>
          <a class="carousel-item" id="GB_img" href="#GB!"><img src="images/GB.png"></a>
          <a class="carousel-item" id="HOU_img" href="#HOU!"><img src="images/HOU.png"></a>
          <a class="carousel-item" id="IND_img" href="#IND!"><img src="images/IND.png"></a>
          <a class="carousel-item" id="JAC_img" href="#JAC!"><img src="images/JAC.png"></a>
          <a class="carousel-item" id="KC_img" href="#KC!"><img src="images/KC.png"></a>
          <a class="carousel-item" id="LA_img" href="#LA!"><img src="images/LA.png"></a>
          <a class="carousel-item" id="LAC_img" href="#LAC!"><img src="images/LAC.png"></a>
          <a class="carousel-item" id="MIA_img" href="#MIA!"><img src="images/MIA.png"></a>
          <a class="carousel-item" id="MIN_img" href="#MIN!"><img src="images/MIN.png"></a>
          <a class="carousel-item" id="NE_img" href="#NE!"><img src="images/NE.png"></a>
          <a class="carousel-item" id="NO_img" href="#NO!"><img src="images/NO.png"></a>
          <a class="carousel-item" id="NYG_img" href="#NYG!"><img src="images/NYG.png"></a>
          <a class="carousel-item" id="NYJ_img" href="#NYJ!"><img src="images/NYJ.png"></a>
          <a class="carousel-item" id="OAK_img" href="#OAK!"><img src="images/OAK.png"></a>
          <a class="carousel-item" id="PHI_img" href="#PHI!"><img src="images/PHI.png"></a>
          <a class="carousel-item" id="PIT_img" href="#PIT!"><img src="images/PIT.png"></a>
          <a class="carousel-item" id="SEA_img" href="#SEA!"><img src="images/SEA.png"></a>
          <a class="carousel-item" id="SF_img" href="#SF!"><img src="images/SF.png"></a>
          <a class="carousel-item" id="TB_img" href="#TB!"><img src="images/TB.png"></a>
          <a class="carousel-item" id="TEN_img" href="#TEN!"><img src="images/TEN.png"></a>
          <a class="carousel-item" id="WAS_img" href="#WAS!"><img src="images/WAS.png"></a>
        </div>
      </div>
      <div class='col s2'>
      </div>
    </div>

    <div class='row'>
      <div class='col s3'>
      </div>
      <div class='col s6'>
        <form id='team-submit-form'>
          <fieldset class="center-align">
            <div class="input-field col s12">
              <select>
<option id='MIN_select' value='MIN' selected>Minnesota Vikings</option>
<option id='TEN_select' value='TEN' selected>Nashville Titans</option>
<option id='HOU_select' value='HOU' selected>Houston Texans</option>
<option id='PIT_select' value='PIT' selected>Pittsburgh Steelers</option>
<option id='SEA_select' value='SEA' selected>Seattle Seahawks</option>
<option id='NO_select' value='NO' selected>New Orleans Saints</option>
<option id='WAS_select' value='WAS' selected>Washington Redskins</option>
<option id='BAL_select' value='BAL' selected>Baltimore Ravens</option>
<option id='LA_select' value='LA' selected>Los Angeles Rams</option>
<option id='OAK_select' value='OAK' selected>Oakland Raiders</option>
<option id='NE_select' value='NE' selected>New England Patriots</option>
<option id='CAR_select' value='CAR' selected>Carolina Panthers</option>
<option id='GB_select' value='GB' selected>Green Bay Packers</option>
<option id='NYG_select' value='NYG' selected>New York Giants</option>
<option id='DET_select' value='DET' selected>Detroit Lions</option>
<option id='NYJ_select' value='NYJ' selected>New York Jets</option>
<option id='JAC_select' value='JAC' selected>Jacksonville Jaguars</option>
<option id='ATL_select' value='ATL' selected>Atlanta Falcons</option>
<option id='PHI_select' value='PHI' selected>Philadelphia Eagles</option>
<option id='MIA_select' value='MIA' selected>Miami Dolphins</option>
<option id='DAL_select' value='DAL' selected>Dallas Cowboys</option>
<option id='IND_select' value='IND' selected>Indianapolis Colts</option>
<option id='KC_select' value='KC' selected>Kansas City Chiefs</option>
<option id='LAC_select' value='LAC' selected>Los Angeles Chargers</option>
<option id='ARI_select' value='ARI' selected>Arizona Cardinals</option>
<option id='BUF_select' value='BUF' selected>Buffalo Bills</option>
<option id='TB_select' value='TB' selected>Tampa Bay Buccaneers</option>
<option id='CLE_select' value='CLE' selected>Cleveland Browns</option>
<option id='DEN_select' value='DEN' selected>Denver Broncos</option>
<option id='CIN_select' value='CIN' selected>Cincinnati Bengals</option>
<option id='CHI_select' value='CHI' selected>Chicago Bears</option>
<option id='SF_select' value='SF' selected>San Francisco 49ers</option>
              </select>
              <label>Select an NFL team</label>
            </div>
              <button id='submit-team-button' type='submit' class="waves-effect waves-light btn blue-grey darken-4">select</button>
          </fieldset>
        </form>
      </div>
      <div class='col s3'>
      </div>
    </div>
  </div>
`;
}