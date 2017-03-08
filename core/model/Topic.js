'use strict';

const {isLength} = require('validator');

function _vaildator(data) {
    let {title, content} = data;
    console.log(title,content)
    return title && content && isLength(title, {
        min: 5,
        max: 20
    }) && isLength(content, {
        min: 20,
        max: 1000
    })
}

module.exports = function (data) {
    if (!_vaildator(data)) {
        throw new Error("Topic actor create fail")
    };
    return {
        authorId: data.authorId,
        title: data.title,
        content: data.content,
        accessNum: 0,
        top: false, //置顶
        fine: false, //加精
        createTime: Date.now(),
        updateTime: Date.now()
    }
}