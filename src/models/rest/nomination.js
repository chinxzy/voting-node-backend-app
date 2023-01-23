import { DataTypes } from 'sequelize'


/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const nomination = (sequelize, DataTypes) => {
    const Nomination = sequelize.define(
        'nomination',
        {
            nominationId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nominator: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            category: {
                type: DataTypes.STRING,
                allowNull: false,

            },

            nominee: {
                type: DataTypes.STRING,
                allowNull: false,

            },


        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    Nomination.sync();

    return Nomination;
};

export default nomination;
