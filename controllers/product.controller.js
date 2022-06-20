const Product = require('../models')

const create = async (req, res) => {
    const name = req.body.name
    const category = req.body.category
    const price = req.body.price
    const quantity = req.body.quantity
    
    return Product.create({
        name: name,
        category: category,
        price : price,
        quantity : quantity
    }).then(product => {
        res.status(200).send({
            status: "SUCCESS",
            message:"Product berhasil ditambahkan",
            data: product
        })
    }).catch(e => {
        console.log(e)
        res.status(503).send({
            status:"FAIL",
            message: "Gagal menambahkan product"
        })
    })
}

const getProduct = async (req,res) =>{
    
    const id = req.id

    return Product.findAll({
        where : {
            id : id
        },
        include :{
            model : Product,
            as : "product"
        }
    }). then(product => {
        res.status(200).send({
            status : "Sucess",
            data : product
        })
    })
}
module.exports = {
    create,
    getProduct
}