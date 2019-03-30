const userSchema = require("../models/UserSchema");
const validator =  require("email-validator");
async function GetTheUsers() {

    return userSchema.find().sort({firstname: -1});
}

async function GetCurrentUser(userId) {

   
    return userSchema.findById({_id: userId});
  
}

async function CheckLoginInformation(UserInfo) {

    UserInfo.email = UserInfo.email.toLowerCase();
    const checkUserEmail = validator.validate(UserInfo.email);
    if(checkUserEmail) {

        return userSchema.findOne({email: UserInfo.email});
    }

}


module.exports = {

    GetTheUsers,
    CheckLoginInformation,
    GetCurrentUser
    
}