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
    //$(this._root).html(renderIndex(TeamFormatter.teamNames()));
    $(this._root).find('#team-submit-form').submit(this._fetchTeamData.bind(this));
    $('.nfl').click(this._fetchAllNflArrests.bind(this));
    $('#team-select').change(this._setIcon.bind(this));
  }

  _setIcon(event){

    var logoNum = $('#team-select').find(':selected').attr('id');
    $('.carousel').carousel('set', logoNum - 1);
  }

  _fetchTeamData(event){
    event.preventDefault();

    var teams = TeamFormatter.teamNames();
    var team = $('#team-select').val();

    $('#root').empty().html(renderTeamPage(`${teams[team].city} ${teams[team].name}`, team));

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
          $('#arrest-details').html(
            PlayerFormatter.formatPlayerArrests(arrests)
          );
        })

  }



} //END Class