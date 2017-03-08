'use strict';

const validator = require('validator');

module.exports = function(data) {
    return {
        loginName: data.loginName,
        password: data.password,
        num: 0,
        nickName: data.loginName,
        email: data.email
    }
}