"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        //     this.hasMany(models.Reservations, {
        //         sourceKey: "user_id",
        //         foreignKey: "user_id",
        //     });
        // }
    }
    Users.init(
        {
            user_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            kakao_id: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            provider: {
                allowNull: true,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Users",
            tableName: "users",
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
    return Users;
};
