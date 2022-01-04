const mongoose = require("mongoose");

const connection = async (url) => {
  try {
    await mongoose.connect(
      url,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Monogodb has been connected successfully");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;
