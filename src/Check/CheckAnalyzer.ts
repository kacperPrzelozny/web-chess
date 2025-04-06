import {ColorType} from "../Pieces/Utils/Colors";
import {Piece} from "../Pieces/Piece";
import {PieceFinder} from "../Pieces/Utils/PieceFinder";
import {PieceType} from "../Pieces/Utils/PieceType";
import {King} from "../Pieces/King";
import {Board} from "../Board";
import {Move} from "../Moves/Move";
import {MoveManager} from "../Moves/MoveManager";
import {Position} from "../Pieces/Utils/Position";

export class CheckAnalyzer
{
    constructor(public attackedKingColor: ColorType, public pieces: Array<Piece>) {
    }

    // true - check, false - not check
    public analyze(): boolean {
        const attackedKing = this.getAttackedKing();
        return !(this.isSafeInRow(attackedKing)
            && this.isSafeInColumn(attackedKing)
            && this.isSafeDiagonally(attackedKing)
            && this.isSafeInLShapedMove(attackedKing)
            && this.isSafeFromPawns(attackedKing)
            && this.isSafeFromKing(attackedKing)
        );
    }

    public analyzeNextMove(piece: Piece, move: Move): boolean {
        const moveManager = new MoveManager(this.pieces);
        const startPosition = new Position(piece.position.x, piece.position.y);
        const capturedPiece = PieceFinder.find(this.pieces, move.x, move.y);
        const hasAlreadyMoved = piece.hasAlreadyMoved

        moveManager.moveAndAnalyzeCheck(piece, move);

        const isCheck = this.analyze();

        moveManager.undoMove(piece, startPosition, capturedPiece, hasAlreadyMoved)

        return isCheck;
    }

    private getAttackedKing(): King {
        const kings =  this.pieces.filter((piece: Piece) => {
            return piece.color === this.attackedKingColor && piece.type === PieceType.King;
        })

        return kings[0];
    }

    private isSafeInRow(king: King) {
        return this.analyzeInDirection(king, 1, 0) && this.analyzeInDirection(king, -1, 0);
    }

    private isSafeInColumn(king: King) {
        return this.analyzeInDirection(king, 0, 1) && this.analyzeInDirection(king, 0, -1);
    }

    private isSafeDiagonally(king: King) {
        return this.analyzeInDirection(king, 1, 1) && this.analyzeInDirection(king, 1, -1) && this.analyzeInDirection(king, -1, 1) && this.analyzeInDirection(king, -1, -1);
    }

    private isSafeInLShapedMove(king: King) {
        return this.analyzePositionInLShape(king, 2, 1)
            && this.analyzePositionInLShape(king, 2, -1)
            && this.analyzePositionInLShape(king, -2, 1)
            && this.analyzePositionInLShape(king, -2, -1)
            && this.analyzePositionInLShape(king, 1, 2)
            && this.analyzePositionInLShape(king, -1, 2)
            && this.analyzePositionInLShape(king, 1, -2)
            && this.analyzePositionInLShape(king, -1, -2)
    }

    private isSafeFromPawns(king: King): boolean {
        return this.analyzePawnPosition(king, 1) && this.analyzePawnPosition(king, -1)
    }

    private isSafeFromKing(king: King): boolean {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }

                let piece = PieceFinder.find(this.pieces, Board.xAxis[Board.xAxis.indexOf(king.position.x) + i], king.position.y + j)
                if (piece === null) {
                    continue;
                }

                if (piece.type === PieceType.King && piece.color === (king.color === ColorType.White ? ColorType.Black : ColorType.White)) {
                    return false;
                }
            }
        }

        return true;
    }

    private analyzeInDirection(king: King, xDifference: -1 | 0 | 1, yDifference = -1 | 0 | 1): boolean {
        let isSafe: boolean = true;
        if (xDifference === 0 && yDifference === 0) {
            throw new Error("Invalid directions")
        }

        let x: number = xDifference;
        let y: number = yDifference;

        while (true) {
            const piece = PieceFinder.find(this.pieces, Board.xAxis[Board.xAxis.indexOf(king.position.x) + x], king.position.y + y);
            if (piece === null) {
                x += xDifference;
                y += yDifference;
                if (Board.xAxis[Board.xAxis.indexOf(king.position.x) + x] === undefined) {
                    break;
                }

                if (king.position.y + y < 1 || king.position.y + y > 8) {
                    break;
                }

                continue;
            }

            if (piece.color === king.color) {
                break;
            }

            if ((xDifference === 0 || yDifference === 0) && piece.canMoveInRowAndColumn()) {
                isSafe = false;
            }

            if (xDifference !== 0 && yDifference !== 0 && piece.canMoveDiagonally()) {
                isSafe = false;
            }

            break;
        }

        return isSafe;
    }

    private analyzePositionInLShape(king: King, xDifference: number, yDifference: number): boolean {
        const piece = PieceFinder.find(this.pieces, Board.xAxis[Board.xAxis.indexOf(king.position.x) + xDifference], king.position.y + yDifference);

        if (piece === null) {
            return true
        }

        if (piece.color === king.color) {
            return true;
        }

        return !piece.canMoveInLShape();
    }

    private analyzePawnPosition(king: King, xDifference: -1 | 1): boolean {
        const yDifference = king.color === ColorType.White ? 1 : -1
        const piece = PieceFinder.find(this.pieces, Board.xAxis[Board.xAxis.indexOf(king.position.x) + xDifference], king.position.y + yDifference);

        if (piece === null) {
            return true
        }

        if (piece.color === king.color) {
            return true;
        }

        return piece.type !== PieceType.Pawn;
    }
}