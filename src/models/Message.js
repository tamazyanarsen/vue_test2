import { getRandomNumber } from "@/utils/utils";

export class Message {
    constructor(text = '', done = false) {
        this.text = String(text);
        this.done = Boolean(done);
        this.id = new Date().getTime().toString() + getRandomNumber();
    }
}
