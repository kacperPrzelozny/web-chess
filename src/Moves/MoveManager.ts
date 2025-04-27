import {Piece} from "../Pieces/Piece";
import {MoveGenerator} from "./MoveGenerator";
import {Move} from "./Move";
import {MoveChecker} from "./MoveChecker";
import {ColorType} from "../Enums/Colors";
import {PieceFinder} from "../Pieces/Utils/PieceFinder";
import {Board} from "../Board";
import {MoveRegistry} from "./History/MoveRegistry";
import {CheckAnalyzer} from "../Rules/CheckAnalyzer";
import {Position} from "../Pieces/Utils/Position";
import {PossibleMovesAnalyzer} from "../Rules/PossibleMovesAnalyzer";
import {SituationType} from "../Enums/SituationType";

export class MoveManager
{
    private readonly pieces: Array<Piece>;
    private moveGenerator: MoveGenerator;

    constructor(pieces: Array<Piece>) {
        this.pieces = pieces;

        this.moveGenerator = new MoveGenerator(this.pieces);
    }

    public getMoves(piece: Piece, lastMove: MoveRegistry | null): Array<Move> {
        let moves = this.moveGenerator.getAllPossibleMoves(piece)
        return this.filterPossibleMoves(moves, piece, lastMove);
    }

    public filterPossibleMoves(possibleMoves: Array<Move>, piece: Piece, lastMove: MoveRegistry | null): Array<Move> {
        return possibleMoves.filter((move: Move) => {
            let moveChecker: MoveChecker = new MoveChecker(this.pieces, piece, move);

            return moveChecker.checkMove(lastMove)
        })
    }

    public move(piece: Piece, move: Move) {
        let capturedPiece = PieceFinder.find(this.pieces, move.x, move.y);
        if (move.isCapture && capturedPiece !== null) {
            this.removePiece(capturedPiece);
        }

        if (move.isCastling) {
            this.moveRookInCastle(piece, move);
        }

        if (move.isEnPassant) {
            const foundPiece: Piece | null = PieceFinder.find(this.pieces, move.x, piece.position.y)
            if (foundPiece !== null) {
                this.removePiece(foundPiece);
            }
        }

        piece.position.x = move.x;
        piece.position.y = move.y;
        piece.hasAlreadyMoved = true;
    }
    public moveAndAnalyzeCheck(piece: Piece, move: Move, currentMove: MoveRegistry | null): SituationType | null {
        this.move(piece, move);

        const attackedKingColor: ColorType = piece.color === ColorType.White ? ColorType.Black : ColorType.White
        const checkAnalyzer: CheckAnalyzer = new CheckAnalyzer(attackedKingColor, this.pieces);
        const possibleMovesAnalyzer: PossibleMovesAnalyzer = new PossibleMovesAnalyzer(attackedKingColor, this.pieces);

        const isCheck = checkAnalyzer.analyze()
        const hasPossibleMoves = possibleMovesAnalyzer.analyze(currentMove)

        if (isCheck && hasPossibleMoves) {
            return SituationType.Check
        } else if (isCheck && !hasPossibleMoves) {
            return SituationType.CheckMate
        } else if (!isCheck && !hasPossibleMoves) {
            return SituationType.Check
        } else {
            return null
        }
    }

    public undoMove(piece: Piece, move: Move, startPosition: Position, capturedPiece: Piece | null, hasAlreadyMoved: boolean): void {
        if (move.isCastling) {
            this.undoCastling(piece)
        }
        piece.position = startPosition;
        if (capturedPiece !== null) {
            this.pieces.push(capturedPiece);
        }
        piece.hasAlreadyMoved = hasAlreadyMoved;
    }

    public moveRookInCastle(piece: Piece, move: Move): void {
        const y: 8 | 1 = piece.color === ColorType.White ? 1 : 8;

        // true - left, false - right
        const xDirection: boolean = Board.xAxis.indexOf(piece.position.x) > Board.xAxis.indexOf(move.x);
        const x = xDirection ? "A" : "H"

        const rook: Piece | null = PieceFinder.find(this.pieces, x, y);
        if (rook !== null) {
            rook.position.x = xDirection ? "D" : "F";
        }
    }

    public undoCastling(piece: Piece): void {
        const y: 8 | 1 = piece.color === ColorType.White ? 1 : 8;

        let x: string | null = null;
        let toX: string | null = null;
        if (piece.position.x === "G") {
            x = "F"
            toX = "H"
        } else if (piece.position.x === "C") {
            x = "D"
            toX = "A"
        }

        if (x === null || toX === null) {
            return;
        }

        const rook: Piece | null = PieceFinder.find(this.pieces, x, y);
        if (rook !== null) {
            rook.position.y = y
            rook.position.x = toX
        }
    }

    public removePiece(piece: Piece): void {
        for (let i = 0; i < this.pieces.length; i++) {
            let boardPiece = this.pieces[i];
            if (boardPiece.position.x === piece.position.x && boardPiece.position.y === piece.position.y) {
                this.pieces.splice(i, 1);
                break;
            }
        }
    }
}