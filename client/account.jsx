const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handlePassChange = async (e, onPassChanged) => {
    e.preventDefault();
    helper.hideError();

    const oldPass = e.target.querySelector('#oldPass').value;
    const pass = e.target.querySelector('#newPass').value;
    const pass2 = e.target.querySelector('#newPass2').value;

    helper.sendPost(e.target.action, 
        {oldPass, pass, pass2},
        onPassChanged);
    return false;
};

const PasswordChange = (props) => {
    return (
        <form id="passwordChangeForm"
              onSubmit={ (e) => handlePassChange(e, props.triggerReload) }
              name="passwordChangeForm"
              action="/passwordChange"
              method="POST"
              className="passwordChangeForm"
        >
            <label htmlFor="oldPassword">Old Password: </label>
            <input id="oldPass" type="text" name="oldPassword" />
            <label htmlFor="newPassword">New Password: </label>
            <input id="newPass" type="text" name="newPassword" />
            <label htmlFor="newPassword2">New Password (again): </label>
            <input id="newPass2" type="text" name="newPassword2" />
            <button id="passwordButton">Submit</button>
        </form>
    );
};

const updatePassword = (e) => {
    e.preventDefault();

    const root = createRoot(document.getElementById('content'));
    root.render( <PasswordChange /> );
};


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
            <a id="passwordButton" href="" onClick={updatePassword}>Change Password</a>
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