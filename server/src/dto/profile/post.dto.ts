export class PostDto {
    postId
    text
    date
    userId

    constructor(model) {
        this.userId = model.userId
        this.postId = model.postId
        this.text = model.text
        this.date = model.date
    }
}
