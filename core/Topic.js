'use strict';

const Domain = require("cqrs");
const Actor = Domain.Actor;

class Topic extends Actor {
    constructor(data) {
        super({
            author: data.author,
            title: data.title,
            content: data.content,
            createTime: Date.now(),
            updateTime: data.updateTime
        });
    }

}
