import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";
import {Move} from "../Moves/Move";

export class Bishop extends Piece
{
    public static readonly NAME = "bishop";

    public static initialWhitePosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'F',
            y: 1
        },
        {
            color: ColorType.White,
            x: 'C',
            y: 1
        }
    ];

    public static initialBlackPosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.Black,
            x: 'F',
            y: 8
        },
        {
            color: ColorType.Black,
            x: 'C',
            y: 8
        }
    ]

    getAllowedMoves(): Array<Move> {
        return this.generateDiagonalMoves();
    }

    generatePieceName(): string {
        return super.generatePieceName() + Bishop.NAME;
    }
}