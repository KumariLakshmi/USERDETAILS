const User = require("./router/usersRouter");
module.exports = function (app) {
    app.use("/User", User);
};