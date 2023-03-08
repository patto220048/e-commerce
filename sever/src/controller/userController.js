
const User = require('../model/userModel')
const bcrypt = require('bcryptjs')

class UserController{

    async getAllUser(req, res, next){
        try {
            const user = await User.find()
            res.status(200).json(user)
            
        } catch (err) {
            res.status(500).json("Can't not get all user from sever" )
        }

    }
    async getUser(req, res, next){
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
         
        } catch (err) {
            res.status(500).json("Can't not get user from sever" )
        }

    }
    async updateUser(req, res, next){
        try {
            if(req.user.id === req.params.id || req.user.admin)
                {
                    if(req.body.password)
                    {
                        const salt = bcrypt.genSaltSync(10);
                        req.body.password = await bcrypt.hash(req.body.password,salt)
                    
                    }
                    const userUpdate =  await User.findByIdAndUpdate(req.params.id, 
                        {$set : req.body},
                        {new:true}
                    )
                    res.status(200).json(userUpdate)
                }
                
            else{
                res.status(401).json("You just update your account!!")

            }


         
        } catch (err) {
            res.status(500).json("Can't not updata user from sever" )
        }

    }
    async deleteUser(req, res, next){
        try {
            if(req.user.id === req.params.id || req.user.admin)
            {
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("Delete success!!!")

            }
            else{
                res.status(401).json("You just delete your account!!")

            }


         
        } catch (err) {
            res.status(500).json("Can't not delete user from sever" )
        }

    }


}

module.exports = new UserController