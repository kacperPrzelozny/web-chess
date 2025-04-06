import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";
import {Move} from "../Moves/Move";
import {PieceType} from "./Utils/PieceType";

export class Bishop extends Piece
{
    constructor(color: ColorType, x: string, y: number) {
        super(color, x, y, PieceType.Bishop);
    }

    public static readonly NAME = "bishop";

    public static initialPositions: Array<{ color: ColorType; x: string; y: number }> = [
        {
            color: ColorType.White,
            x: 'F',
            y: 1
        },
        {
            color: ColorType.White,
            x: 'C',
            y: 1
        },
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
    ];

    public getPossibleMoves(): Array<Move> {
        return this.generateDiagonalMoves();
    }

    generatePieceName(): string {
        return super.generatePieceName() + Bishop.NAME;
    }
}