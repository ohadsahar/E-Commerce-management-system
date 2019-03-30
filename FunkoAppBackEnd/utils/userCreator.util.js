const userSchema = require("../models/UserSchema");
const validator = require("email-validator");
const bycrypt = require("bcryptjs");
async function CreateUser(userData) {

    try {
        const ValidateEmail = validator.validate(userData.email);

        if(ValidateEmail) {
            const hashPassword = await bycrypt.hash(userData.password, 10);
            userData.email = userData.email.toLowerCase();
            const newUser = new userSchema({
    
                email: userData.email,
                password: hashPassword,
                firstname: userData.firstname,
                lastname: userData.lastname,
                address: userData.address,
                role: 'admin'
                
            });
    
            newUser.save();
            return { success: true, user: newUser };
        }
    } catch (error) {
        return { success: false };
    }
}
async function UpdateCurrentUser(UserData, id) {

    try {
        user = new userSchema ({
            _id: id,
            email: UserData.email,
            password: UserData.password,
            firstname: UserData.firstname,
            lastname: UserData.lastname,
            address: UserData.address,
            role: UserData.role
        })
        
        await userSchema.findOneAndUpdate({_id: id}, user);
     
        return {message: true, newuser: user};
    } catch (error) {
        return {message: false};
        
    }
}

module.exports = {

    CreateUser,
    UpdateCurrentUser
}