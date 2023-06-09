'use strict';
const {
    Sequelize,
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Reservations, {
                sourceKey: "user_id",
                foreignKey: "user_id"
            });

        }
    }
    Users.init({
        user_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user_name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        kakao_id: {
            allowNull: false,
            type: Sequelize.BIGINT
        },
        provider: {
            allowNull: false,
            type: Sequelize.STRING
        },
        createdAt: { // createdAt 필드 제거
            type: Sequelize.VIRTUAL,
            defaultValue: Sequelize.fn('now')
        },
        updatedAt: { // updatedAt 필드 제거
            type: Sequelize.VIRTUAL,
            defaultValue: Sequelize.fn('now')
        }
    }, {
        sequelize,
        modelName: 'Users',
    });
    return Users;
};
