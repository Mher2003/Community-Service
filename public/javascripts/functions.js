const getPosts = (c,f) => {
  $.post("/getPosts", {"filter":f},
		data => {
      document.getElementById(c).innerHTML = data[0];
		}, "json"
	);
}

const checkUserAndPass = (u,p,c) => {
  $.post("/checkUserAndPass", {"user":u, "pass":p},
		data => {
      c(data);
		}, "json"
	);
}

const checkUserAndHashedPass = (u,hp,c) => {
  $.post("/checkUserAndHashedPass", {"user":u, "pass":hp},
    data =>{
      c(data);
		}, "json"
	);
}

const checkUsername = (u, id) => {
  if (u) {
    $.post("/checkUsername", {"user":u},
  		data => {
        if (data[0]) {
          document.getElementById(id).style.border = "1.5px solid green";
        } else {
          document.getElementById(id).style.border = "1.5px solid red";
        }
  		}, "json"
  	);
  }
}

const addPost = (user, pass, title, desc, branch, reward) => {
  $.post("/addPost", {"user":user, "pass":pass, "title":title,"desc":desc,"branch":branch,"reward":reward},
		data => {
      console.log(data[0]);
		}, "json"
	);
}

const setCookie = (cname, cvalue, exHours) => {
  var d = new Date();
  d.setTime(d.getTime() + (exHours*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
