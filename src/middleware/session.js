const { auth } = require("../config/firebase");
const sessionMiddleware = (req, res, next) => {
  const {email, credentials} = req.signedCookies;
  if (email && credentials) {
    auth
      .verifyIdToken(credentials)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(500).send("Currently we can verify your identity");
      });
  } else {
    res.status(403).send("You must be loggedin");
  }
};
module.exports = sessionMiddleware;
