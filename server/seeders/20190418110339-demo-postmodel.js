/*
  seeding the postmodel table with sampletesting data .
 */

'use strict';

module.exports = {
  up: (queryInterface) => {
      return queryInterface.bulkInsert('postmodels', [
        {
          title: 'JohnDoe',
          content: 'hdwqdvqkwdvkqvdkqvckqhvckqcvkjcvkqjhcvkjqhvckqjhvckqhcvk',
          postedby: 'JhonDoe',
          comment: 5,
          like: 5,
          views: 5,
          postedon: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'hemanth',
          content: 'hdwqdvqkwdvkqvdkqvckqhvckqcvkjcvkqjhcvkjqhvckqjhvckqhcvk',
          postedby: 'hemanth',
          comment: 5,
          like: 5,
          views: 5,
          postedon: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'nidamanuri',
          content: 'hdwqdvqkwdvkqvdkqvckqhvckqcvkjcvkqjhcvkjqhvckqjhvckqhcvk',
          postedby: 'nidamanuri',
          comment: 5,
          like: 5,
          views: 5,
          postedon: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'evilhems',
          content: 'hdwqdvqkwdvkqvdkqvckqhvckqcvkjcvkqjhcvkjqhvckqjhvckqhcvk',
          postedby: 'evilhems',
          comment: 5,
          like: 5,
          views: 5,
          postedon: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'hemsevil',
          content: 'hdwqdvqkwdvkqvdkqvckqhvckqcvkjcvkqjhcvkjqhvckqjhvckqhcvk',
          postedby: 'hemsevil',
          comment: 5,
          like: 5,
          views: 5,
          postedon: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface) => {

      return queryInterface.bulkDelete('postmodels', null, {});
  }
};
