$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data("userId") || options.userId;
  this.followState = this.$el.data("followState") || options.followState;


  this.render();
  this.handleClick();
};


$.FollowToggle.prototype.render = function () {
  if (this.followState === "followed") {
    this.$el.text("Unfollow!");
  } else {
    this.$el.text("Follow!");
  }
};

$.FollowToggle.prototype.handleClick = function () {

  this.$el.on("click", function (event) {
    event.preventDefault();
    if (this.$el.prop("disabled")) {
      return;
    }

    if (this.followState === "followed") {
      this.followState = "unfollowing";
    } else {
      this.followState = "following";
    }
    this.$el.prop("disabled", true);
    this.render();

    var reqType;
    var url = "/users/" + this.userId + "/follow";
    if (this.followState === "unfollowing") {
      reqType = "delete";
    } else {
      reqType = "post";
    }

    $.ajax({
      type: reqType,
      url: url,
      dataType: "json",
      success: function (data) {

        if (this.followState === "unfollowing") {
          this.followState = "unfollowed";
        } else {
          this.followState = "followed";
        }
        this.$el.prop("disabled", false);
        this.render();

      }.bind(this)
    })
  }.bind(this));
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});