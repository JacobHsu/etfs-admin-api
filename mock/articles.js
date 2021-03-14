"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { etfs } = require("./data/etfs");
const { countries } = require("./data/countries");
const { stock } = require("./data/stock");
const { bond } = require("./data/bond");
const { ark } = require("./data/ark");
const { spdr, vanguard, ishares, invesco, morningstar } = require("./data/us");

const tslib_1 = require("tslib");
const faker_1 = tslib_1.__importDefault(require("faker"));
// const articleList = [];
const articleCount = 3;
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';

// for (let i = 0; i < articleCount; i++) {
//     articleList.push({
//         id: i,
//         status: faker_1.default.random.arrayElement(['published', 'draft', 'deleted']),
//         title: faker_1.default.lorem.sentence(6, 10),
//         abstractContent: faker_1.default.lorem.sentences(2),
//         fullContent: mockFullContent,
//         sourceURL: faker_1.default.internet.url(),
//         imageURL: faker_1.default.image.imageUrl(),
//         timestamp: faker_1.default.date.past().getTime(),
//         platforms: [faker_1.default.random.arrayElement(['a-platform', 'b-platform', 'c-platform'])],
//         disableComment: faker_1.default.random.boolean(),
//         importance: faker_1.default.random.number({ min: 1, max: 3 }),
//         author: faker_1.default.name.findName(),
//         reviewer: faker_1.default.name.findName(),
//         type: faker_1.default.random.arrayElement(['CN', 'US', 'JP', 'EU']),
//         pageviews: faker_1.default.random.number({ min: 300, max: 500 })
//     });
// }
// node array merge

const articleList = etfs.concat(countries, stock, bond, spdr, vanguard, ishares, invesco, ark, morningstar)

//let index = 0
// const array1 = [ ark, morningstar, bond] // [etfs, stock, bond, spdr, vanguard, ishares, invesco, ark, morningstar]
// array1.map(item => {
//     console.log(4, item.length)
//   index = item.length  
//   for (let i = 0; i < item.length; i++) {
//     articleList.push({
//       id: item[i].id,
//       status: faker_1.default.random.arrayElement(['published', 'draft']),
//       name: item[i].etf,
//       title: item[i].name,
//       tag: item[i].tag,
//       abstractContent: faker_1.default.lorem.sentences(2),
//       fullContent: mockFullContent,
//       sourceURL: faker_1.default.internet.url(),
//       imageURL: faker_1.default.image.imageUrl(),
//       timestamp: faker_1.default.date.past().getTime(),
//       platforms: [faker_1.default.random.arrayElement(['a-platform', 'b-platform', 'c-platform'])],
//       disableComment: faker_1.default.random.boolean(),
//       importance: item[i].star,
//       issuer: item[i].issuer,
//       reviewer: faker_1.default.name.findName(),
//       type: item[i].type,
//       vanguard: '',
//       category: item[i].category,
//       pageviews: faker_1.default.random.number({ min: 300, max: 500 })
//     })
//   }
// })

// for (let i = 0; i < countries.length; i++) {
//     articleList.push({
//       id: i,
//       status: faker_1.default.random.arrayElement(['published', 'draft']),
//       name: countries[i].etf,
//       title: countries[i].name,
//       tag: countries[i].tag,
//       abstractContent: faker_1.default.lorem.sentences(2),
//       fullContent: mockFullContent,
//       sourceURL: faker_1.default.internet.url(),
//       imageURL: faker_1.default.image.imageUrl(),
//       timestamp: faker_1.default.date.past().getTime(),
//       platforms: [faker_1.default.random.arrayElement(['a-platform', 'b-platform', 'c-platform'])],
//       disableComment: faker_1.default.random.boolean(),
//       importance: countries[i].star,
//       issuer: countries[i].issuer,
//       reviewer: faker_1.default.name.findName(),
//       type: countries[i].type,
//       vanguard: countries[i].vanguard,
//       category: '',
//       pageviews: faker_1.default.random.number({ min: 300, max: 500 })
//     })
//   }

exports.getArticles = (req, res) => {
    const { type, page = 1, limit = 220, sort } = req.query;
    let mockList = articleList.filter(item => {
        if (type && item.type !== type)
            return false;
        return true;
    });
    if (sort === '-id') {
        mockList = mockList.reverse();
    }
    const pageList = mockList.filter((_, index) => index < limit * page && index >= limit * (page - 1));
    return res.json({
        code: 20000,
        data: {
            total: mockList.length,
            items: pageList
        }
    });
};
exports.getArticle = (req, res) => {
    const { id } = req.params;
    for (const article of articleList) {
        if (article.id.toString() === id) {
            return res.json({
                code: 20000,
                data: {
                    article
                }
            });
        }
    }
    return res.json({
        code: 70001,
        message: 'Article not found'
    });
};
exports.createArticle = (req, res) => {
    const { article } = req.body;
    return res.json({
        code: 20000,
        data: {
            article
        }
    });
};
exports.updateArticle = (req, res) => {
    const { id } = req.params;
    const { article } = req.body;
    for (const v of articleList) {
        if (v.id.toString() === id) {
            return res.json({
                code: 20000,
                data: {
                    article
                }
            });
        }
    }
    return res.json({
        code: 70001,
        message: 'Article not found'
    });
};
exports.deleteArticle = (req, res) => {
    return res.json({
        code: 20000,
    });
};
exports.getPageviews = (req, res) => {
    return res.json({
        code: 20000,
        data: {
            pageviews: [
                { key: 'PC', pageviews: 1024 },
                { key: 'Mobile', pageviews: 1024 },
                { key: 'iOS', pageviews: 1024 },
                { key: 'Android', pageviews: 1024 }
            ]
        }
    });
};
