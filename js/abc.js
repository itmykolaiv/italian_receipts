var baseUrl = 'http://ec2-52-14-195-100.us-east-2.compute.amazonaws.com/italian_recipes';
function send_request(command, query){
  fetch(baseUrl + '/' +command+'/?key=6f71266a81069a9eb5103033f9efabc2' + query)
    .then(function(response) {
      return response.json();
    })
    .then(function(user) {
      console.log(data);
    })
    .catch(function () {

    });
}
function build_recipes() {
  var rep_container = document.querySelector('.js_recipes-container');
}

function create_recipe() {
  var rep_div = document.createElement('div');
  //Create another elements with needed attributes.
}
