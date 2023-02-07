// take data in database
const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class loginController{

    //[POST] /api/signup
   async signup(req, res, next){
        try {
            
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({...req.body, password:hash})

            const token = jwt.sign({
                id:newUser._id,
                admin:newUser.admin},
                process.env.JWT_PW,
                { expiresIn: '1d' })
            const {password, ...other} = newUser._doc
            const cookie = res.cookie('access_token', token,{
                httpOnly: true,
                path: '/',
            })  

            await newUser.save()   
            res.status(200).json(newUser)

        } catch (err) {
            res.status(500).json(err.message)

        }   
         
    }


    //[POST] /api/login 
    async login(req,res,next){
        try {
            const user = await User.findOne({email:req.body.email})
            
            if(!user) return res.status(403).json("User not found")

            const isCorrectPassword = await bcrypt.compare(req.body.password, user.password)

            if(!isCorrectPassword) {
                res.status(403).json("Invalid password")
            }
            else {
                const token = jwt.sign(
                    {id:user._id, admin:user.admin}
                    ,process.env.JWT_PW,
                    { expiresIn: '1d' })
                
                const {password, ...other} = user._doc
                const cookie = res.cookie('access_token', token,{
                    httpOnly: true,
                    path: '/',
    
                })
                res.status(200).json(other)

            }
            
        } catch (err) {
            res.status(500).json(err.message)
            
        }



       
    }
    
}

module.exports = new loginController;