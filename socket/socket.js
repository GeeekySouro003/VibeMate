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

    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });

    //send message to specific users

    socket.on("send-message", (data) => {
      const{receivedId}=data;
      const User=activeUsers.find((user) =>
      
        User.userId===receivedId);
        console.log("Sending from socket to:",receivedId);
        console.log("Data:",data);
        if(User)
        {
          io.to(user.socketId).emit("receive message",data);
        }
      
    })


});