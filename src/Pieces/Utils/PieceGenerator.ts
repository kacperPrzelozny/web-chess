import {ColorType} from "./Colors";
import {PieceType} from "./PieceType";
import {Pawn} from "../Pawn";
import {Piece} from "../Piece";
import {Bishop} from "../Bishop";
import {Knight} from "../Knight";
import {Rook} from "../Rook";
import {Queen} from "../Queen";
import {King} from "../King";

export class PieceGenerator
{
    public generateInitialPositions(): Array<Piece>
    {
        let pieces: Array<Piece> = [];

        pieces.push(...this.generatePawns());
        pieces.push(...this.generateBishops());
        pieces.push(...this.generateKnights());
        pieces.push(...this.generateRooks());
        pieces.push(...this.generateKings());
        pieces.push(...this.generateQueens());

        return pieces;
    }

    private generatePawns(): Array<Pawn> {
        return this.generatePiecesObjects(Pawn.initialPositions, PieceType.Pawn)
    }

    private generateBishops(): Array<Bishop> {
        return this.generatePiecesObjects(Bishop.initialPositions, PieceType.Bishop)
    }

    private generateKnights(): Array<Knight> {
        return this.generatePiecesObjects(Knight.initialPositions, PieceType.Knight)
    }

    private generateRooks(): Array<Rook> {
        return this.generatePiecesObjects(Rook.initialPositions, PieceType.Rook)
    }

    private generateQueens(): Array<Queen> {
        return this.generatePiecesObjects(Queen.initialPositions, PieceType.Queen)
    }

    private generateKings(): Array<King> {
        return this.generatePiecesObjects(King.initialPositions, PieceType.King)
    }

    private generatePiecesObjects(initialPositions: Array<{color: ColorType, x: string, y: number}>, type: PieceType): Array<Piece> {
        let pieces: Array<Piece> = [];
        for (let object of initialPositions) {
            let piece: Piece;

            switch (type) {
                case PieceType.Pawn:
                    piece = new Pawn(object.color, object.x, object.y, type);
                    break;
                case PieceType.Bishop:
                    piece = new Bishop(object.color, object.x, object.y, type);
                    break;
                case PieceType.Knight:
                    piece = new Knight(object.color, object.x, object.y, type);
                    break;
                case PieceType.Rook:
                    piece = new Rook(object.color, object.x, object.y, type);
                    break;
                case PieceType.Queen:
                    piece = new Queen(object.color, object.x, object.y, type);
                    break;
                case PieceType.King:
                    piece = new King(object.color, object.x, object.y, type);
                    break;
                default:
                    throw new Error("Invalid type " + type);
            }

            pieces.push(piece);
        }

        return pieces;
    }
}