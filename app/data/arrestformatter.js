
module.exports = class ArrestFormatter{

  constructor(){}

  static formatForPlayerList(data){
    var players = ArrestFormatter.countInstancesByKey(data, 'Name', false);
    var html = '<ul>';

    for(let player in players){
      html += `<li><a href='' class='clickable'>${player}</a> : ${players[player]} arrest${players[player] === 1?'':'s'}</li>`;

    }
    return html + '</ul>';
  }

  static formatForDonutChart(data, chartId){
    var chart = {bindto: chartId,data: {columns: undefined,type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            title: undefined
        }
    };
    var crimeColumns = [];
    var crimes = ArrestFormatter.countInstancesByKey(data, 'Crime_category', false);
    var arrestsSum = 0;

    for(let category in crimes){
      crimeColumns.push([category, crimes[category]]);
      arrestsSum += crimes[category];
    }

    chart.data.columns = crimeColumns;
    chart.donut.title = `${arrestsSum} Total Arrests`;

    return chart;
  }


  static formatForTeamChart(data, chartId, chartType){

    var dataMaster = [];
    if(ArrestFormatter.isMultipleTeams(data)){
      dataMaster = data;
    }
    else{
      dataMaster.push(data);
    }

    var result = {bindto: chartId ,data: {x: 'x', columns: [],type: chartType}};

    var yearsSet = ArrestFormatter.makeClearObject(dataMaster, 'Year', true);

    result.data.columns[0] = ['x'].concat(Object.keys(yearsSet));

    for(let i = 0; i < dataMaster.length; i++){

      var singleTeamStats =
        ArrestFormatter.countInstancesByKey(dataMaster[i], yearsSet, 'Year');
      result.data.columns[i+1] =
        [dataMaster[i].Team_preffered_name].concat(Object.values(singleTeamStats));
    }

    return result;
  }

  static makeClearObject(data, key, isSequential){
    var newObject = {};
    var minVal = Infinity;
    var maxVal = -Infinity;
    var dataMaster = [];

    if(ArrestFormatter.isMultipleTeams(data)){
      dataMaster = data;
    }
    else{
      dataMaster.push(data);
    }

    for(let i = 0; i < dataMaster.length; i++){
      for(let arrest of dataMaster[i]){
        newObject[arrest[key]] = 0;

        if(arrest[key] > maxVal){
          maxVal = arrest[key];
        }
        if(arrest[key] < minVal){
          minVal = arrest[key];
        }
      }
    }

    if(isSequential){
      for(let n = minVal; n <= maxVal; n++){
        if(newObject[n] === undefined){
          newObject[n] = 0;
        }
      }
    }
    return newObject;
  }

  static countInstancesByKey(data, clearSet, key){

    for(let arrest in data){
      clearSet[arrest[key]]++;
    }

    return clearSet;
  }

  static isMultipleTeams(data){


    return data[0] !== undefined && Array.isArray(data[0]);


  }


}