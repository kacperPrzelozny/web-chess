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

    public getPossibleMoves(): Array<Move> {
        return this.generateRowAndColumnMoves();
    }

    generatePieceName(): string {
        return super.generatePieceName() + Rook.NAME;
    }
}