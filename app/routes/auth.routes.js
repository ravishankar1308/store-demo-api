const { verifySignUp, verifyToken } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization');
    next();
  });

  app.post("/api/auth/signin",
      controller.signin);

  app.post("/api/auth/resolve",
      verifyToken,
      controller.resolve);

  app.post(
    "/api/auth/signup",
      verifySignUp,
    controller.signup
  );

  app.get(
      "/api/users",
      verifyToken,
      controller.findAll
  );

};
