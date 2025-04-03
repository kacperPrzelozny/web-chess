import {MoveRegistry} from "./MoveRegistry";

export class MoveHistory {
    public history: Array<MoveRegistry> = []

    public getLastRegisteredMove(): MoveRegistry | null {
        if (this.history.length === 0) {
            return null;
        }

        return this.history[this.history.length - 1];
    }
}