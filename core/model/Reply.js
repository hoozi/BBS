'use strict';

const {isLength} = require('validator');

function _vaildator(data) {
    let {content} = data;
    return content && isLength(content, {
        min: 20,
        max: 1000
    });
}

module.exports = function (data) {
    if (!_vaildator(data)) {
        throw new Error("Reply actor create fail")
    };
    return {
        authorId: data.authorId,
        topicId: data.topicId,
        content: data.content,
        createTime: Date.now()
    }
}