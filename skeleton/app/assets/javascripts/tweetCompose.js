$.TweetCompose = function (el) {
  this.$el = $(el);

  this.$el.on("submit", function (event) {
    event.preventDefault();
    this.submit(event.currentTarget);
  }.bind(this))
};

$.TweetCompose.prototype.submit = function (target) {
  var formData = $(target).serializeJSON();

  var $inputs = this.$el.find(":input");
  $inputs.prop("disabled", true);

  $.ajax({
    url: "/tweets",
    type: "post",
    data: formData,
    dataType: "json",
    success: function(data) {
      console.log("data", data);

      this.clearInput();
      $inputs.prop("disabled", false);
    }.bind(this)
  })

};

$.TweetCompose.prototype.clearInput = function () {
  // var $inputs = this.$el.find(":input").not("button");
  // console.log($inputs);
  // $inputs.val("");
  this.$el.each( function () {
    this.reset();
  });
  // reset is function on native DOM element
  // look for form reset method
};


$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function() {
  $("form.tweet-compose").tweetCompose();
});