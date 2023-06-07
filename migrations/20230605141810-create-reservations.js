"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Reservations", {
            reservation_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            flight_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            people_num: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            total_price: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Reservations");
    },
};
