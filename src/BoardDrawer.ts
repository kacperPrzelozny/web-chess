import {Board} from "./Board";
import {Move} from "./Moves/Move";
import {Piece} from "./Pieces/Piece";
import {PieceType} from "./Pieces/Utils/PieceType";
import {ColorType} from "./Pieces/Utils/Colors";
import {Pawn} from "./Pieces/Pawn";
import {PieceGenerator} from "./Pieces/Utils/PieceGenerator";

export class BoardDrawer
{
    public drawBoard(): void {
        const boardContainer = document.getElementById("chessboard");

        if (!boardContainer) {
            return;
        }

        for (let y of Board.yAxis) {
            const labelSquare = document.createElement("div");
            labelSquare.classList.add("squareLabel");
            labelSquare.innerHTML = y.toString();
            boardContainer.appendChild(labelSquare);

            for (let x of Board.xAxis) {
                const chessSquare = document.createElement("div");
                chessSquare.classList.add("square");

                if ((Board.xAxis.indexOf(x) + y) % 2 === 0) {
                    chessSquare.classList.add("white");
                } else {
                    chessSquare.classList.add("black");
                }

                chessSquare.dataset.x = x;
                chessSquare.dataset.y = String(y);

                boardContainer.appendChild(chessSquare);
            }
        }

        const emptyLabelSquare = document.createElement("div");
        emptyLabelSquare.classList.add("squareLabel");
        boardContainer.appendChild(emptyLabelSquare);

        for (let x of Board.xAxis) {
            const xLabelSquare = document.createElement("div");
            xLabelSquare.innerHTML = x;
            xLabelSquare.classList.add("squareLabel");
            boardContainer.appendChild(xLabelSquare);
        }
    }

    public drawPieces(board: Board, pieces: Array<Piece>, pieceClickedAction: (board: Board, piece: Piece) => void): void {
        this.clearSquares();
        this.clearMoves();
        this.clearPromotionSelection()

        for (let piece of pieces) {
            let squares = document.querySelectorAll('[data-x~="'+piece.position.x+'"][data-y~="'+String(piece.position.y)+'"]');
            let square = squares[0] ?? null;
            if (!square) {
                return;
            }

            let img = document.createElement("img");
            img.src = "assets/images/pieces/" + piece.generatePieceName() + ".png";
            img.alt = piece.generatePieceName();
            img.classList.add("piece-img");

            piece.icon = img

            if (piece.color === board.currentTurn) {
                img.addEventListener("click", () => {
                    pieceClickedAction(board, piece);
                })
            }

            square.appendChild(img);
        }
    }

    public drawMoves(board: Board, piece: Piece, moves: Array<Move>, moveClickedAction: (board: Board, piece: Piece, move: Move) => void): void {
        this.clearMoves();
        this.clearPromotionSelection()

        for (let move of moves) {
            let squares = document.querySelectorAll('[data-x~="' + move.x + '"][data-y~="' + String(move.y) + '"]');
            let square = squares[0] ?? null;
            if (!square) {
                return;
            }

            let img = document.createElement("img");
            img.classList.add("move-img")
            img.src = "assets/images/moves/" + (move.isCapture && !move.isEnPassant ? "move-capture" : "move") + ".png";
            img.addEventListener("click", () => {
                moveClickedAction(board, piece, move);
            })
            square.appendChild(img)
        }
    }

    public drawPromotionSelect(board: Board, piece: Piece, move: Move, promotionSelectedAction: (board: Board, piece: Piece, move: Move, pieceType: PieceType) => void): void {
        this.clearPromotionSelection()

        const container = document.getElementById(piece.color === ColorType.White ? "top-container" : "bottom-container");

        if (!container) {
            return;
        }

        container.innerHTML = "";

        for (let i = 0; i < Pawn.canPromoteTo.length; i++) {
            const pieceForImg = (new PieceGenerator()).generatePiece(piece.color, "X", 0, Pawn.canPromoteTo[i]);

            const square = document.createElement("div");
            square.classList.add("square", i % 2 == 0 ? "white" : "black");

            const img = document.createElement("img");
            img.src = "assets/images/pieces/" + pieceForImg.generatePieceName() + ".png";
            img.alt = piece.generatePieceName();
            img.classList.add("piece-img");

            square.appendChild(img);
            square.addEventListener("click", () => {
                promotionSelectedAction(board, piece, move, Pawn.canPromoteTo[i]);
            })

            container.appendChild(square);
        }
    }

    public clearSquares(): void {
        let squares = document.querySelectorAll('.square');
        for (let square of squares) {
            square.innerHTML = '';
        }
    }

    public clearMoves(): void {
        let moves = document.querySelectorAll('.move-img');
        for (let move of moves) {
            move.remove();
        }
    }

    public clearPromotionSelection()
    {
        const promotionContainers = document.getElementsByClassName("extra-container");
        for (let promotion of promotionContainers) {
            promotion.innerHTML = "";
        }
    }
}