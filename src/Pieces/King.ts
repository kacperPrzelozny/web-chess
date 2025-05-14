import {Piece} from "./Piece";
import {ColorType} from "../Enums/Colors";
import {Move} from "../Moves/Move";
import {Board} from "../Board/Board";
import {PieceType} from "../Enums/PieceType";

export class King extends Piece
{
    constructor(color: ColorType, x: string, y: number) {
        super(color, x, y, PieceType.King);
    }

    public static readonly NAME = "king";

    public getPossibleMoves(): Array<Move> {
        let moves: Array<Move> = [];

        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y, false, false, false, true, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y + 1, false, false, true, false, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1], this.position.y - 1, false, false, true, false, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x)], this.position.y + 1, false, false, false, false, true, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x)], this.position.y - 1, false, false, false, false, true, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y, false, false, false, true, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y + 1, false, false, true, true, false, true));
        moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1], this.position.y - 1, false, false, true, true, false, true));

        if (!this.hasAlreadyMoved) {
            const smallCastle = new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) + 2], this.position.y, false, false, false, true, false, true, true)
            smallCastle.isSmallCastling = true;
            moves.push(new Move(Board.xAxis[Board.xAxis.indexOf(this.position.x) - 2], this.position.y, false, false, false, true, false, true, true));
        }

        return moves;
    }

    generatePieceName(): string {
        return super.generatePieceName() + King.NAME;
    }

    generateScoreboardNotation(): string {
        return "K" + super.generateScoreboardNotation();
    }
}