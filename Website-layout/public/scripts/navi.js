var NaviBox = React.createClass({
  getInitialState: function() {
    return {num: 0};
  },

  incMyRequestNum: function() {
    this.setState({num: this.state.num+1});
    var badge = this.refs.numBadge;
    $(badge).removeClass("animated");
    setTimeout(function(){$(badge).addClass("animated")}, 10);
  },

  getMyTicketsNumber: function() {
    var openRequests = Parse.Object.extend("Request");
    var currentUser = Parse.User.current();
    var query = new Parse.Query(openRequests);
    var _this = this;

    query.matchesKeyInQuery("helper", "objectId", currentUser);
    query.find({
      success: function(data) {
        _this.setState({num: data.length});
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },

  componentDidMount: function() {
    var curPath = window.location.pathname;
    console.log("curPath", curPath);
    if (curPath.indexOf("solve") > -1) {
      $(this.refs.solve).addClass("navi-current");
    } else if (curPath.indexOf("solving") > -1 || curPath.indexOf("chatting") > -1) {
      $(this.refs.solving).addClass("navi-current");
    }
    this.getMyTicketsNumber();
  },

  render: function() {
    return (
      <div className="navis">
        <a href="solve.html">
          <div className="navi" ref="solve"><span className="fa fa-user-md"></span><span>Solve a problem</span></div>
        </a>
        <a href="solving.html">
          <div className="navi" ref="solving">
            <span className="fa fa-commenting"></span>
            <span>Solving</span>
            <div className="num-badge" ref="numBadge">
              {this.state.num}
            </div>
          </div>
        </a>
        <div className="navi" ref="solved"><span className="fa fa-clock-o"></span><span>Solved</span></div>
      </div>
    );
  }
});

var naviBox = ReactDOM.render(
  <NaviBox />,
  document.getElementsByClassName('left-navi')[0]
);

var updateMyRequestNumber = function() {
  naviBox.incMyRequestNum();
}

window.updateMyRequestNumber = updateMyRequestNumber;
