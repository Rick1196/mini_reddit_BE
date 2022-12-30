require("dotenv").config();
const { app, server } = require("./config/server");
const config = require("./config/config");
const authenticationRoute = require("./routes/authenticationRoute");
const subredditRoute = require("./routes/subredditsRoute");
app.use("/authentication", authenticationRoute);
app.use("/subreddits", subredditRoute);
server.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
