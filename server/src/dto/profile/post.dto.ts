export class PostDto {
    postId
    text
    userId

    constructor(model) {
        this.userId = model.userId
        this.postId = model.postId
        this.text = model.text
    }
}
