import {Piece} from "./Piece";
import {ColorType} from "../Enums/Colors";
import {Move} from "../Moves/Move";
import {PieceType} from "../Enums/PieceType";

export class Queen extends Piece
{
    public static readonly NAME = "queen";

    constructor(color: ColorType, x: string, y: number) {
        super(color, x, y, PieceType.Queen);
    }

    public getPossibleMoves(): Array<Move> {
        return this.generateRowAndColumnMoves().concat(this.generateDiagonalMoves());
    }

    generatePieceName(): string {
        return super.generatePieceName() + Queen.NAME;
    }

    generateScoreboardNotation(): string {
        return "Q" + super.generateScoreboardNotation();
    }
}