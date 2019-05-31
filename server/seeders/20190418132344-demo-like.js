

/*
    seeding the like table with sample testing data
 */
'use strict';

module.exports = {
  up: (queryInterface) => {

      return queryInterface.bulkInsert('likes', [
        {
          postid: 1,
          likedon: new Date(),
          likedby: 'johnDoe',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postid: 2,
          likedon: new Date(),
          likedby: 'hemanth',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postid: 3,
          likedon: new Date(),
          likedby: 'nidamanuri',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postid: 4,
          likedon: new Date(),
          likedby: 'evilhems',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postid: 5,
          likedon: new Date(),
          likedby: 'hemsevil',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface) => {

      return queryInterface.bulkDelete('likes', null, {});

  }
};
