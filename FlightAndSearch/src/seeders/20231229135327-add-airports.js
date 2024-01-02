'use strict';

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
   await queryInterface.bulkInsert('Airports',[
    {
      name :' john international airport',
      cityId:2,
      createdAt:new Date(),
      updatedAt:new Date()
    },
      {
        name :' mary international airport',
        cityId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },

      {
        name :' irfan international airport',
        cityId:3,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name :' saih international airport',
        cityId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    
   ],{});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
