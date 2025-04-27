import {ColorType} from "../Enums/Colors";
import {Piece} from "../Pieces/Piece";
import {Move} from "../Moves/Move";
import {MoveManager} from "../Moves/MoveManager";
import {MoveRegistry} from "../Moves/History/MoveRegistry";

export class PossibleMovesAnalyzer
{
    constructor(public analyzedColor: ColorType, public pieces: Array<Piece>) {
    }

    public analyze(lastMove: MoveRegistry | null): boolean {
        const moves: Array<Move> = [];
        const moveManager = new MoveManager(this.pieces);

        this.filterPiecesByColor().map((piece: Piece) => {
            moves.push(...moveManager.getMoves(piece, lastMove))
        })

        return moves.length > 0
    }

    private filterPiecesByColor() {
        return this.pieces.filter((piece: Piece) => {
            return piece.color === this.analyzedColor;
        })
    }
}