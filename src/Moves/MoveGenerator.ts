import {Piece} from "../Pieces/Piece";
import {Move} from "./Move";
import {PieceFinder} from "../PieceFinder/PieceFinder";

export class MoveGenerator
{
    constructor(public pieces: Array<Piece>) {
    }

    public getAllPossibleMoves(piece: Piece)
    {
        let moves: Array<Move> = piece.getPossibleMoves()

        return this.mapCaptureMoves(moves, piece);
    }

    public mapCaptureMoves(possibleMoves: Array<Move>, piece: Piece): Array<Move> {
        return possibleMoves.map((move: Move) => {
            let foundPiece: Piece | null = PieceFinder.find(this.pieces, move.x, move.y);
            if (foundPiece !== null && foundPiece.color !== piece.color && move.canChangeCapture) {
                move.isCapture = true;
            }

            return move;
        })
    }
}