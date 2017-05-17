const renderIndex = require('../renderers/indexRenderer');

module.exports = class IndexPage {
  constructor(root){
    this._root = root;
  }


  render() {
    $(this._root).html(renderIndex());
    $(this._root).find('#team-submit-form').submit(this._fetchTeamData);
  }




  _fetchTeamData(event){
    event.preventDefault();

    var team = $('#team-select').val();
    // window.location.href = '...';
    console.log(team);
  }

} //END Class