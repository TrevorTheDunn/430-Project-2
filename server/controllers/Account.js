const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');
const accountPage = (req, res) => res.render('account');

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const passwordChange = async (req, res) => {
  const oldPass = req.body.oldPass;
  const pass = req.body.pass;
  const pass2 = req.body.pass2;

  return Account.authenticate(req.session.account.username, oldPass, async (err, account) => {
    if (err || !account) {
      console.log(err);
      console.log("Account: " + account);
      return res.status(500).json({ error: 'An error occurred!' });
    }

    if(!pass) {
      return res.status(400).json({ error: 'A new password is required!' });
    }

    if(pass !== pass2) {
      return res.status(400).json({ error: 'Passwords do not match!' });
    }

    try {
      const hash = Account.generateHash(pass);
      const query = { username: req.session.account.username };
      await Account.findOneAndUpdate(query, { password: hash }).exec();
      return res.status(201).json({ message: 'Password successfully updated!' });
    } catch(err) {
      console.log(err);
      return res.status(500).json({ error: 'An error occurred!' });
    }
  });
};

const verifyPassword = (req, res) => {
  const pass = req.query.p;
  console.log("Entered pass: " + pass);
  
  return Account.authenticate(req.session.account.username, pass, (err, account) => {
    if (err || !account) {
      return res.status(500).json({ error: 'Password incorrect!' });
    }

    return res.json({ validPass: true });
  });
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/home' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  console.log('Username: ' + req.body.username);
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/home' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

const getAccount = async (req, res) => {
  try {
    const query = {};
    const docs = await Account.find(query)
      .select('username password _id').lean().exec();

    for(let i = 0; i < docs.length; i++) {
      if(docs[i].username === req.session.account.username) {
        return res.json({ account: docs[i] });
      }
    }

    return res.status(400).json({ error: 'Could not find account!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving account!' });
  }
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  getAccount,
  accountPage,
  verifyPassword,
  passwordChange,
};
