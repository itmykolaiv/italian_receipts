function send_request(command, query, cb) {
  var baseUrl = 'http://ec2-52-14-195-100.us-east-2.compute.amazonaws.com/italian_recipes';
  var myHeaders = new Headers();
  myHeaders.append("X-Mashape-Key", "zd1IXUWYTnmshVbob13BKiSwWEKdp1PfBb3jsnC4LZHFgUehE1");

  fetch(baseUrl + '/' + command + '/?' + query, {headers: myHeaders})
      .then(function(response) {
          return response.json();
      })
      .then(cb)
      .catch( function() {
          
      });
}


function build_recipes() {
  var rep_container = document.querySelector('.js_recipes-container');
}

function create_recipe() {
  var rep_div = document.createElement('div');
  //Create another elements with needed attributes.
}
