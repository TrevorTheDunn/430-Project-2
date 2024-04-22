const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

// const getAccount = async () => {
//     const response = await fetch('/getAccount', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     const result = await response.json();


// };

const Account = (props) => {
    console.log("Account called!");
    const [account, setAccount] = useState(props.account);

    useEffect(() => {
        const loadAccount = async () => {
            const response = await fetch('/getAccount');
            const data = await response.json();
            setAccount(data.account);
        }
        loadAccount();
    }, [props.reloadAccount]);

    if(!account) {
        return (
            <div className="accountView">
                <h3 className="emptyAccount">No account found!</h3>
            </div>
        );
    }

    return (
        <div className="accountView">
            <h3 className="accountName">{account.username}</h3>
        </div>
    );
};

const AccountView = () => {
    const [reloadAccount, setReloadAccount] = useState(false);
    console.log("Account view called!");

    return (
        <Account account={null} reloadAccount={reloadAccount} />
    );
};


const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render( <AccountView /> );
};
window.onload = init;