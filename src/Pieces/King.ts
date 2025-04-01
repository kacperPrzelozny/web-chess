import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";
import {Move} from "../Moves/Move";
import {Board} from "../Board";

export class King extends Piece
{
    public static readonly NAME = "king";

    public static initialPositions: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'E',
            y: 1
        },
        {
            color: ColorType.Black,
            x: 'E',
            y: 8
        }
    ];

    public getPossibleMoves(): Array<Move> {
        let moves: Array<Move> = [];

        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y, false, false, false, true, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y + 1, false, false, true, false, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y - 1, false, false, true, false, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x)], this.position.y + 1, false, false, false, false, true, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x)], this.position.y - 1, false, false, false, false, true, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y, false, false, false, true, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y + 1, false, false, true, true, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y - 1, false, false, true, true, false, true));

        if (!this.hasAlreadyMoved) {
            moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 2], this.position.y, false, false, false, true, false, true, true));
            moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 2], this.position.y, false, false, false, true, false, true, true));
        }

        return moves;
    }

    generatePieceName(): string {
        return super.generatePieceName() + King.NAME;
    }
}