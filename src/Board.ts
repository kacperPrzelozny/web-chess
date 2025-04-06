import {Piece} from "./Pieces/Piece";
import {PieceGenerator} from "./Pieces/Utils/PieceGenerator";
import {ColorType} from "./Pieces/Utils/Colors";
import {MoveManager} from "./Moves/MoveManager";
import {Move} from "./Moves/Move";
import {BoardDrawer} from "./BoardDrawer";
import {PieceType} from "./Pieces/Utils/PieceType";
import {MoveHistory} from "./Moves/History/MoveHistory";
import {MoveRegistry} from "./Moves/History/MoveRegistry";
import {Position} from "./Pieces/Utils/Position";
import {AudioPlayer} from "./AudioPlayer";
import {SituationType} from "./Rules/SituationType";

export class Board
{
    public static xAxis: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    public static yAxis: Array<number> = [8, 7, 6, 5, 4, 3, 2, 1];

    private pieces: Array<Piece> = [];
    public currentTurn: ColorType = ColorType.White;

    public moveManager: MoveManager;
    public moveHistory: MoveHistory;
    public boardDrawer: BoardDrawer;
    public audioPlayer: AudioPlayer;

    public constructor() {
        this.createInitialPosition()
        this.moveManager = new MoveManager(this.pieces);
        this.moveHistory = new MoveHistory();
        this.boardDrawer = new BoardDrawer();
        this.audioPlayer = new AudioPlayer();
        this.buildChessBoard()
        this.audioPlayer.playSoundOnGameStart()
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

        let moves = board.moveManager.getMoves(piece, board.moveHistory.getLastRegisteredMove());

        board.boardDrawer.drawMoves(board, piece, moves, board.moveClickedAction)
    }

    private moveClickedAction(board: Board, piece: Piece, move: Move): void {
        if (piece.type === PieceType.Pawn) {
            if ((piece.color === ColorType.White && move.y === 8) || (piece.color === ColorType.Black && move.y === 1)) {
                board.boardDrawer.drawPromotionSelect(board, piece, move, board.promotionSelectedAction)
                return;
            }
        }
        const situationType = board.movePiece(piece, move);

        switch (situationType) {
            case SituationType.Check:
                board.audioPlayer.playCheckSound()
                break;
            case SituationType.CheckMate:
            case SituationType.Pat:
                board.audioPlayer.playSoundOnGameEnd()
                break;
            default:
                board.audioPlayer.playSoundOnMove(move)
        }
    }

    private promotionSelectedAction(board: Board, piece: Piece, move: Move, pieceType: PieceType): void {
        const newPiece = board.promotePawn(piece, pieceType)

        const situationType = board.movePiece(newPiece, move);

        switch (situationType) {
            case SituationType.Check:
                board.audioPlayer.playCheckSound()
                break;
            case SituationType.CheckMate:
            case SituationType.Pat:
                board.audioPlayer.playSoundOnGameEnd()
                break;
            default:
                board.audioPlayer.playPromotionSound()
        }
    }

    private createInitialPosition(): void {
        let pieceGenerator = new PieceGenerator();
        this.pieces = pieceGenerator.generateInitialPositions()
    }

    private changeTurn(): void {
        this.currentTurn = this.currentTurn === ColorType.White ? ColorType.Black : ColorType.White;
    }

    private movePiece(piece: Piece, move: Move): SituationType | null {
        this.changeTurn();

        const currentMove = new MoveRegistry(piece, move, new Position(piece.position.x, piece.position.y))
        this.moveHistory.history.push(currentMove);
        const situationType = this.moveManager.moveAndAnalyzeCheck(piece, move, currentMove);

        this.boardDrawer.drawPieces(this, this.pieces, this.pieceClickedAction)

        return situationType;
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
