const io = require("./chatServer").io;

module.exports = function(socket) {
  console.log("socket id" + socket.id);
};
