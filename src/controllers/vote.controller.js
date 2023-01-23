const db = require('../models');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const { default: user } = require('../models/rest/User');
const Vote = db.rest.models.vote
const User = db.rest.models.user
const Category = db.rest.models.category

exports.addVote = async (req, res) => {
    try {
        // get user input

        const { voter, category, candidate } = req.body

        //validate user input

        if (!voter && !category && !candidate) {
            res.status(400).send("All input is required");
        }

        //check if nominator already has entry with a particular category

        const hasVoted = await Vote.findOne({
            where: {
                voter: {
                    [Op.iLike]: nominator
                },
                category: {
                    [Op.iLike]: category
                }

            },
        })

        if (hasVoted) {
            res.status(419).send("You have already voted in this category")
        } else {
            const vote = await Vote.create({
                voter,
                category,
                candidate
            });
            res.status(201).json({
                status: 'success',
                message: 'Voting Successful',
                data: {
                    nomination: {
                        candidate: vote.candidate,
                        category: nomination.category
                    }
                }
            })

            return res.send(vote)
        }


    } catch (error) {
        console.log(error)
    }


}
