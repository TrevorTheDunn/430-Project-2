const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');

const getAccount = async () => {
    const response = await fetch('/getAccount', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await response.json();

    const username = (result) => {
        return (
            <h3 id="username"></h3>
        );
    };
};