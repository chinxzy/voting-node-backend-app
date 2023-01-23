import { DataTypes } from 'sequelize'


/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const vote = (sequelize, DataTypes) => {
    const Vote = sequelize.define(
        'vote',
        {
            voteId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            voter: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            category: {
                type: DataTypes.STRING,
                allowNull: false,

            },

            candidate: {
                type: DataTypes.STRING,
                allowNull: false,

            },


        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    Vote.sync();

    return Vote;
};

export default vote;
