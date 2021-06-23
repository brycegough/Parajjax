(function($) {
    window.requestAnimationFrame = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function(f){return setTimeout(f, 1000/60)} // simulate calling code 60

    window.cancelAnimationFrame = window.cancelAnimationFrame
        || window.mozCancelAnimationFrame
        || function(requestID){clearTimeout(requestID)} //fall back

    window.Parajjax = function( selector ) {
        var __ = this;
        this.element = $(selector);
        this.data = JSON.parse(this.element.attr('data-parajjax'));
        this.element[0].parajjax = this;
        this.layers = this.data.layers;
        this.ticking = true;
        this.fps = 60;

        this.responsiveWidth = 800;
        this.responsiveSens = 0.2;

        this.element.addClass('parajjax');

        var index = 0;
        Object.values(this.layers).forEach(function( layer ) {
            layer.classname = `parajjax-layer layer-${ index } ${ layer.classname || '' }`.trim();

            let $el = $(`<div class="${ layer.classname }"><img alt="${ layer.alttext }" srcset="${ layer.srcset }" src="${ layer.image }" /></div>`);

            // Parse the sensitivity argument
            __.layers[ index ].sensitivity = parseFloat(__.layers[ index ].sensitivity);

            __.layers[ index ].element = $el;
            __.element.append($el);
            index++;
        });

        this.start = function() {
            __.ticking = true;
            requestAnimationFrame( __.doFrame );
        };

        this.stop = function() {
            __.ticking = false;
        };

        /*
         * Updates the scroll position of all layers
         */
        this.doFrame = function() {
            let _doFrame = function() {
                let depth = 0,
                pageY = window.pageYOffset,
                mouseX = window.cursorPosition.x,
                elWidth = __.element.width(),
                elOffsetX = (elWidth / 2) - mouseX,
                enableResponse = $(window).width() <= __.responsiveWidth;

                Object.values( __.layers ).forEach(function( layer ) {
                    let change = -pageY * layer.sensitivity,
                    changeX = elOffsetX * layer.cursor_sensitivity;

                    // Reduce sensitivity on mobile
                    if (enableResponse) change = change * __.responsiveSens;

                    layer.element.css('transform', `translate3d(${ changeX }px, ${ change }px, 0)`);

                    depth++;
                });

                if (__.ticking) requestAnimationFrame( __.doFrame );
            };

            if (__.fps < 60) {
                setTimeout(_doFrame, 1000 / __.fps);
            } else {
                _doFrame();
            }
        };

        this.start();
    };

    $(document).ready(function() {
        $('[data-parajjax]').each(function() {
            new Parajjax(this);
        });
    });

    window.cursorPosition = { x: 0, y: 0 };
    $(window).on('mousemove', function(e) {
        window.cursorPosition = {
            x: e.pageX,
            y: e.pageY
        };
    });
})(jQuery);
