import {Piece} from "../Pieces/Piece";

export class PieceFinder {
    public static find(pieces: Array<Piece>, x: string, y: number): Piece | null {
        for (let piece of pieces) {
            if (piece.position.x === x && piece.position.y === y) {
                return piece;
            }
        }

        return null;
    }
}