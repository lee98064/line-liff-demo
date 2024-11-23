const LIFF_ID = "2006595568-G8n5EVbN";

function getUserProfile() {
  liff
    .getProfile()
    .then((profile) => {
      $(".user-avatar > img").attr("src", profile.pictureUrl);
      $(".user-name").text(profile.displayName);
      $(".user-status").text(profile.statusMessage);
    })
    .catch((err) => {
      console.error(err);
    });
}

$(document).ready(function () {
  liff.init({ liffId: LIFF_ID }).then(() => {
    if (liff.isLoggedIn()) {
      getUserProfile();
      $(".login-card").hide();
      $(".user-card").show();
    }
  });

  $(".login-btn").click(function () {
    liff.login();
  });

  $(".logout-btn").click(function () {
    liff.logout();
    liff.closeWindow();
  });
});

$.ajax({
  type: "POST",
  url: "https://script.google.com/macros/s/AKfycbym_xf4Cpss0j0GnQ4jcf6N7LLK56r0AOjyA2GfqnFUapKdG2NS4ZKqeFy73Algc9M7/exec",
  dataType: "html",
  success: function (response) {
    alert(response);
  },
});
