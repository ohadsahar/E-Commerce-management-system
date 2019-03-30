const mongoose = require("mongoose");


function ConnectMongoose() {
mongoose.connect("mongodb+srv://ohad:ppd53brx!@cluster0-vw61b.mongodb.net/FunkoPop?retryWrites=true",  { useNewUrlParser: true })
.then(() =>{


  console.log("Connected to server");

})
.catch((error) => {


  console.log(error);
});

}

module.exports =  {

  ConnectMongoose,
}
