'use strict';

const Actor = require('cqrs').Actor
    , ReplyModel = require('../model/Reply');

/**
 * Reply Actor
 * @class Reply
 * @extends {Actor}
 */
class Reply extends Actor {
    constructor(data) {
        let model = ReplyModel(data);
        super(model);
    }
}

module.exports = Reply;
