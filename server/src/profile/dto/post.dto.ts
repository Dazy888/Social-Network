export class PostDto {
    id;
    text;
    date;

    constructor(model) {
        this.id = model.id
        this.text = model.text
        this.date = model.date
    }
}