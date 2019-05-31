/*
      seeding the sample data with data base of comment section
 */

'use strict';
module.exports = {
  up: (queryInterface) => {

      return queryInterface.bulkInsert('comments', [
          {
            postid: 1,
            commentedby: 'JohnDoe',
            commentedon: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          postid: 2,
          commentedby: 'hemanth',
          commentedon: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postid: 3,
          commentedby: 'nidamanuri',
          commentedon: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postid: 4,
          commentedby: 'evilhems',
          commentedon: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postid: 5,
          commentedby: 'hemsevil',
          commentedon: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});

  },

  down: (queryInterface) => {

      return queryInterface.bulkDelete('comments', null, {});

  }
};
