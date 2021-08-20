'use strict';

const axios = require('axios');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(photos => {
        let rowPhotos = [];

        photos.data.forEach(photo => {
          rowPhotos.push({
            albumId: photo.albumId,
            title: photo.title,
            url: photo.url,
            thumbnailUrl: photo.thumbnailUrl,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        });

        queryInterface.bulkInsert('Photos', rowPhotos)
      })
      .catch(err => console.log(err))
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Photos', null, {})
  }
};
