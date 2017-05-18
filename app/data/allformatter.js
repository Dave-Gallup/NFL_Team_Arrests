
module.exports = class AllFormatter{

  constructor(){}

  static formatForLineChart(data, chartId){

    var result = {bindto: chartId ,data: {x: 'x', columns: []}};
    // var xColumns = ['x'];
    var years = AllFormatter.makeClearObject(data, 'Year', true);

    result.data.columns[0] = ['x'].concat(Object.keys(years).sort((a,b) => a>b?1:-1));

    for(let i = 0; i < data.length; i++){

      let teamYears = AllFormatter.makeClearObject(data, 'Year', true);
      result.data.columns[i+1] =
        AllFormatter.getStats(teamYears, data[i], 'Year');
    }

    return result;
  }

  static getStats(counterObject, teamdata, key){

    var result = [teamdata[0].Team_preffered_name];
    var minVal = Infinity;
    var maxVal = -Infinity;

    for(let arrest of teamdata){
      counterObject[arrest[key]]++;

      if(arrest[key] > maxVal){
        maxVal = arrest[key];
      }
      if(arrest[key] < minVal){
        minVal = arrest[key];
      }
    }

    for(let n = minVal; n <= maxVal; n++){
      result.push(counterObject[n]);
    }
    return result;

  }















  static makeClearObject(data, key, isSequential){
    var newObject = {};
    var minVal = Infinity;
    var maxVal = -Infinity;

    for(let i = 0; i < data.length; i++){
      for(let arrest of data[i]){
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









}