module.exports = class PlayerFormatter{

  constructor(){}

  static formatPlayerArrests(data){

    var results = '<div>';
    for(let arrest in data){

      results += `<div class='row'>
        <div class='col s3'></div>
        <div class="col s6">
          <div class="card horizontal">
            <div class="card-image">
              <img src="images/${data[arrest].Team}.png" width='100px' height='100px' style='margin:10px;'>
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <h5 class=''> ${data[arrest].Crime_category}&nbsp;&nbsp;&nbsp;&nbsp;${data[arrest].Date}</h5>
                <div><span class='teamName'>Team: ${data[arrest].Team_preffered_name}</span>, <span class='position'>Position: ${data[arrest].Position}</span></div>
                <div class='row3'><blockquote style="border-left: 5px solid #263238;" class='description'>${data[arrest].Description}</blockquote></div>
                <div class='row4'><span class='outcome'>Outcome: ${data[arrest].Outcome}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class='col s3'></div>
      </div>
      `;


    }


    return results + '</div>';


  }















}