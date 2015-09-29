/**
 * Created by drune on 28.09.2015.
 */
"use strict";

var React = require('react');
var AboutPage = React.createClass({
    render: function() {
        return (
            <div>
                <h1>About</h1>
                <p>
                    Some technologies used:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                        <li>Node</li>
                        <li>Gulp</li>
                        <li>Browserfy</li>
                        <li>Bootstrap</li>
                    </ul>
                </p>
            </div>
        );
    }

});

module.exports = AboutPage;
