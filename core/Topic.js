'use strict';

const Domain = require("cqrs");
const Actor = Domain.Actor;

class Topic extends Actor {
    constructor(data) {
        super({
            author: data.author,
            title: data.title,
            content: data.content,
            top: false,//置顶
            fine: false,//加精
            createTime: Date.now(),
            updateTime: Date.now()
        });
    }

}
