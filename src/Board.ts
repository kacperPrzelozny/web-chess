import {Piece} from "./Pieces/Piece";
import {PieceGenerator} from "./Pieces/Utils/PieceGenerator";
import {ColorType} from "./Pieces/Utils/Colors";
import {MoveManager} from "./Moves/MoveManager";
import {Move} from "./Moves/Move";
import {BoardDrawer} from "./BoardDrawer";
import {PieceType} from "./Pieces/Utils/PieceType";

export class Board
{
    public static xAxis: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    public static yAxis: Array<number> = [8, 7, 6, 5, 4, 3, 2, 1];

    private pieces: Array<Piece> = [];
    public currentTurn: ColorType = ColorType.White;

    public moveManager: MoveManager;
    public boardDrawer: BoardDrawer;

    public constructor() {
        this.createInitialPosition()
        this.moveManager = new MoveManager(this.pieces);
        this.boardDrawer = new BoardDrawer();
        this.buildChessBoard()
    }

    // region Private

    private buildChessBoard() {
        this.boardDrawer.drawBoard()
        this.boardDrawer.drawPieces(this, this.pieces, this.pieceClickedAction)
    }

    private pieceClickedAction(board: Board, piece: Piece)
    {
        if (piece.color !== board.currentTurn) {
            return;
        }

        let moves = board.moveManager.getMoves(piece);

        board.boardDrawer.drawMoves(board, piece, moves, board.moveClickedAction)
    }

    private moveClickedAction(board: Board, piece: Piece, move: Move): void {
        if (piece.type === PieceType.Pawn) {
            if ((piece.color === ColorType.White && move.y === 8) || (piece.color === ColorType.Black && move.y === 1)) {
                board.boardDrawer.drawPromotionSelect(board, piece, move, board.promotionSelectedAction)
                return;
            }
        }
        board.movePiece(piece, move);
    }

    private promotionSelectedAction(board: Board, piece: Piece, move: Move, pieceType: PieceType): void {
        const newPiece = board.promotePawn(piece, pieceType)

        board.movePiece(newPiece, move);
    }

    private createInitialPosition(): void {
        let pieceGenerator = new PieceGenerator();
        this.pieces = pieceGenerator.generateInitialPositions()
    }

    private changeTurn(): void {
        this.currentTurn = this.currentTurn === ColorType.White ? ColorType.Black : ColorType.White;
    }

    private movePiece(piece: Piece, move: Move): void {
        this.changeTurn();

        this.moveManager.move(piece, move);

        this.boardDrawer.drawPieces(this, this.pieces, this.pieceClickedAction)
    }

    private promotePawn(piece: Piece, pieceType: PieceType): Piece {
        const pieceGenerator = new PieceGenerator();
        const promotedPiece = pieceGenerator.generatePiece(piece.color, piece.position.x, piece.position.y, pieceType)

        this.moveManager.removePiece(piece);
        this.pieces.push(promotedPiece);

        return promotedPiece
    }

    // endregion
}
