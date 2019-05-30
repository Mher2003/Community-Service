$(document).ready(function() {
  if (getCookie("user") != 0) {
    const u = getCookie("user");
    const p = getCookie("pass");
    checkUserAndHashedPass(u,p,function(l){
      console.log(l);
      if (l[0]["s"] == true) {
        alert("Already Logged In!");
        window.location.href = "/";
      } else {
        setCookie("user", "", 0);
        setCookie("pass", "", 0);
      }
    });
  }

  // Check if the username is valid 1ms after a button press
  $("#user").keydown(function(){
    setTimeout(function(){checkUsername($('#user').val(),"user")},1);
  });

  // Check if the password is correct
  $("#submit").click(function() {
    const u = $('#user').val();
    const p = $('#pass').val();
    checkUserAndPass(u,p,function(l){
      if (l[0]["s"] == true) {
        setCookie("user", u, 1);
        setCookie("pass", l[1], 1);
        window.location.href = "/";
      } else {
        alert(l[0]["m"]);
      }
    });
  });
});
