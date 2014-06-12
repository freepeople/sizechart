(function(document, Handlebars, SizeChart) {
    'use strict';
    Handlebars.partials = SizeChart.templates;
    var main = SizeChart.templates['main'];

    var getJSON = $.getJSON('./dev/js/data.json');
    getJSON.done(function(res) {
        var $container = $('.container');
        var html = main(res);
        $container.append(html);
    });

    var changeUnits = '[data-action="change-units"]';
    var unitOptions = changeUnits + ' input';

    var toggleClasses = function($selector) {
        $selector
            .siblings('.is-active')
            .toggleClass('is-active is-hidden')
            .end()
            .toggleClass('is-hidden is-active');
    };

    var convertUnits = function() {
        var $this = $(this);
        var unitValue = $this.val();
        var $currentUnit = $('[data-unit="' + unitValue + '"]');
        $this
            .attr('checked', true)
            .siblings()
            .attr('checked', false);

        toggleClasses($currentUnit);
    };

    var changeCountry = function() {
        var $this = $(this);
        var currentCountry = $this.data('countryTrigger');
        var $countrySelector = $this.closest('.size-chart')
            .find('[data-country="' + currentCountry + '"]');

        toggleClasses($countrySelector);
    };

    var crossHairs = function(toggle) {
        var $this = $(this);
        var idx = $this.index() + 1;
        $this.parent('tr')
             .find('td')[toggle]('highlight');

        $this.closest('table')
             .find('th:nth-child(' + idx + ')')[toggle]('highlight')
             .end()
             .find('td:nth-child(' + idx + ')')[toggle]('highlight');
    };

    var toggleMouse = function(e){
        var types = {
            'mouseenter': 'addClass',
            'mouseleave': 'removeClass'
        };
        return crossHairs.call(this, types[e.type]);
    };

    $(document)
        .on('change', unitOptions, convertUnits)
        .on('click', '[data-country-trigger]', changeCountry)
        .on('mouseenter', 'td', toggleMouse)
        .on('mouseleave', 'td', toggleMouse);


}(document, Handlebars, SizeChart));