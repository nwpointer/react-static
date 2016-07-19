var React = require('react');
var ReactApp = require('./pages/root.js');
 
var mountNode = document.body;
 
React.render(new ReactApp({}), mountNode);