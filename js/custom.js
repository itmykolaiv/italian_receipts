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
    
});
