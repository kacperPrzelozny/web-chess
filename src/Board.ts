import {Piece} from "./Pieces/Piece";
import {PieceGenerator} from "./Pieces/Utils/PieceGenerator";
import {PossibleMoves} from "./Moves/PossibleMoves"
import {ColorType} from "./Pieces/Utils/Colors";

export class Board
{
    public static xAxis: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    public static yAxis: Array<number> = [8, 7, 6, 5, 4, 3, 2, 1];

    public whitePieces: Array<Piece> = [];
    public blackPieces: Array<Piece> = [];
    public currentTurn: ColorType = ColorType.White;

    public constructor() {
        this.createInitialPosition()
    }

    public buildChessBoard(): void {
        const boardContainer = document.getElementById("chessboard");

        if (!boardContainer) {
            return;
        }

        boardContainer.innerHTML = "";

        const labelsContainer = document.getElementById("labels");
        if (!labelsContainer) {
            return;
        }

        labelsContainer.innerHTML = "";

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

                let piece: Piece | null = this.findPiece(x, y);
                if (piece !== null) {
                    let img = document.createElement("img");
                    img.src = "assets/images/pieces/" + piece.generatePieceName() + ".png";
                    img.alt = piece.generatePieceName();
                    img.classList.add("piece-img");

                    piece.icon = img

                    img.addEventListener("click", () => {
                        if (this.currentTurn !== piece.color) {
                            return;
                        }
                        let possibleMoves = new PossibleMoves(this, piece);
                        possibleMoves.checkPossibleMoves()
                    })

                    square.appendChild(img);
                }

                square.dataset.x = x;
                square.dataset.y = String(y);

                boardContainer.appendChild(square);
            }
        }

        boardContainer.appendChild(xLabelRow);
    }

    public findPiece(x: string, y: number): Piece | null {
        for (let piece of this.whitePieces) {
            if (piece.position.x === x && piece.position.y === y) {
                return piece;
            }
        }

        for (let piece of this.blackPieces) {
            if (piece.position.x === x && piece.position.y === y) {
                return piece;
            }
        }

        return null;
    }

    public removePiece(piece: Piece): void {
        if (piece.color === ColorType.White) {
            for (let i = 0; i < this.whitePieces.length; i++) {
                let whitePiece = this.whitePieces[i];
                if (whitePiece.position === piece.position) {
                    this.whitePieces.splice(i, 1);
                }
            }
        } else {
            for (let i = 0; i < this.blackPieces.length; i++) {
                let blackPiece = this.blackPieces[i];
                if (blackPiece.position.x === piece.position.x && blackPiece.position.y === piece.position.y) {
                    this.blackPieces.splice(i, 1);
                }
            }
        }
    }

    // region Private

    private createInitialPosition(): void {
        let pieceGenerator = new PieceGenerator(this);
        pieceGenerator.generate()
    }

    // endregion
}
