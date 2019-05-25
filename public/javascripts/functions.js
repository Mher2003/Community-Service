const getPosts = (c,f) => {
  $.post("/getPosts", {"filter":f},
		function(data) {
      console.log(data);
      let container = document.getElementById(c);
      container.innerHTML = data[0];
		}, "json"
	);
}

const addPost = (user, pass, title, desc, branch, reward) => {
  $.post("/addPost", {"user":user, "pass":pass, "title":title,"desc":desc,"branch":branch,"reward":reward},
		function(data) {
      console.log(data[0]);
		}, "json"
	);
}
