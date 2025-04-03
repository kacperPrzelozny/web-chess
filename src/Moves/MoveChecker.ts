import {Move} from "./Move";
import {Board} from "../Board";
import {Piece} from "../Pieces/Piece";
import {PieceFinder} from "../Pieces/PieceFinder";
import {PieceType} from "../Pieces/Utils/PieceType";
import {ColorType} from "../Pieces/Utils/Colors";
import {Position} from "../Pieces/Utils/Position";
import {MoveRegistry} from "./History/MoveRegistry";

export class MoveChecker
{
    constructor(public pieces: Array<Piece>, public piece: Piece, public move: Move) {
    }

    public checkMove(lastMove: MoveRegistry | null): boolean {
        if (this.move.x === undefined || this.move.y === undefined || this.move.y > 8 || this.move.y < 1) {
            return false;
        }

        let foundPiece: Piece | null = PieceFinder.find(this.pieces, this.move.x, this.move.y);

        if (!this.move.isCapture && foundPiece && !this.move.isEnPassant) {
            return false;
        }

        else if (this.move.isCapture && !foundPiece && !this.move.isEnPassant) {
            return false;
        }

        if (this.move.isCapture && foundPiece !== null && this.piece.color === foundPiece.color && !this.move.isEnPassant) {
            return false;
        }

        if (this.move.isEnPassant && !this.checkEnPassant(lastMove)) {
            return false;
        }

        if (this.move.isCastling && !this.checkCastleMove()) {
            return false;
        }

        if (this.move.isInColumn && !this.checkMoveInColumn()) {
            return false
        }

        if (this.move.isInRow && !this.checkMoveInRow()) {
            return false;
        }

        return !(this.move.isDiagonal && !this.checkDiagonal());
    }

    public checkMoveInColumn(): boolean {
        let start:number;
        let end:number;

        if (this.piece.position.y > this.move.y) {
            start = this.move.y;
            end = this.piece.position.y;
        } else {
            start = this.piece.position.y
            end = this.move.y;
        }

        for (let i = start + 1; i < end; i++) {
            let piece = PieceFinder.find(this.pieces, this.move.x, i)
            if (piece) {
                return false;
            }
        }

        return true;
    }

    public checkMoveInRow(): boolean {
        let start:number;
        let end:number;

        if (Board.xAxis.indexOf(this.piece.position.x) > Board.xAxis.indexOf(this.move.x)) {
            start = Board.xAxis.indexOf(this.move.x);
            end = Board.xAxis.indexOf(this.piece.position.x);
        } else {
            start = Board.xAxis.indexOf(this.piece.position.x);
            end = Board.xAxis.indexOf(this.move.x);
        }

        for (let i = start + 1; i < end; i++) {
            let piece = PieceFinder.find(this.pieces, Board.xAxis[i], this.move.y)
            if (piece) {
                return false;
            }
        }

        return true;
    }

    public checkDiagonal(): boolean {
        const deltaX = Math.abs(Board.xAxis.indexOf(this.piece.position.x) - Board.xAxis.indexOf(this.move.x));
        const deltaY = Math.abs(this.piece.position.y - this.move.y);

        if (deltaX !== deltaY) {
            return false;
        }

        const stepX = this.piece.position.x < this.move.x ? 1 : -1;
        const stepY = this.piece.position.y < this.move.y ? 1 : -1;

        for (let i = 1; i < deltaX; i++) {
            let piece = PieceFinder.find(
                this.pieces,
                Board.xAxis[Board.xAxis.indexOf(this.piece.position.x) + i * stepX],
                this.piece.position.y + i * stepY
            );

            if (piece !== null) {
                return false;
            }
        }
        return true;
    }

    public checkCastleMove(): boolean {
        if (this.piece.hasAlreadyMoved) {
            return false;
        }

        if (this.piece.type !== PieceType.King) {
            return false;
        }

        const y: 8 | 1 = this.piece.color === ColorType.White ? 1 : 8;

        // true - left, false - right
        const xDirection: boolean = Board.xAxis.indexOf(this.piece.position.x) > Board.xAxis.indexOf(this.move.x);
        const x = xDirection ? "A" : "H"

        const rook: Piece | null = PieceFinder.find(this.pieces, x, y);
        if (rook === null || rook.type !== PieceType.Rook || rook.hasAlreadyMoved) {
            return false;
        }

        return this.isEmptyBetweenPositions(this.piece.position, rook.position);
    }

    public checkEnPassant(lastMove: MoveRegistry | null): boolean {
        const foundPiece: Piece | null = PieceFinder.find(this.pieces, this.move.x, this.piece.position.y)
        if (foundPiece === null) {
            return false;
        }

        if (this.piece.color === foundPiece.color) {
            return false;
        }

        if (foundPiece.type !== PieceType.Pawn) {
            return false;
        }

        if (lastMove !== null && foundPiece !== lastMove.piece) {
            return false;
        }

        return !(lastMove !== null && lastMove.from.x !== foundPiece.position.x && Math.abs(lastMove.from.y - foundPiece.position.y) !== 2);

    }

    public isEmptyBetweenPositions(position1: Position, position2: Position): boolean {
        const y = position1.y

        const start = Board.xAxis.indexOf(Board.xAxis.indexOf(position1.x) > Board.xAxis.indexOf(position2.x) ? position2.x : position1.x);
        const end = Board.xAxis.indexOf(Board.xAxis.indexOf(position1.x) > Board.xAxis.indexOf(position2.x) ? position1.x : position2.x);

        for (let i = start + 1; i < end; i++) {
            const piece = PieceFinder.find(this.pieces, Board.xAxis[i], y)
            if (piece !== null) {
                return false;
            }
        }

        return true
    }
}