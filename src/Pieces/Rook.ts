import {Piece} from "./Piece";
import {ColorType} from "../Enums/Colors";
import {Move} from "../Moves/Move";
import {PieceType} from "../Enums/PieceType";

export class Rook extends Piece
{
    constructor(color: ColorType, x: string, y: number) {
        super(color, x, y, PieceType.Rook);
    }

    public static readonly NAME = "rook";

    public static initialPositions: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'A',
            y: 1
        },
        {
            color: ColorType.White,
            x: 'H',
            y: 1
        },
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
    ];

    public getPossibleMoves(): Array<Move> {
        return this.generateRowAndColumnMoves();
    }

    generatePieceName(): string {
        return super.generatePieceName() + Rook.NAME;
    }
}