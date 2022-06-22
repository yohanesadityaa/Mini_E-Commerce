'use strict';
const bcrypt = require('bcrypt')

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
    const hashPassword = bcrypt.hashSync('admin321', bcrypt.genSaltSync(10))

    await queryInterface.bulkInsert('Users', [{
      username : 'ADMIN',
      email : 'admin@gmail.com',
      password : hashPassword,
      createdAt : new Date(),
      updatedAt : new Date()
    }],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users',null,{})
  }
  
};
