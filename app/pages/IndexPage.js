const renderIndex = require('../renderers/indexrenderer');
const renderTeamPage = require('../renderers/teamrenderer');
const renderPlayerPage = require('../renderers/playerrenderer');
const ArrestFormatter = require('../data/arrestformatter');
const TeamFormatter = require('../data/teamformatter');
const PlayerFormatter = require('../data/playerformatter');

module.exports = class IndexPage {
  constructor(root){
    this._root = root;
    this._nflArrest = 'http://nflarrest.com/api/v1/';
  }


  render() {
    $(this._root).html(renderIndex(TeamFormatter.teamNames()));
    $(this._root).find('#team-submit-form').submit(this._fetchTeamData.bind(this));
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
    // console.log(`${this._nflArrest}${subdirectoryString}${queryString}`);
    fetch(`${this._nflArrest}${subdirectoryString}${queryString}`)
      .then(response => response.json())
      // .then(arrests => toDisplay(arrests[0].Category));
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
      fetch(`http://nflarrest.com/api/v1/player/arrests/${uriFormattedName}`)
        .then(response => response.json())
        .then(arrests => {
          //console.log(arrests);

          $('#player-arrests-list').html(
            PlayerFormatter.formatPlayerArrests(arrests)
          );
        })



  }



} //END Class