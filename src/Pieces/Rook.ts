import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";
import {Move} from "../Moves/Move";

export class Rook extends Piece
{
    public static readonly NAME = "rook";

    public static initialWhitePosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'A',
            y: 1
        },
        {
            color: ColorType.White,
            x: 'H',
            y: 1
        }
    ];

    public static initialBlackPosition: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.Black,
            x: 'A',
            y: 8
        },
        {
            color: ColorType.Black,
            x: 'H',
            y: 8
        }
    ]

    getAllowedMoves(): Array<Move> {
        return this.generateRowAndColumnMoves();
    }

    generatePieceName(): string {
        return super.generatePieceName() + Rook.NAME;
    }
}