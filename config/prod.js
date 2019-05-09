// prod.js - production keys here
module.exports = {
  gitlabClientID: process.env.GITLAB_CLIENT_ID,
  gitlabClientSecret: process.env.GITLAB_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};
