'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const bcrypt = require('bcrypt');

    await queryInterface.bulkInsert('Users', [{
        username: 'mmarko',
        firstname: 'marko',
        lastname: 'milasinovic',
        email: 'mmilasinovic12418ri@raf.rs',
        password: bcrypt.hashSync('reddit',10),
        role: 'admin'
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};