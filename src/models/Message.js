export class Message {
    constructor(id = new Date().getTime(), author = '', created = new Date(), text = '') {
        this.id = id;
        this.author = author;
        this.created = created;
        this.text = String(text);
    }
}
