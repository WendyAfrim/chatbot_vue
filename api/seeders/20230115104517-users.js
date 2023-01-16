'use strict';

const faker = require('@faker-js/faker');

const roles = ['ROLE_ADMIN', 'ROLE_USER'];

const users = [...Array(10)].map((userSocket) => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  role: roles[Math.floor(Math.random() * roles.length)],
  online: false,
  password: 'user123!',
  createdAt: new Date(),
  updatedAt: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('user_socket', users , {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_socket', null, {});
  }
};
