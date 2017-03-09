'use strict';

const UserRecorder = require('../core/Actor/UserRecorder'),
    User = require('../core/Actor/User'),
    recorder = require('../core/subscribe/recorder'),
    Domain = require('cqrs'),
    should = require('should'),
    domain = new Domain();
domain.register(UserRecorder).register(User);

describe('recorder', ()=>{

    recorder(domain);
    domain.create('UserRecorder');
    it('#create',(done)=>{
        
        domain.create('User',{
            loginName:'hoozi',
            password:'12345',
            email:'111@111'
        }).then(data=>{
            domain.create('User',{
                loginName:'hoozi',
                password:'12345',
                email:'111@111'
            }).catch(e=>{
                console.log(e)
            });
        });
        done();
        /*domain.create('User',{
            loginName:'hoozi',
            password:'12345',
            email:'111@111'
        })*/

       
    })
})