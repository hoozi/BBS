'use strict';

const Topic = require('../core/Actor/Topic')
    , Domain = require('cqrs')
    , should = require('should')
    , domain = new Domain();
domain.register(Topic);

describe('Topic', function () {
    let TopicId;

    //测试create
    it('#create', function (done) {
        domain.create('Topic', { title: 'test title', content: 'test 1111111111111111content' })
            .then(function (data) {
                console.log(data);
                TopicId = data.id;
            }).catch(e => console.log(e.stack));
        done();
    })

    //测试TopicId是否存在
    it('should have TopicId', function (done) {
        should.exists(TopicId);
        done()
    })

    //测试置顶功能
    it('#Topic.top', function (done) {
        domain.call(`Topic.${TopicId}.top`)
        domain.get('Topic', TopicId)
            .then(data => {
                console.log(data)
                data.top.should.equal(true);
            });
        done();
    });

    //测试取消置顶功能
    it('#Topic.untop', function(done) {
        domain.call(`Topic.${TopicId}.untop`)
        domain.get('Topic', TopicId)
            .then(data => {
                console.log(data)
                data.top.should.equal(false);
            });
        done();
    })

    //测试加精功能
    it('#Topic.fine', function (done) {
        domain.call(`Topic.${TopicId}.fine`)
        domain.get('Topic', TopicId)
            .then(data => {
                console.log(data)
                data.fine.should.equal(true);
            });
        done();
    });

    //测试取消加精功能
    it('#Topic.unfine', function(done) {
        domain.call(`Topic.${TopicId}.unfine`)
        domain.get('Topic', TopicId)
            .then(data => {
                console.log(data)
                data.fine.should.equal(false);
            });
        done();
    })

    //测试人数功能
    it('#Topic.access', function (done) {
        domain.call(`Topic.${TopicId}.access`)
        domain.get('Topic', TopicId)
            .then(data => {
                console.log(data)
                data.accessNum.should.equal(1);
            });
        done();
    });

    it('#Topic.update', function(done) {
        domain.call(`Topic.${TopicId}.update`,{
            title:'update title',
            content:'update content'
        });
        domain.get('Topic', TopicId)
            .then(data => {
                console.log(data)
                data.title.should.equal('update title');
                data.content.should.equal('update content');
            });
        done();
    })
})

