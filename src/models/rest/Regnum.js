
const regnum = (sequelize, DataTypes) => {
    const Regnum = sequelize.define(
        'regnum',
        {
            regId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            regnum: {
                type: DataTypes.STRING,
                allowNull: false
            }

        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    Regnum.sync();

    return Regnum;
};

export default regnum;
