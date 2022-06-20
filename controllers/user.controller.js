const User = require("../models/index").User;
const Role = require("../models/index").Role;
const { generate } = require("../middleware/authentication");
const bcrypt = require("bcrypt");

const signIn = async (req, res, next) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		User.findOne({ where: 
            { 
                email: email 
            } 
        }).then((user) => {
			if (!user) {
				return res.status(400).send({
					error: "ERROR",
					message: "User not found",
				});
			}

			const isValid = bcrypt.compareSync(password, user.password);

			if (!isValid) {
				return res.status(400).send({
					error: "ERROR",
					message: "Username and password not match",
				});
			}

			res.status(200).send({
				status: "SUCCESS",
				message: "Login success",
				token: generate({
					id: user.id,
					username : user.username,
					email: user.email,
				}),
			});
		});
	} catch (err) {
		next(err);
	}
};

const signUp = async (req, res, next) => {
	try {
		// validasi
		const email = req.body.email;
		const username = req.body.username;
		const password = req.body.password;

		console.log(email);

		User.findOne({ where: { email: email } }).then((user) => {
			if (user) {
				return res.status(400).send({
					error: "USER_FAILED_REGISTER",
					message: "Username Already Exists",
				});
			}

			bcrypt.hash(password, 10, function (err, hash) {
				// Store hash in your password DB.
				return User.create({
					username: username,
					email: email,
					password: hash,
				})
					.then((user) => {
						return Role.create({
							user_id: user.id,
							role: "USER",
						});
					})
					.then((user) => {
						res.status(200).send({
							status: "SUCCESS",
							message: "Register is Success",
							token: generate({
								id: user.id,
								username : user.username,
								email: user.email,
							}),
						});
					});
			});
		});
	} catch (err) {
		next(err);
	}
};
module.exports = { 
    signIn, 
    signUp 
};
