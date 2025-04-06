import {Piece} from "../Pieces/Piece";
import {MoveGenerator} from "./MoveGenerator";
import {Move} from "./Move";
import {MoveChecker} from "./MoveChecker";
import {ColorType} from "../Pieces/Utils/Colors";
import {PieceFinder} from "../Pieces/Utils/PieceFinder";
import {Board} from "../Board";
import {MoveRegistry} from "./History/MoveRegistry";
import {CheckAnalyzer} from "../Check/CheckAnalyzer";

export class MoveManager
{
    private readonly pieces: Array<Piece>;
    private moveGenerator: MoveGenerator;

    constructor(pieces: Array<Piece>) {
        this.pieces = pieces;

        this.moveGenerator = new MoveGenerator(this.pieces);
    }

    public getMoves(piece: Piece, lastMove: MoveRegistry | null): Array<Move> {
        let moves = this.moveGenerator.getAllPossibleMoves(piece)
        return this.filterPossibleMoves(moves, piece, lastMove);
    }

    public filterPossibleMoves(possibleMoves: Array<Move>, piece: Piece, lastMove: MoveRegistry | null): Array<Move> {
        return possibleMoves.filter((move: Move) => {
            let moveChecker: MoveChecker = new MoveChecker(this.pieces, piece, move);

            return moveChecker.checkMove(lastMove)
        })
    }

    public moveAndAnalyzeCheck(piece: Piece, move: Move): boolean {
        let capturedPiece = PieceFinder.find(this.pieces, move.x, move.y);
        if (move.isCapture && capturedPiece !== null) {
            this.removePiece(capturedPiece);
        }

        if (move.isCastling) {
            this.moveRookInCastle(piece, move);
        }

        if (move.isEnPassant) {
            const foundPiece: Piece | null = PieceFinder.find(this.pieces, move.x, piece.position.y)
            if (foundPiece !== null) {
                this.removePiece(foundPiece);
            }
        }

        piece.position.x = move.x;
        piece.position.y = move.y;
        piece.hasAlreadyMoved = true;

        const attackedKingColor: ColorType = piece.color === ColorType.White ? ColorType.Black : ColorType.White
        const checkAnalyzer: CheckAnalyzer = new CheckAnalyzer(attackedKingColor, this.pieces);

        return checkAnalyzer.analyze();
    }

    public moveRookInCastle(piece: Piece, move: Move): void {
        const y: 8 | 1 = piece.color === ColorType.White ? 1 : 8;

        // true - left, false - right
        const xDirection: boolean = Board.xAxis.indexOf(piece.position.x) > Board.xAxis.indexOf(move.x);
        const x = xDirection ? "A" : "H"

        const rook: Piece | null = PieceFinder.find(this.pieces, x, y);
        if (rook !== null) {
            rook.position.x = xDirection ? "D" : "F";
        }
    }

    public removePiece(piece: Piece): void {
        for (let i = 0; i < this.pieces.length; i++) {
            let boardPiece = this.pieces[i];
            if (boardPiece.position.x === piece.position.x && boardPiece.position.y === piece.position.y) {
                this.pieces.splice(i, 1);
                break;
            }
        }
    }
}