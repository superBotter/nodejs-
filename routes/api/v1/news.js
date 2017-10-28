const express = require('express');
const router = express.Router();

const utils = require('../../../tools/utils');
const News = require('../../../models/news');
const NewsType = require('../../../models/news_type');
router.get('/', (req, res) => {
    let page = 1; // 当前页码
    if (req.query.page) {
        page = Number(req.query.page);
    }
    // let query = {}
    // if (req.query.type) {
    //     query.news_type = req.query.type
    // }
    const queryCount = News.count();
    const queryType = NewsType.find()
    const queryData = News.find().sort({ _id: -1 }) // 数据查找
        .limit(global.pageSize).skip((page - 1) * global.pageSize);
    const pAll = Promise.all([queryCount, queryType, queryData])
    pAll.then(([allCount, type_data, data]) => {
        const pageCount = Math.ceil(allCount / global.pageSize); // 总页数
        console.log(data)
        res.json({
            data: {
                list: data,
                type: type_data,
                pageCount, //总页数
                pageIndex: page, //当前页码
            },
            status: 'y',
            msg: '获取数据成功',
        });
    })
})
router.post('/create', (req, res) => {
    var model = new News(req.body)
    model.save()
        .then(data => {
            console.log(data)
            res.json({
                status: 'y',
                msg: '保存数据成功',
                data: data,

            })
        })
})
router.get('/editor/:id', (req, res) => {
    News.findById(req.params.id)
        .then(data => {
            res.json({
                status: 'y',
                msg: '获取数据成功',
                data: data,
                isEditor: true
            })
        })
})
router.post('/editor/:id', (req, res) => {
    News.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.json({
                status: 'y',
                msg: '修改数据成功'
            })
        })
})
router.post('/delete/:id', (req, res) => {
    if (req.params.id) {
        News.findByIdAndRemove(req.params.id)
            .then(data => {
                res.send({
                    status: 'success',
                    msg: '删除成功'
                })
            })
    } else { res.send('删除失败') }
})
module.exports = router;