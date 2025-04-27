import {PieceType} from "../Enums/PieceType";
import {Piece} from "../Pieces/Piece";
import {Pawn} from "../Pieces/Pawn";
import {ColorType} from "../Enums/Colors";
import {Rook} from "../Pieces/Rook";
import {Bishop} from "../Pieces/Bishop";
import {Knight} from "../Pieces/Knight";
import {Queen} from "../Pieces/Queen";
import {King} from "../Pieces/King";
import {initialPositions} from "../InitialPositions/InitialPositions";

export class PieceFactory {
    static generateInitialPositions(): Array<Piece> {
        let pieces: Array<Piece> = [];

        for (let initialPosition of initialPositions) {
            pieces.push(this.createPiece(initialPosition.pieceType, initialPosition.color, initialPosition.x, initialPosition.y));
        }
        return pieces;
    }


    static createPiece(type: PieceType, color: ColorType, x: string, y: number): Piece {
        let piece: Piece;

        switch (type) {
            case PieceType.Pawn:
                piece = new Pawn(color, x, y);
                break;
            case PieceType.Bishop:
                piece = new Bishop(color, x, y);
                break;
            case PieceType.Knight:
                piece = new Knight(color, x, y);
                break;
            case PieceType.Rook:
                piece = new Rook(color, x, y);
                break;
            case PieceType.Queen:
                piece = new Queen(color, x, y);
                break;
            case PieceType.King:
                piece = new King(color, x, y);
                break;
            default:
                throw new Error("Invalid type " + type);
        }

        return piece;
    }
}