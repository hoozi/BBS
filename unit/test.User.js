'use strict';

const Domain = require('cqrs')
,User = require('../core/Actor/User')
,should = require('should')
,domain = new Domain()

domain.register(User);

describe('User', function(){
    let UserId;
    //测试create
    it('#create', done=>{
        domain.create('User',{
            loginName:'hoozi',
            password:'12345'
        }).then((data)=>{
            data.loginName.should.equal('hoozi');
            data.password.should.equal('12345');
            UserId = data.id;
            done();
        })
    });

    //测试是否有UserId
    it('#should have UserId', done=>{
        should.exists(UserId);
        done();
    });

    //测试加分
    it("#User.plus", done=>{
        domain.call(`User.${UserId}.plus`,{integral:4});
        domain.get('User', UserId).then((data)=>{
            data.integral.should.equal(4); 
        });
        done();
    })

    //测试减分
    it("#User.minus", done=>{
        domain.call(`User.${UserId}.minus`,{integral:5});
        domain.get('User', UserId).then((data)=>{
            data.integral.should.equal(-1); 
        });
        done();
    });

    //测试update
    it("#User.update", done=>{
        domain.call(`User.${UserId}.update`,{email:'aaa@111',nickName:'hoozi nick'});
        domain.get('User', UserId).then((data)=>{
            data.email.should.equal('aaa@111'); 
            data.nickName.should.equal('hoozi nick'); 
        });
        domain.call(`User.${UserId}.update`,{email:'aaa@222'});
        domain.call(`User.${UserId}.update`,{nickName:'hoozi nick222'});
        domain.get('User', UserId).then((data)=>{
            data.email.should.equal('aaa@222'); 
            data.nickName.should.equal('hoozi nick222'); 
        });
        done();
    })

    //测试updatePassword
    it("#User.updatePassword", done=>{
        domain.call(`User.${UserId}.updatePassword`,{password:'54321'});
        domain.get('User', UserId).then((data)=>{
            data.password.should.equal('54321'); 
        });
        done();
    })

})
