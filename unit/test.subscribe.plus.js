const Reply = require('../core/Actor/Reply'),
    UserRecorder = require('../core/Actor/UserRecorder'),
    Topic = require('../core/Actor/Topic'),
    User = require('../core/Actor/User'),
    plus = require('../core/subscribe/plus'),
    Domain = require('cqrs'),
    should = require('should'),
    domain = new Domain();
domain.register(Reply).register(Topic).register(User).register(UserRecorder);

describe('plus', () => {

    let UserId;

    plus(domain);
    
    domain.create('UserRecorder');

    //测试发帖积分+10
    it('#plus 10', done => {
        domain.create('User', {
            loginName: 'hoozi',
            password: '12345'
        }).then((data) => {
            should.exists(data.id);
            UserId = data.id;
            domain.create('Topic', {
                authorId: data.id,
                title: 'test title',
                content: 'test 1111111111111111content'
            }).then((data) => {
                domain.get('User', data.authorId).then((data) => {
                    data.integral.should.equal(10);
                    done();
                })
            })
        })
    });

    //测试回帖积分+5
    it('#plus 5', done => {
        should.exists(UserId);
        domain.create('Reply', {
            authorId: UserId,
            content: 'contentcontentcontentcontentcontent'
        }).then((data) => {
            domain.get('User', data.authorId).then((data) => {
                data.integral.should.equal(15);
                done();
            })
        })
    })
})