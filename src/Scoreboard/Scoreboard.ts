import {ScoreboardDrawer} from "./ScoreboardDrawer";
import {Piece} from "../Pieces/Piece";
import {Move} from "../Moves/Move";
import {PieceType} from "../Enums/PieceType";
import {ColorType} from "../Enums/Colors";

export class Scoreboard
{
    scoreboardDrawer: ScoreboardDrawer
    notation: Array<{moveNumber: number, whiteMove: string, blackMove: string}> = []

    constructor() {
        this.scoreboardDrawer = new ScoreboardDrawer();
    }

    updateScoreboard(move: Move, piece: Piece, promoteTo: null | PieceType) {
        let moveNotation: string = this.getMoveNotation(move, piece, promoteTo)
        const lastMoveNotation = this.notation[this.notation.length - 1]
        if (piece.color === ColorType.Black) {
            lastMoveNotation.blackMove = moveNotation
        } else {
            this.notation.push({
                moveNumber: this.notation.length + 1,
                whiteMove: moveNotation,
                blackMove: "",
            })
        }

        this.scoreboardDrawer.drawTable(this.notation)
    }

    private getMoveNotation(move: Move, piece: Piece, promoteTo: null | PieceType) {
        if (move.isCastling && move.isSmallCastling) {
            return 'O-O'
        }

        if (move.isCastling && !move.isSmallCastling) {
            return 'O-O-O'
        }

        let moveNotation = piece.generateScoreboardNotation()

        if (promoteTo !== null) {
            moveNotation += '=' + promoteTo
        }

        return moveNotation
    }
}