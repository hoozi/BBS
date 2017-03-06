'use strict';

const Actor = require('cqrs').Actor
    , TopicModel = require('../model/model.Topic');

/**
 * Topic Actor
 * @class Topic
 * @extends {Actor}
 */
class Topic extends Actor {
    constructor(data) {
        let model = TopicModel(data);
        super(model);
    }
    top(data, service) {
        service.apply('top');
    }
    untop(data, service) {
        service.apply('untop');
    }
    fine(data, service) {
        service.apply('fine');
    }
    unfine(data, service) {
        service.apply('unfine');
    }
    access(data, service) {
        service.apply('access');
    }
    update(data, service) {
        service.apply('update', data);
    }
    when(event) {
        let name = event.name
            , data = this._data
            , { top, fine, title, content, accessNum, createTime, updateTime } = data;
        switch (event.name) {
            case 'top':
                top = true;
                break;
            case 'uptop':
                top = false;
                break;
            case 'fine':
                fine = true;
                break;
            case 'unfine':
                unfine = false;
                break;
            case 'access':
                ++accessNum;
                break;
            case 'update':
                title = event.data.title;
                content = event.data.content;
                updateTime = Date.now();
                break;
        }
    }
}

module.exports = Topic
