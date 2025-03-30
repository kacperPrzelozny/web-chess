import {Piece} from "../Pieces/Piece";
import {Board} from "../Board";
import {Move} from "./Move";
import {ColorType} from "../Pieces/Utils/Colors";

export class PossibleMoves
{
    board: Board;
    piece: Piece;

    constructor(board: Board, piece: Piece) {
        this.board = board;
        this.piece = piece;
    }

    checkPossibleMoves()
    {
        this.board.buildChessBoard()
        this.piece.icon?.addEventListener('click', () => {
            this.board.buildChessBoard()
        })

        let allowedMoves: Array<Move> = this.filterAllowedMoves(this.mapAllowedMoves(this.piece.getAllowedMoves()));

        for (let move of allowedMoves) {
            let squares = document.querySelectorAll('[data-x~="'+move.x+'"][data-y~="'+String(move.y)+'"]');
            let square = squares[0] ?? null;
            if (!square) {
                return;
            }

            let img = document.createElement("img");
            img.classList.add("move-img")
            img.src = "assets/images/moves/" + (move.isCapture ? "move-capture" : "move") + ".png";
            square.appendChild(img)

            img.addEventListener("click", () => {
                let piece = this.board.findPiece(move.x, move.y);
                if (move.isCapture && piece !== null) {
                    this.board.removePiece(piece);
                }
                this.piece.position.x = move.x;
                this.piece.position.y = move.y;
                this.board.currentTurn = this.board.currentTurn === ColorType.White ? ColorType.Black : ColorType.White;
                this.board.buildChessBoard()
            })
        }
    }

    mapAllowedMoves(allowedMoves: Array<Move>): Array<Move> {
        return allowedMoves.map((move: Move) => {
            let piece: Piece | null = this.board.findPiece(move.x, move.y);
            if (piece !== null && piece.color !== this.piece.color && move.canChangeCapture) {
                move.isCapture = true;
            }

            return move;
        })
    }

    filterAllowedMoves(allowedMoves: Array<Move>): Array<Move> {
        return allowedMoves.filter((move: Move) => {
            if (move.x === undefined || move.y === undefined || move.y > 8 || move.y < 1) {
                return false;
            }

            let piece: Piece | null = this.board.findPiece(move.x, move.y);

            if (!move.isCapture && piece) {
                return false;
            }
            else if (move.isCapture && !piece) {
                return false;
            }

            if (move.isCapture && piece !== null && this.piece.color === piece.color) {
                return false;
            }

            if (move.isInColumn && !this.checkMoveInColumn(move)) {
                return false
            }

            if (move.isInRow && !this.checkMoveInRow(move)) {
                return false;
            }

            if (move.isDiagonal && !this.checkDiagonal(move)) {
                return false;
            }

            return true
        })
    }

    private checkMoveInColumn(move: Move): boolean {
        let start:number;
        let end:number;

        if (this.piece.position.y > move.y) {
            start = move.y;
            end = this.piece.position.y;
        } else {
            start = this.piece.position.y
            end = move.y;
        }

        for (let i = start + 1; i < end; i++) {
            let piece = this.board.findPiece(move.x, i)
            if (piece) {
                return false;
            }
        }

        return true;
    }

    private checkMoveInRow(move: Move): boolean {
        let start:number;
        let end:number;

        if (Board.xAxis.indexOf(this.piece.position.x) > Board.xAxis.indexOf(move.x)) {
            start = Board.xAxis.indexOf(move.x);
            end = Board.xAxis.indexOf(this.piece.position.x);
        } else {
            start = Board.xAxis.indexOf(this.piece.position.x);
            end = Board.xAxis.indexOf(move.x);
        }

        for (let i = start + 1; i < end; i++) {
            let piece = this.board.findPiece(Board.xAxis[i], move.y)
            if (piece) {
                return false;
            }
        }

        return true;
    }

    private checkDiagonal(move: Move): boolean {
        let startX:number;

        let startY:number;
        let endY:number;

        if (Board.xAxis.indexOf(this.piece.position.x) > Board.xAxis.indexOf(move.x)) {
            startX = Board.xAxis.indexOf(move.x);
        } else {
            startX = Board.xAxis.indexOf(this.piece.position.x);
        }

        if (this.piece.position.y > move.y) {
            startY = move.y;
            endY = this.piece.position.y;
        } else {
            startY = this.piece.position.y;
            endY = move.y;
        }

        for (let i = 1; i < endY - startY; i++) {
            let piece = this.board.findPiece(Board.xAxis[startX + i], startY + i)
            if (piece !== null) {
                return false;
            }
        }
        return true;
    }
}