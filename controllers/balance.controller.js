const Balance = require('../models')

const Topup = async (req, res) => {
    const user_id = req.body.user_id
    const amount = req.body.amount
    
    return Balance.create({
        user_id : user_id,
        amount : amount
    }).then(balance => {
        res.status(200).send({
            status: "SUCCESS",
            message:"TopUp Berhasil dilakaukan",
            data: balance
        })
    }).catch(e => {
        console.log(e)
        res.status(503).send({
            status:"FAIL",
            message: "Gagal melakukan TopUp"
        })
    })
}
module.exports = {
    Topup
}