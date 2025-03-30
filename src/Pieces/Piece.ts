import {Position} from "./Utils/Position";
import {ColorType} from "./Utils/Colors";
import {PieceType} from "./Utils/PieceType";
import {Pawn} from "./Pawn";
import {Bishop} from "./Bishop";
import {Knight} from "./Knight";
import {King} from "./King";
import {Queen} from "./Queen";
import {Rook} from "./Rook";

export abstract class Piece
{
    position: Position;
    color: ColorType;

    constructor(color: ColorType, x: string, y: number) {
        this.color = color;
        this.position = new Position(x, y)
    }

    abstract allowedMoves(): Array<string>;

    public generatePieceName(): string {
        return this.color + "_";
    }
}