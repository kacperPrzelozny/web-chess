import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";

export class King extends Piece
{
    public static readonly NAME = "king";

    public static initialWhitePosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'E',
            y: 1
        }
    ];

    public static initialBlackPosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.Black,
            x: 'E',
            y: 8
        }
    ]

    allowedMoves(): Array<string> {
        return [""];
    }

    generatePieceName(): string {
        return super.generatePieceName() + King.NAME;
    }
}