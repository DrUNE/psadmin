/**
 * Created by drune on 28.09.2015.
 */
"use strict";

var React = require('react');
var HomePage = React.createClass({
    render: function(){
        return (
            <div className="jumbotron">
                <h1>Administration</h1>
                <p> React and Flux in action</p>
            </div>
        );
    }
});

module.exports = HomePage;