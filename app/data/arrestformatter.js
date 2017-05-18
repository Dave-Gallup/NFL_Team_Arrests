
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


  static formatForLineChart(data, chartId){

    var result = {bindto: chartId ,data: {x: 'x', columns: [],type: 'bar'}};
    var arrestColumns = ['arrests'];
    var xColumns = ['x'];
    var years = ArrestFormatter.countInstancesByKey(data, 'Year', true);

    result.data.columns[0] = xColumns.concat(Object.keys(years));
    result.data.columns[1] = arrestColumns.concat(Object.values(years));

    return result;
  }

  static countInstancesByKey(data, key, isSequential){
    var countObj = {};
    var minVal = Infinity;
    var maxVal = -Infinity;

    for(let arrest of data){
      let val = arrest[key];
      if(countObj[val] === undefined){
        countObj[val] = 1;
      }
      else{
        countObj[val]++;
      }
      if(val > maxVal){
        maxVal = val;
      }
      if(val < minVal){
        minVal = val;
      }
    }

    if(isSequential){
      for(let n = minVal; n <= maxVal; n++){
        if(countObj[n] === undefined){
          countObj[n] = 0;
        }
      }
    }
    return countObj;
  }


}