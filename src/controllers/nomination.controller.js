const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const { default: user } = require('../models/rest/User');
const Nomination = db.rest.models.nomination
const User = db.rest.models.user
const Category = db.rest.models.category

exports.createNomination = async (req, res) => {
    try {
        // get user input

        const { nominator, category, nominee } = req.body

        //validate user input

        if (!nominator && !category && !nominee) {
            res.status(400).send("All input is required");
        }

        //check if nominator already has entry with a particular category

        const nominatorExist = await Nomination.findOne({
            where: {
                nominator: {
                    [Op.iLike]: nominator
                },
                category: {
                    [Op.iLike]: category
                }

            },
        })

        if (nominatorExist) {
            res.status(419).send("You have already nominated in this category")
        } else {
            const nomination = await Nomination.create({
                nominator,
                category,
                nominee
            });
            res.status(201).json({
                status: 'success',
                message: 'Nomination Successful',
                data: {
                    nomination: {
                        nominee: nomination.nominee,
                        category: nomination.category
                    }
                }
            })

            return res.send(nomination)
        }


    } catch (error) {
        console.log(error)
    }


}
