import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";

export class Pawn extends Piece
{
    public static readonly NAME = "pawn";

    public static initialWhitePosition : Array<{color: ColorType, x: string, y: number}> = [
        {
            color: ColorType.White,
            x: 'A',
            y: 2
        },
        {
            color: ColorType.White,
            x: 'B',
            y: 2
        },
        {
            color: ColorType.White,
            x: 'C',
            y: 2
        },
        {
            color: ColorType.White,
            x: 'D',
            y: 2
        },
        {
            color: ColorType.White,
            x: 'E',
            y: 2
        },
        {
            color: ColorType.White,
            x: 'F',
            y: 2
        },
        {
            color: ColorType.White,
            x: 'G',
            y: 2
        },
        {
            color: ColorType.White,
            x: 'H',
            y: 2
        }
    ];

    public static initialBlackPosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.Black,
            x: 'A',
            y: 7
        },
        {
            color: ColorType.Black,
            x: 'B',
            y: 7
        },
        {
            color: ColorType.Black,
            x: 'C',
            y: 7
        },
        {
            color: ColorType.Black,
            x: 'D',
            y: 7
        },
        {
            color: ColorType.Black,
            x: 'E',
            y: 7
        },
        {
            color: ColorType.Black,
            x: 'F',
            y: 7
        },
        {
            color: ColorType.Black,
            x: 'G',
            y: 7
        },
        {
            color: ColorType.Black,
            x: 'H',
            y: 7
        }
    ]

    allowedMoves(): Array<string> {
        return [""];
    }

    generatePieceName(): string {
        return super.generatePieceName() + Pawn.NAME;
    }
}