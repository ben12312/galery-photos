const photoRouter = require('express').Router();
const Controller = require('../controller/photoController');

photoRouter.get('/', Controller.showPhotos);
photoRouter.get('/album', Controller.showByAlbum);
photoRouter.post('/', Controller.createPhoto);
photoRouter.patch('/:id', Controller.renamePhoto);
photoRouter.patch('/album/:id', Controller.changeAlbum);
photoRouter.delete('/:id', Controller.deletePhoto);

module.exports = photoRouter