const express = require('express');
const NewsType = require('../../../models/news_type')
const router = express.Router();
const moment = require('moment')
router.get('/', (req, res) => {
    let page = 1; // 当前页码
    if (req.query.page) {
        page = Number(req.query.page);
    }
    var queryCount = NewsType.count()
    var queryData = NewsType.find().select('name description created_at')
        .sort({ _id: -1 })
        .limit(global.pageSize)
        .skip((page - 1) * global.pageSize);
    var pAll = Promise.all([queryCount, queryData])
    pAll.then(([allCount, data]) => {
        const pageCount = Math.ceil(allCount / global.pageSize); // 总页数
        res.json({
            data: {
                list: data,
                pageCount, //总页数
                pageIndex: page, //当前页码
            },
            status: 'y',
            msg: '获取数据成功',
        });
    })
})
router.post('/create', (req, res) => {
    var model = new NewsType(req.body)
    model.save()
        .then(data => {
            // console.log(data)
            res.json({
                status: 'y',
                msg: '保存数据成功',
                data: data,
            })
        })


})
router.post('/delete/:id', (req, res) => {
    if (req.params.id) {
        NewsType.findByIdAndRemove(req.params.id)
            .then(data => {
                res.send({
                    status: 'success',
                    msg: '删除成功',
                })
            })
    } else {
        res.send('删除失败');
    }
});
router.get('/editor/:id', (req, res) => {
    NewsType.findById(req.params.id)
        .then(data => {
            console.log(data)
            res.json({
                status: 'y',
                msg: '获取数据成功',
                data: data,
                isEditor: true
            })
        })
});
router.post('/editor/:id', (req, res) => {
    NewsType.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.json({
                status: 'y',
                msg: '修改数据成功',
                data
            })
        })
});
module.exports = router;