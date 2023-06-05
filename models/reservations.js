'use strict';
const {
    Sequelize,
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reservations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Flights, {
                targetKey: "flight_id",
                foreignKey: "flight_id",
                as: "start_airport"

            })

            this.belongsTo(models.Airports, {
                targetKey: "airport_id",
                foreignKey: "eairport_id",
                as: "end_airport"
            })
        }
    }
    Reservations.init({
        reservation_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        flight_id: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        people_num: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        total_price: {
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
        modelName: 'Reservations',
    });
    return Reservations;
};