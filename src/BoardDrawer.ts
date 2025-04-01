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

        const labelsContainer = document.getElementById("labels");
        if (!labelsContainer) {
            return;
        }

        const xLabelRow = document.createElement("div");
        xLabelRow.classList.add("x-labels");

        for (let x of Board.xAxis) {
            const label = document.createElement("div");
            label.classList.add("label");
            label.textContent = x;
            xLabelRow.appendChild(label);
        }

        for (let y of Board.yAxis) {
            const yLabel = document.createElement("div");
            yLabel.classList.add("label");
            yLabel.textContent = y.toString();
            labelsContainer?.appendChild(yLabel);
        }

        for (let y of Board.yAxis) {
            for (let x of Board.xAxis) {
                const square = document.createElement("div");
                square.classList.add("square");

                if ((Board.xAxis.indexOf(x) + y) % 2 === 0) {
                    square.classList.add("white");
                } else {
                    square.classList.add("black");
                }

                square.dataset.x = x;
                square.dataset.y = String(y);

                boardContainer.appendChild(square);
            }
        }

        boardContainer.appendChild(xLabelRow);
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

            img.addEventListener("click", () => {
                pieceClickedAction(board, piece);
            })

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
            img.src = "assets/images/moves/" + (move.isCapture ? "move-capture" : "move") + ".png";
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