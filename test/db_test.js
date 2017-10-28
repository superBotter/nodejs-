// const Goods = require('../models/goods');
// const GoodsType = require('../models/goods_type');

// Goods.find()
//   .then(data=>{
//     console.log(data)
//   })
//   .catch(err=>{
//     console.log(err)
//   })
// GoodsType.find()
//   .then(data=>{
//     console.log(data)
//   })
//   .catch(err=>{
//     console.log(err)
//   })
const News = require('../models/news');
const NewsType = require('../models/news_type');

News.aggregate({
    $group:{_id:'$news_type',count:{$sum:1}}
  }).then(data=>{
    // console.log(data)
    NewsType.populate(data,{path:'_id'})
      .then(dd=>{
        console.log(dd)
      })
  })
