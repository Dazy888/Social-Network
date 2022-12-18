export class PostDto {
    id;
    postId;
    text;
    date;

    constructor(model) {
        this.id = model.id
        this.postId = model.postId
        this.text = model.text
        this.date = model.date
    }
}