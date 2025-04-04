import {ColorType} from "../Pieces/Utils/Colors";
import {Piece} from "../Pieces/Piece";
import {Move} from "../Moves/Move";
import {PieceFinder} from "../Pieces/PieceFinder";
import {PieceType} from "../Pieces/Utils/PieceType";
import {MoveManager} from "../Moves/MoveManager";
import {MoveRegistry} from "../Moves/History/MoveRegistry";

export class CheckAnalyzer
{
    private moveManager: MoveManager;

    constructor(public attackedKingColor: ColorType, public pieces: Array<Piece>) {
        this.moveManager = new MoveManager(this.pieces);
    }

    public analyze(lastMove: MoveRegistry | null, attackedKingColor: ColorType | null): boolean {
        const attackingPieces = this.getPiecesAttackingKing()
        let moves: Array<Move> = []

        for (let piece of attackingPieces) {
            let possibleMoves: Array<Move> = this.moveManager.getMoves(piece, lastMove)
            moves.push(...possibleMoves);
        }

        return this.filterMovesAttackingKing(moves).length > 0;
    }

    private getPiecesAttackingKing(): Array<Piece> {
        return this.pieces.filter((piece: Piece) => {
            return piece.color !== this.attackedKingColor;
        })
    }

    private filterMovesAttackingKing(moves: Array<Move>) {
        return moves.filter((move: Move) => {
            if (!move.isCapture) {
                return false;
            }

            const foundPiece = PieceFinder.find(this.pieces, move.x, move.y);
            if (foundPiece === null) {
                return false;
            }

            return !(foundPiece.color !== this.attackedKingColor || foundPiece.type !== PieceType.King);
        });
    }
}