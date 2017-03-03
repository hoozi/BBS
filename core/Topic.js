'use strict';

const Domain = require("cqrs");
const Actor = Domain.Actor;

class Topic extends Actor {
    constructor(data) {
        super({
            author: data.author,
            title: data.title,
            content: data.content,
            accessNum: 0,
            top: false,//置顶
            fine: false,//加精
            createTime: Date.now(),
            updateTime: Date.now()
        });
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
        service.apply('access')
    }
    when(event) {
        switch(event.name) {
            case 'top':
                this._data.top = true;
            break;
            case 'uptop':
                this._data.top = false;
            break;
            case 'fine':
                this._data.fine = true;
            break;
            case 'unfine':
                this._data.unfine = false;
            break;
            case 'access':
                ++this._data.accessNum;
            break;
        }
    }
}
