'use strict';

const Actor = require('cqrs').Actor,
    UserModel = require('../model/User');

/**
 * User Actor
 * @class User
 * @extends {Actor}
 */
class User extends Actor {
    constructor(data) {
        let model = UserModel(data);
        super(model);
    }

    

    /**
     * 加分
     * @param {object | null} data
     * @param {function} service
     * @memberOf User
     */
    plus(data, service) {
        service.apply('plus',data.integral);
    }

    /**
     * 减分
     * @param {object | null} data
     * @param {function} service
     * @memberOf User
     */
    minus(data, service) {
        service.apply('minus',data.integral);
    }

    /**
     * 更新昵称 或者 email
     * @param {object | null} data
     * @param {function} service
     * @memberOf User
     */
    update(data, service) {
        if('email' in data) {
            service.apply('updateEmail', data.email);
        }
        if('nickName' in data) {
            service.apply('updateNickName', data.nickName);
        }
    }

    /**
     * 更新密码
     * @param {object | null} data
     * @param {function} service
     * @memberOf User
     */
    updatePassword(data, service) {
        service.apply('updatePassword', data.password);
    }

    /**
     * 事件分配
     * @param {object} event
     * @memberOf User
     */
    when(event) {
        let eventName = event.name,
            eventData = event.data,
            data = this._data;
        switch (eventName) {
            case 'plus':
                data.integral+= eventData;
                break;
            case 'minus':
                data.integral-= eventData;
                break;
            case 'updateEmail':
                data.email = eventData;
                break;
            case 'updateNickName':
                data.nickName = eventData;
                break;
            case 'updatePassword':
                data.password = eventData;
        }
    }


    /**
     * 验证重复
     * @static
     * @param {object} data 
     * @param {function} service 
     * @returns 
     * 
     * @memberOf User
     */
    static createBefor(data, service) {

        return new Promise((resolve, reject)=>{
            service.get('UserRecorder','recorder').then((rdata)=>{
                let loginName = data['loginName']
                ,   email = data['email'];
                if((loginName in rdata['loginName'] ) || (email in rdata['email'] )) {
                    reject('ditto!');
                } else {
                    resolve();
                }
            });
        })
    }
}

module.exports = User;