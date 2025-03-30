export class Move
{
    x: string;
    y: number;
    isCapture: boolean;
    isLShaped: boolean;
    isDiagonal: boolean;
    isInRow: boolean;
    isInColumn: boolean;
    canChangeCapture: boolean;

    constructor(
        x: string,
        y: number,
        isCapture: boolean = true,
        isLShaped: boolean = false,
        isDiagonal: boolean = false,
        isInRow: boolean = false,
        isInColumn: boolean = false,
        canChangeCapture: boolean = true
    ) {
        this.x = x;
        this.y = y;
        this.isCapture = isCapture;
        this.isLShaped = isLShaped;
        this.isDiagonal = isDiagonal;
        this.isInRow = isInRow;
        this.isInColumn = isInColumn;
        this.canChangeCapture = canChangeCapture;
    }
}