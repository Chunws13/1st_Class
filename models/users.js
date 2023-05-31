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
            type: Sequelize.INTEGER
        },
        provider: {
            allowNull: false,
            type: Sequelize.STRING
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("now")
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