$(document).ready(function() {
  if (getCookie("user") != 0) {
    const u = getCookie("user");
    const p = getCookie("pass");
    checkUserAndHashedPass(u,pl => {
      console.log(l);
      if (l[0]["s"] == true) {
        // Show a button for sign out
      } else {
        setCookie("user", "", 0);
        setCookie("pass", "", 0);
      }
    });
  }

  getPosts('container', '');
});
