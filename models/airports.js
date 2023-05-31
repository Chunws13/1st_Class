'use strict';
const {
    Sequelize,
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Airports extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Flights, {
                sourceKey: "airport_id",
                foreignKey: "sairport_id"
            });

            this.hasMany(models.Flights, {
                sourceKey: "airport_id",
                foreignKey: "eairport_id"
            })
        }
    }
    Airports.init({
        airport_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        airport_city: {
            unique: true,
            allowNull: false,
            type: Sequelize.STRING
        },
        airport_code: {
            allowNull: false,
            type: Sequelize.STRING
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("now")
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
        modelName: 'Airports',
    });
    return Airports;
};