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


function build_recipes(recipe) {
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
  if (recipe) {
    send_request('search', '?cuisine=italian&number=10&query=' + recipe, function (data) {
      for (var i = 0; i < data.results.length; i++) {
        var content = templ.replace(/\{id\}/g, data.results[i].id).replace('{title}', data.results[i].title).replace('{image_link}', 'https://spoonacular.com/recipeImages/' + data.results[i].image);
        get_summary(content, data.results[i].id);
      }
    });
  }
  else {
    send_request('random', '?number=10&tags=italian', function (data) {
      for (var i = 0; i < data.recipes.length; i++) {
        var content = templ.replace(/\{id\}/g, data.recipes[i].id).replace('{title}', data.recipes[i].title).replace('{image_link}', data.recipes[i].image);
        get_summary(content, data.recipes[i].id);
      }
    });
  }
}
function get_summary(content, id) {
  send_request(id + '/summary', '', function(data) {
    content = content.replace('{description}', data.summary);
    var wrapper = document.querySelector('.js_recipes-wrapper');
    wrapper.innerHTML += content;
  });
}

function build_recipe_info(id) {
  var step_templ = `
  <div class="recipe-step">
    <h3>STEP {step}</h3>
    <p class="step-description">{step_description}</p>
  </div>`;
  var ingr_templ = `<li>{ingredient}</li>`;

  send_request(id + '/information', '', function(data) {
    document.querySelector('.js_recipe-name').innerHTML = data.title;
    document.querySelector('.js_recipe-image').src = data.image;
    var list = document.querySelector('.js_ingredients-list');
    for (var i = 0; i < data.extendedIngredients.length; i++) {
      var li = ingr_templ.replace('{ingredient}', data.extendedIngredients[i].originalString);
      list.innerHTML += li;
    }
  });
  send_request(id + '/analyzedInstructions', '', function(data) {
    var steps = document.querySelector('.js_steps');
    for (var i = 0; i < data[0].steps.length; i++) {
      var step = step_templ.replace('{step}', data[0].steps[i].number).replace('{step_description}', data[0].steps[i].step);
      steps.innerHTML += step;
    }
  });
}

function simulateClick(elem) {
  var evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
  });
  // If cancelled, don't dispatch our event
  var canceled = !elem.dispatchEvent(evt);
};