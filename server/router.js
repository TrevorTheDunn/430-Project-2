const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getRecipes', controllers.Recipe.getRecipes);

  app.get('/getRecipeById', controllers.Recipe.getRecipeById);

  app.get('/getAccount', mid.requiresLogin, controllers.Account.getAccount);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/creator', mid.requiresLogin, controllers.Recipe.creatorPage);
  app.post('/creator', mid.requiresLogin, controllers.Recipe.createRecipe);

  app.get('/home', controllers.Recipe.homePage);

  app.get('/account', mid.requiresLogin, controllers.Account.accountPage);

  app.get('/verifyPass', mid.requiresLogin, controllers.Account.verifyPassword);
  app.post('/passwordChange', mid.requiresLogin, controllers.Account.passwordChange);

  app.get('/', controllers.Recipe.homePage);
};

module.exports = router;