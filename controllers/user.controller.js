const bcrypt = require('bcrypt')
const { User } = require('../models/index')
const { Role} = require('../models/index')
const{generateToken} = require('../middlewares/authentication')

const signUp = async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password =req.body.password
  
    User.findOne({
    where : {
        email:email
    }
    }).then( user => {
        if( user ) {
            return res.status(400). send({
                message: "Email Already Exists"
             })
    }
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        
        User.create({
             username : username,
             email: email,
             password: hashPassword
             }).then(user => {
                res.status(200).send({
                      message: "User berhasil dibuat",
                      data : user
                    })
        Role.create({
            user_id :user.id,
			Role : "User"
        }).then(role=> {
            res.status(200).send({
			message: "User dan Roles berhasil dibuat",
			data : role
        })
    })	
}).catch(e => {
    res.status(500).send({
        status: "Internal Server Error",
        message : e
    })
})
})}
const signIn = async (req, res) => {
    const body = req.body 
    const email = body.email
    const password = body.password
    
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(!user) {
            return res.status(400). send({
                message: "Email Not Found"
            })
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        
        if(!isValidPassword) {
            return res.status(400). send({
                message: "Password is not match"
            })
        }
        const token = generateToken({
            id: user.id,
            email: user.email,
            username : user.username,
        });
        
        return res.status(200).send({
            status: "Succes",
            message : "User Login success",
            data : {
                id: user.id,
                email: user.email,
                username : user.username,
                token: token
            }
        })
    }).catch(e=> {
        console.log(e)
        return res.status(500). send({
            message: "Internal server Error"
        })
    })
}
                                    
module.exports = {
    signUp,
    signIn
 }