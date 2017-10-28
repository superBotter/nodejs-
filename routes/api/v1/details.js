const express = require('express');
const router = express.Router();
const News = require('../../../models/news')
router.get('/:id', (req, res) => {
    News.findById(req.params.id)
        .then(data => {
            res.send({
                status: 'y',
                msg: '获取数据成功',
                data
            });
        })
})

module.exports = router;