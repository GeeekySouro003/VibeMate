const io = require("socket.io")(8100, {
    cors: {
      origin: "http://localhost:5137",   //localhost of vite server
    },
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });

});