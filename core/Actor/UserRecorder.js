'use strict';

const Actor = require('cqrs').Actor
,     UserRecorderModel = require('../model/UserRecorder');

/**
 * 用户注册记录器
 * @class UserRecorder
 * @extends {Actor}
 */
class UserRecorder extends Actor {
    constructor(data) {
        let model = UserRecorderModel(data);
        super(model);
    }

    /**
     * 记录用户名和邮箱
     * @param {object} data 
     * @param {function} service 
     * 
     * @memberOf UserRecorder
     */
    record(data, service) {
        service.apply('record', data);
    }

    when(event) {
        let eventName = event.name
        ,   data = this._data
        ,   eventData = event.data;
        switch(eventName) {
            case 'record':
                data.email[eventData['email']] = 1;
                data.loginName[eventData['loginName']] = 1;
            break;
        }
    }
}

module.exports = UserRecorder;