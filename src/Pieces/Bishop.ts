import {Piece} from "./Piece";
import {ColorType} from "../Enums/Colors";
import {Move} from "../Moves/Move";
import {PieceType} from "../Enums/PieceType";

export class Bishop extends Piece
{
    constructor(color: ColorType, x: string, y: number) {
        super(color, x, y, PieceType.Bishop);
    }

    public static readonly NAME = "bishop";

    public getPossibleMoves(): Array<Move> {
        return this.generateDiagonalMoves();
    }

    generatePieceName(): string {
        return super.generatePieceName() + Bishop.NAME;
    }
}