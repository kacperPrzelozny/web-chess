import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";
import {Move} from "../Moves/Move";

export class Queen extends Piece
{
    public static readonly NAME = "queen";

    public static initialPositions: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'D',
            y: 1
        },
        {
            color: ColorType.Black,
            x: 'D',
            y: 8
        }
    ];

    public getPossibleMoves(): Array<Move> {
        return this.generateRowAndColumnMoves().concat(this.generateDiagonalMoves());
    }

    generatePieceName(): string {
        return super.generatePieceName() + Queen.NAME;
    }
}