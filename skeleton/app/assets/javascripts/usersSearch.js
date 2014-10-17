$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$ul = this.$el.find("ul");
  console.log(this.$ul);
  this.$input = this.$el.find("input");



  this.$el.on('input', function (event) {
    // console.log(this.$input.val());
    this.handleInput(this.$input.val());
  }.bind(this));
}
$.UsersSearch.prototype.handleInput = function (queryString) {

  $.ajax({
    type: 'get',
    url: '/users/search',
    data: {query: queryString},
    dataType: "json",
    success: function (data) {
      this.renderResults(data);
    }.bind(this)

  })
};

$.UsersSearch.prototype.renderResults = function (results) {
  var $results = $(results);
  var $thisUl = this.$ul
  $thisUl.empty();

  $results.each(function () {
    var followStatus = this.followed ? "followed" : "unfollowed"
    var path = "/users/" + this.id
    var button = "<button class='follow-toggle' data-user-id='" + this.id +
                  "' data-follow-state='" + followStatus + "'></button>";
    var $li = $("<li><a href='" + path + "'>" + this.username
             + "</a>" + button + "</li>")
    $li.appendTo($thisUl);
    $li.children('button').followToggle({userId: this.id, followState: followStatus});
    // $li.
  })
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});



