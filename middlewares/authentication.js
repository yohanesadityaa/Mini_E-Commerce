const jwt = require('jsonwebtoken')
const privatekey = "helloworld"
const Role = require('../models').Role;

const verify = (req, res, next) => {
    
    const token = req.headers["authentication"];
    jwt.verify(token, privatekey, (err, decoded) => {
        if(err){
            return res.status(403).send({
                message: "User is not Authorize"
            })
        }
        req.id = decoded.id
        req.email = decoded.email
        next()
    })
}    
const generateToken = ( payload ) => {
    const token = jwt.sign(payload, privatekey, {
        algorithm: "HS256",
        expiresIn: "1H"
    })
    return token
}

const verifyAdmin = async (req, res, next) => {
	const token = req.headers["authentication"];

	if (token === undefined) {
		return res.status(401).send({
			err: "Forbidden",
		});
	}

	jwt.verify(token, privatekey, async (err, decoded) => {
		const id = decoded.id;
		console.log("user_id", id);
		const userRole = await Role.findOne({
			where: {
				user_id: id,
			},
		});
		console.log("Role: ", userRole);
		if (userRole === null || userRole.Role !== 'Admin') {
			return res.status(401).send({
				err: "Forbidden, Only admin can Access",
			});
		}
		next()
	});
};
module.exports = {
    generateToken,
    verify,
    verifyAdmin
}