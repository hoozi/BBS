module.exports = function (data) {
    return {
        authorId: data.authorId,
        title: data.title,
        content: data.content,
        accessNum: 0,
        top: false,//置顶
        fine: false,//加精
        createTime: Date.now(),
        updateTime: Date.now()
    }
}