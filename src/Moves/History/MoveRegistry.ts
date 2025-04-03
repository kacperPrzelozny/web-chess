import {Piece} from "../../Pieces/Piece";
import {Move} from "../Move";
import {Position} from "../../Pieces/Utils/Position";

export class MoveRegistry {
    constructor(public readonly piece: Piece, public readonly move: Move, public from: Position) {}
}