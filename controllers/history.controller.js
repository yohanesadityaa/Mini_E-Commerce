const {Product} = require('../models/index')
const {Balance} = require('../models/index')
const {User} = require('../models/index')
const {History} = require ('../models/index')
const {Op} = require ("sequelize")
const purchase = async(req, res)=>{
    const user_id = req.id
    const product_id = req.body.product_id
    const quantity = req.body.quantity
    try {   
        const result = await History.sequelize.transaction(async (t) => {
            User.findOne({
                where:{
                    id:user_id
                }
            }).then( user => {
                if( !user ) {
                    return res.status(400). send({
                        message: "User tidak terdaftar!"
                    })
                }
                Product.findOne({
                    where:{
                        id:product_id,
                        quantity:{
                            [Op.gte]:quantity
                        }
                    }
                }).then( product =>{
                    if( !product ) {
                        return res.status(400). send({
                            message: "Quantity atau Product tidak terdaftar!"
                        })
                    }
                    Balance.findOne({
                        where:{
                            user_id:user_id,
                            amount:{
                                [Op.gte]:product.price*quantity
                            }
                        }
                    }).then( balance =>{
                        if( !balance ) {
                            return res.status(400). send({
                                message: "Saldo Anda Kurang!"
                            })
                        }
                        Product.update({
                            quantity:product.quantity-quantity
                        },{
                            where:{
                                id:product_id
                            }
                        },{
                            transaction:t
                      })
                      Balance.update({
                        amount:balance.amount-(product.price*quantity)
                      },{
                        where:{
                            user_id:user_id
                        }
                      },{
                        transaction:t
                      })
                      History.create({
                        user_id:user_id,
                        product_id:product_id,
                        quantity:quantity,
                        total_price: product.price*quantity
                      }).then( history =>{
                        res.status(200).send({
                            status: "Success",
                            message: "Transaksi Berhasil Dibuat!",
                            data : history
                        })
                      },{
                         transaction:t
                      })
                      
                   })
               })
             });
          })
         } catch (error) { 
            console.log(error)   
         }
     }
    
const getUserHistory = async (req, res) => {
    const id = req.id
    return User.findAll({
        where:{
            id:id
        },
        include: {
            model:History,
            as:"history",
            include: {
                model: Product,
                as:"product"
            }
        }
    }).then(history => {
        res.status(200).send({
            status: "success",
            data : history
        })
    })
}
    
module.exports = {
    purchase,
    getUserHistory
}
