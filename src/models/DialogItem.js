export class DialogItem {

    constructor(id = new Date().getTime(), subject = '', created = new Date(), parts) {
        this.id = id;
        this.subject = subject;
        this.created = created;
        this.parts = parts;
    }
}
