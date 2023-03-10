const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
const User = db.rest.models.user
const Regnum = db.rest.models.regnum
const jwt = require("jsonwebtoken");

//register users
exports.registerUser = async (req, res) => {
    try {
        //get user input

        const { firstname, lastname, email, password, gender, regnum } = req.body

        //validate user input

        if (!firstname && !lastname && !email && !password &&
            !gender && !regnum) {
            res.status(400).send("All input is required");
        }

        //check if user already exist and reg exist in the regnum database

        const userExist = await User.findOne({
            where: {
                email: {
                    [Op.iLike]: email
                }
            }
        });

        const regnumExist = await Regnum.findOne({
            where: {
                regnum: {
                    [Op.iLike]: regnum
                }
            }
        })

        if (userExist) {
            return res.status(418).send("Admin already exist with this credential. please login");

        }

        if (!regnumExist) {
            return res.status(419).send("No record of this regnum found");

        } else {
            //Encrypt user password

            const encryptedPassword = await bcrypt.hash(password, 10);

            //create user

            const user = await User.create({
                firstname,
                lastname,
                email,
                password: encryptedPassword,
                gender,
                regnum
            });
            res.status(201).json({
                status: 'success',
                message: 'User Registered',
                data: {
                    user: {
                        email: user.email,
                        role: user.regnum
                    }
                }
            })


            return res.send(user)
        }

    } catch (error) {
        console.log(error)
    }
}


//get all users
exports.getAllUsers = async (req, res) => {


    const allUsers = await User.findAll({
        attributes: [],
        attributes: [
            'userId',
            'firstname',
            'lastname',
            'email',
            'gender'
        ]
    })

    // if (classtype) {
    //     const classtypeUser = await Subject.findAll({
    //         where: {
    //             classtype: {
    //                 [Op.iLike]: classtype
    //             }
    //         }
    //     })
    //     return res.send({ "teachers": classtypeUser })
    // }
    // console.log(req.query)

    if (!allUsers) {
        return res.status(404).send({
            message: "No user found"
        })
    }
    return res.send({ "users": allUsers })
}

//get single user
exports.getUser = async (req, res) => {
    const userId = req.params.id;

    const user = await User.findOne({

        where: {
            userId,

        },
        attributes: [],
        attributes: [
            'userId',
            'firstname',
            'lastname',
            'email',
            'gender'


        ]
    });

    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${userId}`,
        });
    }

    return res.send(user);
};

//user login
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate input

        if (!email || !password) {
            res.status(400).send("All input is required")
        }

        //check is user exist
        const user = await User.findOne({
            where: {
                email: {
                    [Op.iLike]: email
                }
            }
        });

        if (!user) {
            res.status(419).send("User with these credential doesn't exist")
        } else if (await bcrypt.compare(password, user.password)) {
            const tokenPayLoad = {
                email: user.email,
            };

            const accessToken = jwt.sign(tokenPayLoad, process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                });
            res.status(201).json({
                accessToken
            });
        } else {
            res.status(419).send({ "data": "Wrong password" })
        }
    }
    catch (error) {
        console.log(error)
    }
}

// exports.deleteUser = async (req, res) => {
//   const { id } = req.body;
//   if (!id) {
//     return res.status(400).send({
//       message: 'Please provide a id for the user you are trying to delete!',
//     });
//   }

//   const user = await User.findOne({
//     where: {
//       id,
//     },
//   });

//   if (!user) {
//     return res.status(400).send({
//       message: `No user found with the id ${id}`,
//     });
//   }

//   try {
//     await user.destroy();
//     return res.send({
//       message: `User ${id} has been deleted!`,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       message: `Error: ${err.message}`,
//     });
//   }
// };

// exports.updateUser = async (req, res) => {
//   const { username, password } = req.body;
//   const { id } = req.params;

//   const user = await User.findOne({
//     where: {
//       id,
//     },
//   });

//   if (!user) {
//     return res.status(400).send({
//       message: `No user found with the id ${id}`,
//     });
//   }

//   try {
//     if (username) {
//       user.username = username;
//     }
//     if (password) {
//       user.password = password;
//     }

//     user.save();
//     return res.send({
//       message: `User ${id} has been updated!`,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       message: `Error: ${err.message}`,
//     });
//   }
// };
