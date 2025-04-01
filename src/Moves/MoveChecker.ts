import {Move} from "./Move";
import {Board} from "../Board";
import {Piece} from "../Pieces/Piece";
import {PieceFinder} from "../Pieces/PieceFinder";

export class MoveChecker
{
    constructor(public pieces: Array<Piece>, public piece: Piece, public move: Move) {
    }

    public checkMove()
    {
        if (this.move.x === undefined || this.move.y === undefined || this.move.y > 8 || this.move.y < 1) {
            return false;
        }

        let foundPiece: Piece | null = PieceFinder.find(this.pieces, this.move.x, this.move.y);

        if (!this.move.isCapture && foundPiece) {
            return false;
        }
        else if (this.move.isCapture && !foundPiece) {
            return false;
        }

        if (this.move.isCapture && foundPiece !== null && this.piece.color === foundPiece.color) {
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
        let startX:number;

        let startY:number;
        let endY:number;

        if (Board.xAxis.indexOf(this.piece.position.x) > Board.xAxis.indexOf(this.move.x)) {
            startX = Board.xAxis.indexOf(this.move.x);
        } else {
            startX = Board.xAxis.indexOf(this.piece.position.x);
        }

        if (this.piece.position.y > this.move.y) {
            startY = this.move.y;
            endY = this.piece.position.y;
        } else {
            startY = this.piece.position.y;
            endY = this.move.y;
        }

        for (let i = 1; i < endY - startY; i++) {
            let piece = PieceFinder.find(this.pieces, Board.xAxis[startX + i], startY + i)
            if (piece !== null) {
                return false;
            }
        }
        return true;
    }
}