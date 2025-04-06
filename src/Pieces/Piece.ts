import {Position} from "./Utils/Position";
import {ColorType} from "./Utils/Colors";
import {Move} from "../Moves/Move";
import {Board} from "../Board";
import {PieceType} from "./Utils/PieceType";

export abstract class Piece
{
    position: Position;
    color: ColorType;
    icon: HTMLElement | null = null;
    hasAlreadyMoved: boolean = false;
    type: PieceType;

    protected constructor(color: ColorType, x: string, y: number, pieceType: PieceType) {
        this.color = color;
        this.position = new Position(x, y)
        this.type = pieceType
    }

    public getPossibleMoves(): Array<Move> {
        return [];
    };

    protected generateRowAndColumnMoves(): Array<Move> {
        let moves: Array<Move> = []
        for (let x of Board.xAxis) {
            for (let y of Board.yAxis) {
                if (x === this.position.x && y === this.position.y) {
                    continue;
                }

                if (x === this.position.x && y !== this.position.y) {
                    let move: Move = new Move(x, y, false, false, false, false, true);
                    moves.push(move);
                }

                if (x !== this.position.x && y === this.position.y) {
                    let move: Move = new Move(x, y, false, false, false, true, false);
                    moves.push(move);
                }
            }
        }

        return moves;
    }

    protected generateDiagonalMoves(): Array<Move> {
        let moves: Array<Move> = [];

        let rightUpFinished = false;
        let leftUpFinished = false;
        let rightDownFinished = false;
        let leftDownFinished = false;

        let i = 1;
        while (!(rightUpFinished && rightDownFinished && leftUpFinished && leftDownFinished)) {
            // right up
            let x = Board.xAxis[Board.xAxis.indexOf(this.position.x) + i];
            let y = Board.yAxis[Board.yAxis.indexOf(this.position.y) - i];

            if (x !== undefined && y !== undefined) {
                moves.push(new Move(x, y, false, false, true));
            } else {
                rightUpFinished = true;
            }

            // right down
            x = Board.xAxis[Board.xAxis.indexOf(this.position.x) + i];
            y = Board.yAxis[Board.yAxis.indexOf(this.position.y) + i];
            if (x !== undefined && y !== undefined) {
                moves.push(new Move(x, y, false, false, true));
            } else {
                rightDownFinished = true;
            }

            // left up
            x = Board.xAxis[Board.xAxis.indexOf(this.position.x) - i];
            y = Board.yAxis[Board.yAxis.indexOf(this.position.y) - i];
            if (x !== undefined && y !== undefined) {
                moves.push(new Move(x, y, false, false, true));
            } else {
                leftUpFinished = true;
            }

            // left down
            x = Board.xAxis[Board.xAxis.indexOf(this.position.x) - i];
            y = Board.yAxis[Board.yAxis.indexOf(this.position.y) + i];
            if (x !== undefined && y !== undefined) {
                moves.push(new Move(x, y, false, false, true));
            } else {
                leftDownFinished = true;
            }

            i++
        }

        return moves;
    }

    public generatePieceName(): string {
        return this.color + "_";
    }

    public canMoveInRowAndColumn(): boolean {
        return this.type === PieceType.Rook || this.type === PieceType.Queen;
    }

    public canMoveDiagonally(): boolean {
        return this.type === PieceType.Bishop || this.type === PieceType.Queen;
    }

    public canMoveInLShape(): boolean {
        return this.type === PieceType.Knight;
    }
}