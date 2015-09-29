$ = jQuery = require('jquery'); //dependency required by Bootstrap

(function (window) {
    "use strict";

    var React = require('react');
    var HomePage = require('./components/homePage');
    var AboutPage = require('./components/about/aboutPage');
    var Header = require('./components/common/header');
    var views = {
        'about': AboutPage,
        'default': HomePage
    };

    function viewByRoute(routeName) {
        return views[routeName] || views['default'];
    }

    function render() {
        var route = window.location.hash.substr(1);
        React.render(<App route={route}/>, document.getElementById('app'));
    }

    var App = React.createClass({
        render: function () {
            var RouteView = viewByRoute(this.props.route);
            return (
                <div>
                    <Header />
                    <RouteView/>
                </div>
            );

        }
    });

    window.addEventListener('hashchange', render);
    render();
})(window);
