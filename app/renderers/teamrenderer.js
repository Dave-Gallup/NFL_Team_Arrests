module.exports = function renderTeam(team, id){

  return `
<div class="container">



    <h3 id='pageHeader' class='center-align'><img src="images/${id}.png" width='100px' height='100px'>&nbsp;&nbsp;${team}</h3>


  <div class='row'>
    <div class='col s2'>
    </div>
    <div class='col s8'>
        <div id="team-line-chart"></div>
    </div>
    <div class='col s2'>
    </div>
  </div>

  <div class='row'>
    <div class='col s2'>
    </div>

    <div class='col s3'>
        <h5>Players arrested:</h5>
        <div id="team-players-list" class=''></div>
    </div>
    <div class='col s5'>
        <div id="team-donut-chart"></div>
    </div>

    <div class='col s2'>
    </div>
  </div>



</div>
`;
}