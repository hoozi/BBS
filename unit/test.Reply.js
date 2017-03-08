'use strict';

const Reply = require('../core/Actor/Reply')
    , Domain = require('cqrs')
    , should = require('should')
    , domain = new Domain();
domain.register(Reply);

describe('Reply', function(){
    
    //测试create
    it("#create", function(done) {

        //测试验证错误的情况
        domain.create('Reply', {content:'create Reply'}).catch(e=>{
            should.exists(e);
            console.log(e);

            //重新创建正确的Reply
            domain.create('Reply', {content:'create Reply Actor!!!!'})
            .then(function(data){
                console.log(data)
                done();
            });
            
        });
    })
})