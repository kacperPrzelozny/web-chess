import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";

export class Queen extends Piece
{
    public static readonly NAME = "queen";

    public static initialWhitePosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'D',
            y: 1
        }
    ];

    public static initialBlackPosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.Black,
            x: 'D',
            y: 8
        }
    ]

    allowedMoves(): Array<string> {
        return [""];
    }

    generatePieceName(): string {
        return super.generatePieceName() + Queen.NAME;
    }
}