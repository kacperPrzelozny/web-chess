import {Piece} from "../Pieces/Piece";
import {MoveGenerator} from "./MoveGenerator";
import {Move} from "./Move";
import {MoveChecker} from "./MoveChecker";
import {ColorType} from "../Pieces/Utils/Colors";
import {PieceFinder} from "../Pieces/PieceFinder";

export class MoveManager
{
    private pieces: Array<Piece>;
    private moveGenerator: MoveGenerator;

    constructor(pieces: Array<Piece>) {
        this.pieces = pieces;

        this.moveGenerator = new MoveGenerator(this.pieces);
    }

    public getMoves(piece: Piece): Array<Move> {
        let moves = this.moveGenerator.getAllPossibleMoves(piece)
        return this.filterPossibleMoves(moves, piece);
    }

    public filterPossibleMoves(allowedMoves: Array<Move>, piece: Piece): Array<Move> {
        return allowedMoves.filter((move: Move) => {
            let moveChecker: MoveChecker = new MoveChecker(this.pieces, piece, move);

            return moveChecker.checkMove()
        })
    }

    public move(piece: Piece, move: Move): void {
        let capturedPiece = PieceFinder.find(this.pieces, move.x, move.y);
        if (move.isCapture && capturedPiece !== null) {
            this.removePiece(capturedPiece);
        }

        piece.position.x = move.x;
        piece.position.y = move.y;
    }

    public removePiece(piece: Piece): void {
        for (let i = 0; i < this.pieces.length; i++) {
            let boardPiece = this.pieces[i];
            if (boardPiece.position.x === piece.position.x && boardPiece.position.y === piece.position.y) {
                this.pieces.splice(i, 1);
            }
        }
    }
}