document.addEventListener("DOMContentLoaded", function() {
    send_request('recipes/random', 'limitLicense=false&number=6&tags=italian', function(data) {
        var slider = document.querySelector('.js_slider');
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
});
