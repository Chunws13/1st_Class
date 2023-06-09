'use strict';
const {
    Sequelize,
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Flights extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Airports, {
                targetKey: "airport_id",
                foreignKey: "sairport_id",
                as: "start_airport"

            })

            this.belongsTo(models.Airports, {
                targetKey: "airport_id",
                foreignKey: "eairport_id",
                as: "end_airport"
            })
        }
    }
    Flights.init({
        flight_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        flight_num: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        sairport_id: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        eairport_id: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        company: {
            allowNull: false,
            type: Sequelize.STRING
        },
        start_datetime: {
            allowNull: false,
            type: Sequelize.DATE
        },
        end_datetime: {
            allowNull: false,
            type: Sequelize.DATE
        },
        price: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        seat_left: {
            allowNull: false,
            type: Sequelize.INTEGER
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
        modelName: 'Flights',
    });
    return Flights;
};