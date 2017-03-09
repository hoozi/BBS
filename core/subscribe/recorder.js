'use strict';

const Domain = require('cqrs');

module.exports = function(domain) {
    let UserCreate = Domain.Alias().actorType('User').name('create').get();

    domain.on(UserCreate, function userCreate(event){
        let email = event.data.email
        ,   loginName = event.data.loginName;
        domain.call('UserRecorder.recorder.record',{
            email,
            loginName
        });
    })
}