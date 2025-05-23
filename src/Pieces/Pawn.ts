import {Piece} from "./Piece";
import {ColorType} from "../Enums/Colors";
import {Move} from "../Moves/Move";
import {Board} from "../Board/Board";
import {PieceType} from "../Enums/PieceType";

export class Pawn extends Piece
{
    constructor(color: ColorType, x: string, y: number) {
        super(color, x, y, PieceType.Pawn);
    }

    public static readonly NAME = "pawn";

    public static canPromoteTo: Array<PieceType> = [
        PieceType.Knight,
        PieceType.Bishop,
        PieceType.Rook,
        PieceType.Queen,
    ];

    public getPossibleMoves(): Array<Move> {
        let moves = [];

        let direction: number = this.color === ColorType.White ? 1 : -1

        if ((direction == 1 && this.position.y === 2) || (direction == -1 && this.position.y === 7)) {
            let doubleMove = new Move(
                this.position.x,
                this.position.y + (2 * direction),
                false,
                false,
                false,
                false,
                true,
                false
            );
            moves.push(doubleMove);
        }

        let defaultMove = new Move(
            this.position.x,
            this.position.y + direction,
            false,
            false,
            false,
            false,
            true,
            false
        )
        moves.push(defaultMove);

        let captureMoveLeft = new Move(
            Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1],
            this.position.y + direction,
            true,
            false,
            true,
            false,
            false,
            false,
        )
        let captureMoveRight = new Move(
            Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1],
            this.position.y + direction,
            true,
            false,
            true,
            false,
            false,
            false,
        )

        moves.push(captureMoveLeft);
        moves.push(captureMoveRight);

        if ((direction == 1 && this.position.y === 5) || (direction == -1 && this.position.y === 4)) {
            let enPassantMoveLeft = new Move(
                Board.xAxis[Board.xAxis.indexOf(this.position.x) - 1],
                this.position.y + direction,
                true,
                false,
                true,
                false,
                false,
                false,
                false,
                true
            )
            let enPassantMoveRight = new Move(
                Board.xAxis[Board.xAxis.indexOf(this.position.x) + 1],
                this.position.y + direction,
                true,
                false,
                true,
                false,
                false,
                false,
                false,
                true
            )

            moves.push(enPassantMoveLeft);
            moves.push(enPassantMoveRight);
        }

        return moves;
    }

    generatePieceName(): string {
        return super.generatePieceName() + Pawn.NAME;
    }
}