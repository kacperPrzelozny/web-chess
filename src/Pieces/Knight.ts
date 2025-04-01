import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";
import {Move} from "../Moves/Move";
import {Board} from "../Board";

export class Knight extends Piece
{
    public static readonly NAME = "knight";

    public static initialPositions: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'B',
            y: 1
        },
        {
            color: ColorType.White,
            x: 'G',
            y: 1
        },
        {
            color: ColorType.Black,
            x: 'B',
            y: 8
        },
        {
            color: ColorType.Black,
            x: 'G',
            y: 8
        }
    ];

    public getPossibleMoves(): Array<Move> {
        let moves: Array<Move> = [];

        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 2], this.position.y + 1, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 2], this.position.y - 1, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 2], this.position.y + 1, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 2], this.position.y - 1, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y + 2, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y - 2, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y + 2, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y - 2, false, true));

        return moves;
    }

    generatePieceName(): string {
        return super.generatePieceName() + Knight.NAME;
    }
}