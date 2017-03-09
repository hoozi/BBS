'use strict';

const Domain = require('cqrs');

module.exports = (domain) => {
    let TopicCreate = Domain.Alias().actorType('Topic').name('create').get()
    ,ReplyCreate = Domain.Alias().actorType('Reply').name('create').get();

    //发帖+10分
    domain.on(TopicCreate, event => {
        domain.get('Topic', event.actorId).then((data)=>{
            domain.call(`User.${data.authorId}.plus`,{integral:10});
        })
    });

    //回帖+5分
    domain.on(ReplyCreate, event => {
        domain.get('Reply', event.actorId).then((data)=>{
            domain.call(`User.${data.authorId}.plus`,{integral:5});
        })
    })
}