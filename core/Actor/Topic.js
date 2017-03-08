'use strict';

const Actor = require('cqrs').Actor
    , TopicModel = require('../model/Topic');

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
        let eventName = event.name
            , data = this._data;
        switch (eventName) {
            case 'top':
                data.top = true;
                break;
            case 'untop':
                data.top = false;
                break;
            case 'fine':
                data.fine = true;
                break;
            case 'unfine':
                data.fine = false;
                break;
            case 'access':
                ++data.accessNum;
                break;
            case 'update':
                data.title = event.data.title;
                data.content = event.data.content;
                data.updateTime = Date.now();
                break;
        }
    }
}

module.exports = Topic;
