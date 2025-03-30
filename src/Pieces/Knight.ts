import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";

export class Knight extends Piece
{
    public static readonly NAME = "knight";

    public static initialWhitePosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'B',
            y: 1
        },
        {
            color: ColorType.White,
            x: 'G',
            y: 1
        }
    ];

    public static initialBlackPosition: Array<{ color: ColorType; x: string; y: number }> = [
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
    ]

    allowedMoves(): Array<string> {
        return [""];
    }

    generatePieceName(): string {
        return super.generatePieceName() + Knight.NAME;
    }
}