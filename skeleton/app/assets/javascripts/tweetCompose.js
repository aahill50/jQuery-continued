$.TweetCompose = function (el) {
  this.$el = $(el);

  this.$el.on("submit", function (event) {
    event.preventDefault();
    this.submit(event.currentTarget);
  }.bind(this))

  this.$el.on("input", "textarea", function (event) {
    var charCount = 140 - $(this).val().length;
    var $chars = $('.chars-left')
    $chars.text(charCount + " characters left");
  })
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
    success: this.handleSuccess($inputs)
  })
};

$.TweetCompose.prototype.clearInput = function () {
  this.$el.each( function () {
    this.reset();
  });
};

$.TweetCompose.prototype.handleSuccess = function (input) {
  this.clearInput();
  input.prop("disabled", false);
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function() {
  $("form.tweet-compose").tweetCompose();
});