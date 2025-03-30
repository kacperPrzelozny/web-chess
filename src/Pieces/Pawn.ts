import {Piece} from "./Piece";
import {ColorType} from "./Utils/Colors";
import {Move} from "../Moves/Move";
import {Board} from "../Board";

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

    getAllowedMoves(): Array<Move> {
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

        return moves;
    }

    generatePieceName(): string {
        return super.generatePieceName() + Pawn.NAME;
    }
}