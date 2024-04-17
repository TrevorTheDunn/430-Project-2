const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const {createRoot} = require('react-dom/client');

const DomoStats = (props) => {
    const [domos, setDomos] = useState(props.domos);

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            setDomos(data.domos);
        };
        loadDomosFromServer();
    }, [props.reloadDomos]);

    if(domos.length === 0) {
        return (
            <div>
                You have no Domos!
            </div>
        );
    }

    let numMDomos = 0;
    let numFDomos = 0;
    let numODomos = 0;
    let meanDomoAge = 0;

    let numDomos = domos.length;

    for(let i = 0; i < domos.length; i++) {
        console.log(domos[i].gender);
        if(domos[i].gender == 'Female' || domos[i].gender == 'female') {
            numFDomos+= 1;
        } else if(domos[i].gender == 'Male' || domos[i].gender == 'male') {
            numMDomos+= 1;
        } else {
            numODomos+= 1;
        }
        meanDomoAge += domos[i].age;
    }

    meanDomoAge = meanDomoAge / domos.length;

    console.log(numDomos);
    console.log(numMDomos);
    console.log(numFDomos);
    console.log(numODomos);
    console.log(meanDomoAge);

    return (
        <div className="domoStats">
            <h3 className="numDomos">Number of Domos: {numDomos}</h3>
            <h3 className="numMaleDomos">Number of Male Domos: {numMDomos}</h3>
            <h3 className="numFemDomos">Number of Female Domos: {numFDomos}</h3>
            <h3 className="numOtherDomos">Number of Domos of Other Genders: {numODomos}</h3>
            <h3 className="meanDomoAge">Mean Age of Domos: {meanDomoAge}</h3>
        </div>
    );
};

const Stats = () => {
    const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div id="stats">
            <DomoStats domos={[]} reloadDomos={reloadDomos} />
        </div>
    )
}

const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render( <Stats />);
};

window.onload = init;