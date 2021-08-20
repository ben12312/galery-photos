const { Photos } = require('../models');

class Controller {
    static showPhotos(req, res) {
        Photos.findAll()
            .then(photos => {
                res.status(200).json({ photos })
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Photos not found'
                })
            })
    }

    static showByAlbum(req, res) {
        Photos.findAll({
            where: { albumId: req.body.albumId }
        })
            .then(photos => {
                res.status(200).json({ photos })
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Photos not found'
                })
            })
    }

    static createPhoto(req, res) {
        let newPhoto = {
            albumId: req.body.albumId,
            title: req.body.title,
            url: req.body.url,
            thumbnailUrl: req.body.thumbnailUrl
        }
        Photos.create(newPhoto)
            .then(photo => {
                res.status(201).json({
                    id: photo.id,
                    title: photo.title
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Fail create photo'
                })
            })
    }

    static renamePhoto(req, res) {
        Photos.update({ title: req.body.title }, {
            where: { id: req.params.id }
        })
            .then(photo => {
                res.status(200).json({ photo: photo.title })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Fail rename photo'
                })
            })
    }

    static changeAlbum(req, res) {
        Photos.update({ albumId: req.body.albumId }, {
            where: { id: req.params.id }
        })
            .then(photo => {
                res.status(200).json({ photo: photo.albumId })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Fail change album photo'
                })
            })
    }

    static deletePhoto(req, res) {
        Photos.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.status(200).json({ message: `sucess delete photo` })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Fail delete'
                })
            })
    }
}

module.exports = Controller