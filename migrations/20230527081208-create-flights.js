'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Flights', {
            flight_id: {
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
                type: Sequelize.INTEGER,
                references: {
                    model: "Airports",
                    key: "airport_id"
                },
                onDelete: "CASCADE"
            },
            eairport_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Airports",
                    key: "airport_id"
                },
                onDelete: "CASCADE"
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
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Flights');
    }
};