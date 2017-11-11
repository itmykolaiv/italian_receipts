document.addEventListener("DOMContentLoaded", function() {
    var slider = document.querySelector('.js_slider');
    if (slider) {
        send_request('recipes/random', '?limitLicense=false&number=6&tags=italian', function(data) {
            for(var i = 0; i < data.recipes.length; i++) {
                var img = document.createElement('img');
                var div = document.createElement('div');
                img.src = data.recipes[i].image;
                div.append(img);
                slider.append(div);
            }
            var slider = tns({
                "container": ".js_slider",
                "items": 3,
                "speed": 300,
                "autoplay": true,
                "autoplayHoverPause": true,
                "autoplayTimeout": 2500,
                "autoplayText": [
                    "▶",
                    "❚❚"
                ]
            });
        });
    }
    var wrapper = document.querySelector('.js_recipes-wrapper');
    if (wrapper) {
        wrapper.innerHTML = '';
        build_recipes();
    }

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    if (id) {
        build_recipe_info(id);
    }

    var search = document.querySelector('#searchbtn');
    search.addEventListener('click', function() {
        var food = document.querySelector('#search').value;
        if (food) {
            var a = document.querySelector('.js_find_recipies');
            a.href += '?recipe=' + food;
            (a.onclick || a.click || function() {})();
        }
        else {
            alert('Please enter food name!');
        }
    });
});
