import {ColorType} from "./Colors";
import {PieceType} from "./PieceType";
import {Pawn} from "../Pawn";
import {Piece} from "../Piece";
import {Bishop} from "../Bishop";
import {Knight} from "../Knight";
import {Rook} from "../Rook";
import {Queen} from "../Queen";
import {King} from "../King";
import {Board} from "../../Board";

export class PieceGenerator
{
    public board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    public generate(): void
    {
        this.generatePawns();
        this.generateBishops();
        this.generateKnights();
        this.generateRooks();
        this.generateQueens();
        this.generateKings();
    }

    private generatePieces(blacks: Array<{color: ColorType, x: string, y: number}>, whites: Array<{color: ColorType, x: string, y: number}>, type: PieceType): void {
        let blackPieces: Array<Pawn> = this.generatePiecesObjects(blacks, type);
        let whitePieces: Array<Pawn> = this.generatePiecesObjects(whites, type);

        this.board.blackPieces.push(...blackPieces)
        this.board.whitePieces.push(...whitePieces);
    }

    private generatePawns(): void {
        this.generatePieces(
            Pawn.initialBlackPosition,
            Pawn.initialWhitePosition,
            PieceType.Pawn
        )
    }

    private generateBishops(): void {
        this.generatePieces(
            Bishop.initialBlackPosition,
            Bishop.initialWhitePosition,
            PieceType.Bishop
        )
    }

    private generateKnights(): void {
        this.generatePieces(
            Knight.initialBlackPosition,
            Knight.initialWhitePosition,
            PieceType.Knight
        )
    }

    private generateRooks(): void {
        this.generatePieces(
            Rook.initialBlackPosition,
            Rook.initialWhitePosition,
            PieceType.Rook
        )
    }

    private generateQueens(): void {
        this.generatePieces(
            Queen.initialBlackPosition,
            Queen.initialWhitePosition,
            PieceType.Queen
        )
    }

    private generateKings(): void {
        this.generatePieces(
            King.initialBlackPosition,
            King.initialWhitePosition,
            PieceType.King
        )
    }

    private generatePiecesObjects(initialPositions: Array<{color: ColorType, x: string, y: number}>, type: PieceType): Array<Piece> {
        let pieces: Array<Piece> = [];
        for (let object of initialPositions) {
            let piece: Piece;

            switch (type) {
                case PieceType.Pawn:
                    piece = new Pawn(object.color, object.x, object.y);
                    break;
                case PieceType.Bishop:
                    piece = new Bishop(object.color, object.x, object.y);
                    break;
                case PieceType.Knight:
                    piece = new Knight(object.color, object.x, object.y);
                    break;
                case PieceType.Rook:
                    piece = new Rook(object.color, object.x, object.y);
                    break;
                case PieceType.Queen:
                    piece = new Queen(object.color, object.x, object.y);
                    break;
                case PieceType.King:
                    piece = new King(object.color, object.x, object.y);
                    break;
                default:
                    throw new Error("Invalid type " + type);
            }

            pieces.push(piece);
        }

        return pieces;
    }
}