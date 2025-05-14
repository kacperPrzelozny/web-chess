import {Piece} from "./Piece";
import {ColorType} from "../Enums/Colors";
import {Move} from "../Moves/Move";
import {Board} from "../Board/Board";
import {PieceType} from "../Enums/PieceType";

export class Knight extends Piece
{
    constructor(color: ColorType, x: string, y: number) {
        super(color, x, y, PieceType.Knight);
    }

    public static readonly NAME = "knight";

    public getPossibleMoves(): Array<Move> {
        let moves: Array<Move> = [];

        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 2], this.position.y + 1, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 2], this.position.y - 1, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 2], this.position.y + 1, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 2], this.position.y - 1, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y + 2, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y - 2, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y + 2, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y - 2, false, true));

        return moves;
    }

    generatePieceName(): string {
        return super.generatePieceName() + Knight.NAME;
    }

    generateScoreboardNotation(): string {
        return "N" + super.generateScoreboardNotation();
    }
}