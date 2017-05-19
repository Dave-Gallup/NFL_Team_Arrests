(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("data/allformatter.js", function(exports, require, module) {

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
});

;require.register("data/arrestformatter.js", function(exports, require, module) {

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
});

;require.register("data/playerformatter.js", function(exports, require, module) {
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
});

;require.register("data/teamformatter.js", function(exports, require, module) {

module.exports = class TeamFormatter{

  constructor(){}

  static teamNames(){

    return {'MIN':{city:'Minnesota', name: 'Vikings'},
      'TEN':{city:'Nashville', name: 'Titans'},
      'HOU':{city:'Houston', name: 'Texans'},
      'PIT':{city:'Pittsburgh', name: 'Steelers'},
      'SEA':{city:'Seattle', name: 'Seahawks'},
      'NO':{city:'New Orleans', name: 'Saints'},
      'WAS':{city:'Washington', name: 'Redskins'},
      'BAL':{city:'Baltimore', name: 'Ravens'},
      'LA':{city:'Los Angeles', name: 'Rams'},
      'OAK':{city:'Oakland', name: 'Raiders'},
      'NE':{city:'New England', name: 'Patriots'},
      'CAR':{city:'Carolina', name: 'Panthers'},
      'GB':{city:'Green Bay', name: 'Packers'},
      'NYG':{city:'New York', name: 'Giants'},
      'DET':{city:'Detroit', name: 'Lions'},
      'NYJ':{city:'New York', name: 'Jets'},
      'JAC':{city:'Jacksonville', name: 'Jaguars'},
      'ATL':{city:'Atlanta', name: 'Falcons'},
      'PHI':{city:'Philadelphia', name: 'Eagles'},
      'MIA':{city:'Miami', name: 'Dolphins'},
      'DAL':{city:'Dallas', name: 'Cowboys'},
      'IND':{city:'Indianapolis', name: 'Colts'},
      'KC':{city:'Kansas City', name: 'Chiefs'},
      'LAC':{city:'Los Angeles', name: 'Chargers'},
      'ARI':{city:'Arizona', name: 'Cardinals'},
      'BUF':{city:'Buffalo', name: 'Bills'},
      'TB':{city:'Tampa Bay', name: 'Buccaneers'},
      'CLE':{city:'Cleveland', name: 'Browns'},
      'DEN':{city:'Denver', name: 'Broncos'},
      'CIN':{city:'Cincinnati', name: 'Bengals'},
      'CHI':{city:'Chicago', name: 'Bears'},
      'SF':{city:'San Francisco', name: '49ers'}};
  }
}
});

;require.register("initialize.js", function(exports, require, module) {
const IndexPage = require('./pages/IndexPage');

$(document).ready(() => {
  const indexPage = new IndexPage(document.getElementById('root'));
  $('select').material_select();
  $('.carousel').carousel();
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  indexPage.render();
});


});

require.register("pages/IndexPage.js", function(exports, require, module) {
const renderIndex = require('../renderers/indexrenderer');
const renderTeamPage = require('../renderers/teamrenderer');
const renderPlayerPage = require('../renderers/playerrenderer');
const renderAllPage = require('../renderers/allrenderer');
const ArrestFormatter = require('../data/arrestformatter');
const TeamFormatter = require('../data/teamformatter');
const PlayerFormatter = require('../data/playerformatter');
const AllFormatter = require('../data/allformatter');

module.exports = class IndexPage {
  constructor(root){
    this._root = root;
    this._nflArrest = 'http://nflarrest.com/api/v1/';
  }


  render() {
    $('select').material_select();
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    $(this._root).html(renderIndex(TeamFormatter.teamNames()));
    $(this._root).find('#team-submit-form').submit(this._fetchTeamData.bind(this));
    $(this._root).find('.nfl').click(this._fetchAllNflArrests.bind(this));
  }

  _fetchTeamData(event){
    event.preventDefault();

    var teams = TeamFormatter.teamNames();
    var team = $('#team-select').val();

    $('#root').empty().html(renderTeamPage(`${teams[team].city} ${teams[team].name}`));

    var subdirs=['team', 'arrests', team];
    var queries={};
    this._fetchData(subdirs, queries);
  }

  _fetchAllNflArrests(event){
    event.preventDefault();
    $('#root').empty().html(renderAllPage());

    var idArray = Object.keys(TeamFormatter.teamNames());

    var responses = idArray.map(id=>fetch(`${this._nflArrest}team/arrests/${id}`));

    var p = Promise.all(responses)
      .then(returned => returned.map(el=>el.json()))
      .then(formatted=>Promise.all(formatted))
      .then(arrests => {
        c3.generate(
          AllFormatter.formatForLineChart(arrests, '#all-teams-line-chart'))
      });
  }

   _fetchData(subdirectoryArr, queryStringObj){

    var subdirectoryString = '';
    var queryString = '?';
    for(let subdirectory of subdirectoryArr){
      subdirectoryString += `${subdirectory}/`;
    }
    subdirectoryString = subdirectoryString.substring(0,subdirectoryString.length -1);

    for(let key in queryStringObj){
      queryString += `${key}=${queryStringObj[key]}&`;
    }

    fetch(`${this._nflArrest}${subdirectoryString}${queryString}`)
      .then(response => response.json())
      .then(arrests => {
        c3.generate(
          ArrestFormatter.formatForLineChart(
            arrests, '#team-line-chart')
        );
        c3.generate(
          ArrestFormatter.formatForDonutChart(
            arrests, '#team-donut-chart')
        );
        $('#team-players-list').html(
          ArrestFormatter.formatForPlayerList(arrests)
        );
        $('a.clickable').click(this._registerPlayerListener);
      });

  }

  _registerPlayerListener(event){
      event.preventDefault();

      var uriFormattedName = $(this).html().trim().replace(/\s/g, '%20');

      $('#root').empty().html(renderPlayerPage(uriFormattedName));
      $('#root').find('.nfl').click(this._fetchAllNflArrests);
      fetch(`http://nflarrest.com/api/v1/player/arrests/${uriFormattedName}`)
        .then(response => response.json())
        .then(arrests => {
          $('#player-arrests-list').html(
            PlayerFormatter.formatPlayerArrests(arrests)
          );
        })

  }



} //END Class
});

;require.register("renderers/allrenderer.js", function(exports, require, module) {
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
});

;require.register("renderers/indexrenderer.js", function(exports, require, module) {
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
                ${teamNamesOptions}
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
});

;require.register("renderers/playerrenderer.js", function(exports, require, module) {
module.exports = function renderPlayer(name){

  var cleanName = name.replace(/%20/g, ' ');

  return `<nav class="uk-navbar">
  <ul class="uk-navbar-nav">
      <li class="uk-active"><a href="">Home</a></li>
      <li class='nfl'><a href="">All NFL</a></li>
  </ul>
  </nav>
  <h1 id='pageHeader' class="uk-text-center">${cleanName} Arrests</h1>

  <div class="uk-container uk-container-center">
    <div id='player-arrests-list' class='uk-text-center'></div>
  </div>`;

}
});

;require.register("renderers/teamrenderer.js", function(exports, require, module) {
module.exports = function renderTeam(team){

  return `<nav class="uk-navbar">
  <ul class="uk-navbar-nav">
      <li class="uk-active"><a href="">Home</a></li>
      <li><a href="">All NFL</a></li>
  </ul>
</nav>
<h1 id='pageHeader' class='uk-text-center'>${team}</h1>

<div class="uk-container uk-container-center">
  <div class='uk-text-center'>
    <div id="team-line-chart"></div>
    <div id="team-donut-chart"></div>
    <div id="team-players-list" class=''></div>

  </div>

</div>`;
}
});

;require.register("samples/SEA_arrests.js", function(exports, require, module) {
module.exports.sample = `[
  {
    "arrest_stats_id": "853",
    "Date": "2017-04-06",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Trevone Boykin",
    "Position": "QB",
    "Encounter": "Arrested",
    "Category": "Probation violation",
    "Crime_category": "Other",
    "Description": "Suspected of violating probation with March 27 arrest. Probation stemmed from 2015 bar fight while at TCU.",
    "Outcome": "Resolution undetermined.",
    "general_category_id": "27",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2017",
    "Month": "4",
    "Day": "6",
    "Day_of_Week": "Thursday",
    "Day_of_Week_int": "5",
    "DaysSince": "39"
  },
  {
    "arrest_stats_id": "851",
    "Date": "2017-03-27",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Trevone Boykin",
    "Position": "QB",
    "Encounter": "Arrested",
    "Category": "Drugs",
    "Crime_category": "Drugs",
    "Description": "Accused of marijuana possession, public intoxication. He was a passenger in a car involved in accident in Dallas.",
    "Outcome": "Resolution undetermined.",
    "general_category_id": "3",
    "legal_level_id": "0",
    "resolution_category_id": "0",
    "Year": "2017",
    "Month": "3",
    "Day": "27",
    "Day_of_Week": "Monday",
    "Day_of_Week_int": "2",
    "DaysSince": "49"
  },
  {
    "arrest_stats_id": "836",
    "Date": "2016-12-17",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Damontre Moore",
    "Position": "DE",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Suspected of driving while intoxicated in King County, Washington.",
    "Outcome": "Resolution undetermined.",
    "general_category_id": "1",
    "legal_level_id": "0",
    "resolution_category_id": "0",
    "Year": "2016",
    "Month": "12",
    "Day": "17",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "149"
  },
  {
    "arrest_stats_id": "805",
    "Date": "2015-10-15",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Derrick Coleman",
    "Position": "FB",
    "Encounter": "Arrested",
    "Category": "Hit and Run",
    "Crime_category": "Other",
    "Description": "Derrick Coleman was involved in a two car accident in Bellevue, WA where he allegedly fled the scene.",
    "Outcome": "Undetermined",
    "general_category_id": "27",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2015",
    "Month": "10",
    "Day": "15",
    "Day_of_Week": "Thursday",
    "Day_of_Week_int": "5",
    "DaysSince": "578"
  },
  {
    "arrest_stats_id": "78",
    "Date": "2014-01-12",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Spencer Ware",
    "Position": "RB",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Pulled over by Washington State Patrol, suspected of drunken driving in Seattle.",
    "Outcome": "Charge dropped after judge ruled the arresting officer lacked reasonable suspicion in traffic stop.",
    "general_category_id": "1",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2014",
    "Month": "1",
    "Day": "12",
    "Day_of_Week": "Sunday",
    "Day_of_Week_int": "1",
    "DaysSince": "1219"
  },
  {
    "arrest_stats_id": "113",
    "Date": "2013-05-05",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Josh Portis",
    "Position": "QB",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Pulled over for speeding by Washington State trooper, accused of drunken driving.",
    "Outcome": "Resolution undetermined. Cut by team later that month.",
    "general_category_id": "1",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2013",
    "Month": "5",
    "Day": "5",
    "Day_of_Week": "Sunday",
    "Day_of_Week_int": "1",
    "DaysSince": "1471"
  },
  {
    "arrest_stats_id": "137",
    "Date": "2013-01-29",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Leroy Hill",
    "Position": "LB",
    "Encounter": "Arrested",
    "Category": "Domestic violence",
    "Crime_category": "Domestic Violence",
    "Description": "Accused of third-degree assault and unlawful imprisonment in dispute with girlfriend.",
    "Outcome": "Charges dropped for lack of evidence. Not re-signed by Seattle.",
    "general_category_id": "2",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2013",
    "Month": "1",
    "Day": "29",
    "Day_of_Week": "Tuesday",
    "Day_of_Week_int": "3",
    "DaysSince": "1567"
  },
  {
    "arrest_stats_id": "152",
    "Date": "2012-08-25",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "John Moffitt",
    "Position": "OG",
    "Encounter": "Arrested",
    "Category": "Disorderly conduct",
    "Crime_category": "Disorderly conduct",
    "Description": "Banned from mall in Bellevue, Wash., in January 2012, he later was accused of trespassing there, obstrucing police and public urination.",
    "Outcome": "Pleaded no contest to disorderly conduct, $1,407 fine, two-year suspended jail sentence.",
    "general_category_id": "5",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2012",
    "Month": "8",
    "Day": "25",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "1724"
  },
  {
    "arrest_stats_id": "159",
    "Date": "2012-07-14",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Marshawn Lynch",
    "Position": "RB",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Pulled over in Oakland, Calif., and taken to Santa Rita Jail on DUI charge.",
    "Outcome": "Resolution undetermined.",
    "general_category_id": "1",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2012",
    "Month": "7",
    "Day": "14",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "1766"
  },
  {
    "arrest_stats_id": "179",
    "Date": "2012-02-26",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Jarriel King",
    "Position": "OT",
    "Encounter": "Arrested",
    "Category": "Sex",
    "Crime_category": "Sex",
    "Description": "Charged with having forcible sex with woman in South Carolina who said she was intoxicated.",
    "Outcome": "Resolution undetermined. Released by team after it learned of the arrest.",
    "general_category_id": "14",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2012",
    "Month": "2",
    "Day": "26",
    "Day_of_Week": "Sunday",
    "Day_of_Week_int": "1",
    "DaysSince": "1905"
  },
  {
    "arrest_stats_id": "180",
    "Date": "2012-02-25",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Leroy Hill",
    "Position": "LB",
    "Encounter": "Arrested",
    "Category": "Drugs",
    "Crime_category": "Drugs",
    "Description": "Accused of marijuana possession in Atlanta and report of strong odor coming from apartment.",
    "Outcome": "Charge dropped.",
    "general_category_id": "3",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2012",
    "Month": "2",
    "Day": "25",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "1906"
  },
  {
    "arrest_stats_id": "213",
    "Date": "2011-06-16",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Raheem Brock",
    "Position": "DE",
    "Encounter": "Arrested",
    "Category": "Theft",
    "Crime_category": "Theft / Burglary",
    "Description": "Accused of walking out on $27 restaurant tab in Philadelphia. He said they canceled order before food arrived.",
    "Outcome": "Acquitted.",
    "general_category_id": "9",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2011",
    "Month": "6",
    "Day": "16",
    "Day_of_Week": "Thursday",
    "Day_of_Week_int": "5",
    "DaysSince": "2160"
  },
  {
    "arrest_stats_id": "245",
    "Date": "2010-11-13",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Raheem Brock",
    "Position": "DE",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Pulled over by University of Washington police on suspicion of drunken driving. Measured .13 on a Breathalyzer test.",
    "Outcome": "Resolution undetermined.",
    "general_category_id": "1",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2010",
    "Month": "11",
    "Day": "13",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "2375"
  },
  {
    "arrest_stats_id": "259",
    "Date": "2010-07-03",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Quinton Ganther",
    "Position": "RB",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Pulled over on suspicion for two misdemeanor counts of driving under the influence in Sacramento. State limit for BAC is .08.",
    "Outcome": "Resolution undetermined.",
    "general_category_id": "1",
    "legal_level_id": "2",
    "resolution_category_id": "1",
    "Year": "2010",
    "Month": "7",
    "Day": "3",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "2508"
  },
  {
    "arrest_stats_id": "275",
    "Date": "2010-04-10",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Leroy Hill",
    "Position": "LB",
    "Encounter": "Arrested",
    "Category": "Domestic violence",
    "Crime_category": "Domestic Violence",
    "Description": "Charged with investigation of assault in the fourth degree/domestic violence from dispute with girlfriend in Issaquah, Wash.",
    "Outcome": "Diversion program, 18-month probation, treatment program.",
    "general_category_id": "2",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2010",
    "Month": "4",
    "Day": "10",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "2592"
  },
  {
    "arrest_stats_id": "312",
    "Date": "2009-06-20",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Owen Schmitt",
    "Position": "FB",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Suspected of drunken driving after being seen by an officer weaving and following cars too closely in Black Diamond, Wa. Blood-alcohol measured at 0.151.",
    "Outcome": "Pleaded guilty to reckless driving, one-year suspended jail sentence, 24 hours community service, $2,130 fines and fees.",
    "general_category_id": "1",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2009",
    "Month": "6",
    "Day": "20",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "2886"
  },
  {
    "arrest_stats_id": "339",
    "Date": "2009-01-24",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Leroy Hill",
    "Position": "LB",
    "Encounter": "Arrested",
    "Category": "Drugs",
    "Crime_category": "Drugs",
    "Description": "Accused of possessing less than an ounce of marijuana after being found asleep behind the wheel of his car at an intersection in Georgia.",
    "Outcome": "Pleaded guilty to marijuana possession, 12 months of probation, $500 fine.",
    "general_category_id": "3",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2009",
    "Month": "1",
    "Day": "24",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "3033"
  },
  {
    "arrest_stats_id": "376",
    "Date": "2008-05-10",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Lofa Tatupu",
    "Position": "LB",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Pulled over in Kirkland, Wash., for speeding. Police measured blood-alcohol content at .155 or more.",
    "Outcome": "Pleaded guilty, one day in jail, $1,255 fines and court costs.",
    "general_category_id": "1",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2008",
    "Month": "5",
    "Day": "10",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "3292"
  },
  {
    "arrest_stats_id": "384",
    "Date": "2008-04-21",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Rocky Bernard",
    "Position": "DT",
    "Encounter": "Arrested",
    "Category": "Domestic violence",
    "Crime_category": "Domestic Violence",
    "Description": "Accused of hitting his girlfriend in the head at Seattle nightclub.",
    "Outcome": "Diversion program, agreed to have no contact with woman for two years, domestic violence treatment.",
    "general_category_id": "2",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2008",
    "Month": "4",
    "Day": "21",
    "Day_of_Week": "Monday",
    "Day_of_Week_int": "2",
    "DaysSince": "3311"
  },
  {
    "arrest_stats_id": "462",
    "Date": "2007-03-13",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Jerramy Stevens",
    "Position": "TE",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Pulled over in Scottsdale, Ariz., accused of extreme drunken driving, marijuana possession. Blood-alcohol measured at .204.",
    "Outcome": "Guilty on three counts, 12 days in jail, $3,160 in fines.",
    "general_category_id": "1",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2007",
    "Month": "3",
    "Day": "13",
    "Day_of_Week": "Tuesday",
    "Day_of_Week_int": "3",
    "DaysSince": "3716"
  },
  {
    "arrest_stats_id": "523",
    "Date": "2006-05-13",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Wayne Hunter",
    "Position": "OT",
    "Encounter": "Arrested",
    "Category": "Assasult",
    "Crime_category": "Assault / Battery",
    "Description": "Police said Hunter and his brother got into a scuffle at a sports bar, knocked over a table and slammed a man down.",
    "Outcome": "Resolution undetermined. Released by team later that week.",
    "general_category_id": "4",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2006",
    "Month": "5",
    "Day": "13",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "4020"
  },
  {
    "arrest_stats_id": "532",
    "Date": "2006-04-11",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Bryce Fisher",
    "Position": "DE",
    "Encounter": "Arrested",
    "Category": "Domestic violence",
    "Crime_category": "Domestic Violence",
    "Description": "Accused of twisting his wife's arm behind her back in a dispute.",
    "Outcome": "Charge dropped.",
    "general_category_id": "2",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2006",
    "Month": "4",
    "Day": "11",
    "Day_of_Week": "Tuesday",
    "Day_of_Week_int": "3",
    "DaysSince": "4052"
  },
  {
    "arrest_stats_id": "544",
    "Date": "2006-01-15",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Sean Locklear",
    "Position": "OT",
    "Encounter": "Arrested",
    "Category": "Domestic violence",
    "Crime_category": "Domestic Violence",
    "Description": "Accused of grabbing his girlfriend in dispute after getting upset with her for dancing with another man at a club.",
    "Outcome": "Diversion program, community service.",
    "general_category_id": "2",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2006",
    "Month": "1",
    "Day": "15",
    "Day_of_Week": "Sunday",
    "Day_of_Week_int": "1",
    "DaysSince": "4138"
  },
  {
    "arrest_stats_id": "581",
    "Date": "2005-05-06",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Koren Robinson",
    "Position": "WR",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Pulled over in Seattle suburb, accused of drunk driving. Blood-alcohol of .191",
    "Outcome": "Pleaded guilty, two years probation, one day in jail, fined $2, 137.",
    "general_category_id": "1",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2005",
    "Month": "5",
    "Day": "6",
    "Day_of_Week": "Friday",
    "Day_of_Week_int": "6",
    "DaysSince": "4392"
  },
  {
    "arrest_stats_id": "654",
    "Date": "2003-07-15",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Wayne Hunter",
    "Position": "OT",
    "Encounter": "Arrested",
    "Category": "Domestic violence",
    "Crime_category": "Domestic Violence",
    "Description": "Accused of assaulting his pregnant girlfriend, who had been carrying for eight months.",
    "Outcome": "Diversion program. Domestic-violence counseling.",
    "general_category_id": "2",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2003",
    "Month": "7",
    "Day": "15",
    "Day_of_Week": "Tuesday",
    "Day_of_Week_int": "3",
    "DaysSince": "5053"
  },
  {
    "arrest_stats_id": "667",
    "Date": "2003-04-03",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Jerramy Stevens",
    "Position": "TE",
    "Encounter": "Arrested",
    "Category": "DUI",
    "Crime_category": "DUI",
    "Description": "Pulled over in Medina, Wash., for rolling through a stop sign, accused of drunk driving. Blood-alcohol measured at .14.",
    "Outcome": "Pleaded guilty to reckless driving, two days in jail, 25 hours of community service, $1,000 fine.",
    "general_category_id": "1",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2003",
    "Month": "4",
    "Day": "3",
    "Day_of_Week": "Thursday",
    "Day_of_Week_int": "5",
    "DaysSince": "5156"
  },
  {
    "arrest_stats_id": "672",
    "Date": "2003-02-01",
    "Team": "SEA",
    "Team_name": "Seahawks",
    "Team_preffered_name": "Seattle Seahawks",
    "Team_city": "Seattle",
    "Team_logo_id": "28",
    "Team_Conference": "NFC",
    "Team_Division": "West",
    "Team_Conference_Division": "NFC West",
    "Name": "Koren Robinson",
    "Position": "WR",
    "Encounter": "Arrested",
    "Category": "Disorderly conduct",
    "Crime_category": "Disorderly conduct",
    "Description": "Accused of being unruly and failing to disperse after being told to leave the street outside a crowded nightclub in Durham, N.C.",
    "Outcome": "Resolution undetermined.",
    "general_category_id": "5",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2003",
    "Month": "2",
    "Day": "1",
    "Day_of_Week": "Saturday",
    "Day_of_Week_int": "7",
    "DaysSince": "5217"
  }
]`
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map