import { DataTypes } from 'sequelize'


/**
 * 
 * @param {*} sequelize 
 * @param { DataTypes } DataTypes 
 * @returns 
 */
const category = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'category',
        {
            categoryId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    Category.sync();

    return Category;

};

export default category;
