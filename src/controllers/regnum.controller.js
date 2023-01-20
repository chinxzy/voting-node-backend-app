const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const Regnum = db.rest.models.regnum

exports.createRegnum = async (req, res) => {
    const { regnum } = req.body;
    if (!regnum) {
        return res.status(400).send({
            message: 'Please provide all fields to create a regnum entry!',
        });
    }

    let regnumExists = await Regnum.findOne({
        where: {
            regnum: {
                [Op.eq]: regnum
            },
        }
    });

    if (regnumExists) {
        return res.status(400).send({
            message: 'regnum already exists',
        });
    }

    try {
        let newRegnum = await Regnum.create({
            regnum,
        });
        return res.send(newRegnum);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

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
