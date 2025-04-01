import {Piece} from "./Pieces/Piece";
import {PieceGenerator} from "./Pieces/Utils/PieceGenerator";
import {ColorType} from "./Pieces/Utils/Colors";
import {MoveManager} from "./Moves/MoveManager";
import {Move} from "./Moves/Move";
import {BoardDrawer} from "./BoardDrawer";
import {PieceFinder} from "./Pieces/PieceFinder";

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

    public movePiece(piece: Piece, move: Move): void {
        this.changeTurn();

        this.moveManager.move(piece, move);

        this.boardDrawer.drawPieces(this, this.pieces, this.pieceClickedAction)
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
        board.movePiece(piece, move);
    }

    private createInitialPosition(): void {
        let pieceGenerator = new PieceGenerator();
        this.pieces = pieceGenerator.generateInitialPositions()
    }

    private changeTurn(): void {
        this.currentTurn = this.currentTurn === ColorType.White ? ColorType.Black : ColorType.White;
    }
    // endregion
}
