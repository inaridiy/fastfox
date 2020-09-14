const { Router } = require('express')
const path = require('path');
const moment = require('moment');
const m = moment();
const Posts = require(path.join(__dirname, "../../database/models")).Posts;

//Posts.findAll().then(user => console.log(user)).catch(err => console.log(err))

const router = Router()

// Mock Users

router.get('/posts', function (req, res, next) {
    if (req.query.id) {
        Posts.findAll({
            where: {
                id: req.query.id
            }
        }).then(posts => res.json(posts));
    } else if (req.query.nohtml) {
        Posts.findAll({
            attributes: {
                exclude: ['content']
            },
            where: {
                status: "open"
            },
            order: [
                ['id', 'DESC']
            ]
        }).then(posts => res.json(posts))
    }
    else {
        Posts.findAll({
            where: {
                status: "open"
            },
            order: [
                ['id', 'DESC']
            ]
        }).then(posts => res.json(posts))
    }

})

router.post('/posts', function (req, res, next) {
    if (req.query.new) {
        console.log("new")
        Posts.create({
            content: ``, title: "", excerpt: "", status: "open", createdAt: m.format('YYYY/MM/DD'),
            updatedAt: m.format('YYYY/MM/DD')
        }).then(post => { res.json({ id: post.dataValues.id }) })
    } else {

        Posts.update(req.body, { where: { id: req.body.id } })
        res.end()
    }

})

/* GET user by ID. */

module.exports = router
