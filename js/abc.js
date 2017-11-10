function send_request(command, query, cb) {
  var baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes';
  var myHeaders = new Headers();
  myHeaders.append("X-Mashape-Key", "zd1IXUWYTnmshVbob13BKiSwWEKdp1PfBb3jsnC4LZHFgUehE1");

  fetch(baseUrl + '/' + command + '/' + query, {headers: myHeaders})
      .then(function(response) {
          return response.json();
      })
      .then(cb)
      .catch( function() {
          
      });
}


function build_recipes() {
  var templ = `
  <div class="one-recipe clear">
    <div class="one-recipe-descr">
      <h2>
        <a href="vievrecipe.html?id={id}">{title}</a>
      </h2>
      <p>{description}</p>
      <a href="vievrecipe.html?id={id}" class="view">view all</a>
    </div>
    <div class="one-recipe-image">
      <a href="vievrecipe.html?id={id}">
        <img src="{image_link}">
      </a>
    </div>
  </div>`;
  send_request('random', '?number=10&tags=italian', function (data) {
    for (var i = 0; i < data.recipes.length; i++) {
      var content = templ.replace(/\{id\}/g, data.recipes[i].id).replace('{title}', data.recipes[i].title).replace('{image_link}', data.recipes[i].image);
      get_summary(content, data.recipes[i].id);
    }
  });
}
function get_summary(content, id) {
  send_request(id + '/summary', '', function(data) {
    content = content.replace('{description}', data.summary);
    var wrapper = document.querySelector('.js_recipes-wrapper');
    wrapper.innerHTML += content;
  });
}

function create_recipe() {
  var rep_div = document.createElement('div');
  //Create another elements with needed attributes.
}
