const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la DB");
  }
};

module.exports = {
  connectionDB,
};
