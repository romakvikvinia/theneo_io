const mongoose = require("mongoose");
const Document = require("./Document");
mongoose.connect(
  // "mongodb+srv://root:Theneoio123@google-docs.qvefy.mongodb.net/?retryWrites=true&w=majority"
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`
);

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  //

  socket.on("get-document", async (documentId) => {
    const document = await findOrCreate(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    //

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreate(id) {
  if (!id) return;

  const document = await Document.findById(id);
  if (document) return document;

  return Document.create({ _id: id, data: "" });
}
