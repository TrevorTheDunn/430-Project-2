const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const Recipe = (props) => {
    
};

const Content = () => {
    return (
        <div>
            <Recipe />
        </div>  
    );
}

const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render( <Content />);
};
window.onload = init;