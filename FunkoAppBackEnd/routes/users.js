const express = require("express");
const router = express.Router();
const userUtilCreator = require("../utils/userCreator.util");
const userUtilGetter = require("../utils/userGetter.util");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Global = require("../utils/Global.util");



router.post("", async (req,res) => {

   
    try {

        const UserCreateResult = await userUtilCreator.CreateUser(req.body);

        res.status(200).json({

            message: UserCreateResult.success,
            userCreate: UserCreateResult.user
        });
    } catch (error) {
        
        res.status(400).json({
            message: UserCreateResult.success
        })
    }

});

router.post("/login", async (req,res) => {
    
    
    try {
        
        const CheckInfo = await userUtilGetter.CheckLoginInformation(req.body);
    
        if (!CheckInfo) {
            res.status(401).json({
                message: 'User not exist:('
            });
            
        }

        if (bycrypt.compare(CheckInfo.password,req.body.password)) {
            
            const token = jwt.sign({email: CheckInfo.email, id: CheckInfo._id}, 'Must_Hire_Me');
            res.status(200).json({
                _id: CheckInfo._id,
                token: token
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
        
    }
})

router.get("", async (req,res) => {

    
    try {
        const GetAllUsersResult = await userUtilGetter.GetTheUsers();
      
        res.status(200).json({
            users: GetAllUsersResult
        });
    } catch (error) {
      
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
    }
  
});

router.get("/:id", async (req,res) => {
 
    try {
        const UserConnected = await userUtilGetter.GetCurrentUser(req.params.id);
        Global.role = UserConnected.role;
        if(UserConnected) {
            res.status(200).json({
                message: 'User fetched successFully!',
                user: UserConnected
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
    }
  
});

router.put("/:id", async (req,res) => {
  

    try {
        const updateUser = await userUtilCreator.UpdateCurrentUser(req.body, req.params.id);
        res.status(200).json({
            message: updateUser.message,
            user: updateUser.newuser
        })
    } catch (error) {
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
    }
   

})

module.exports = router;
