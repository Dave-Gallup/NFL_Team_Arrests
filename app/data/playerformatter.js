module.exports = class PlayerFormatter{

  constructor(){}

  static formatPlayerArrests(data){

    var results = '<div>';
    for(let arrest in data){

      results += `<div class='arrest'>
      <div class'row1'><span class='arrestDate'>${data[arrest].Date}</span>
      <span class='arrestCategory'>Arrested for: ${data[arrest].Crime_category}</span></div>
      <div class='row2'><span class='teamName'>Team: ${data[arrest].Team_preffered_name}</span>, <span class='position'>Position: ${data[arrest].Position}</span></div>
      <div class='row3'><span class='description'>${data[arrest].Description}</span></div>
      <div class='row4'><span class='outcome'>Outcome: ${data[arrest].Outcome}</span></div>
      `;
    }


    return results + '</div>';


  }















}