export class PostDto {
    id
    postId
    text
    date
    userId

    constructor(model) {
        this.id = model.id
        this.userId = model.userId
        this.postId = model.postId
        this.text = model.text
        this.date = model.date
    }
}
