'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Flights', {
            airport_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            flight_num: {
                allowNull: false,
                type: Sequelize.STRING
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
                type: Sequelize.STRING
            },
            end_datetime: {
                allowNull: false,
                type: Sequelize.STRING
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
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Flights');
    }
};