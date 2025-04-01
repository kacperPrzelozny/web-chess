export class Move
{
    constructor(
        public x: string,
        public y: number,
        public isCapture: boolean = true,
        public isLShaped: boolean = false,
        public isDiagonal: boolean = false,
        public isInRow: boolean = false,
        public isInColumn: boolean = false,
        public canChangeCapture: boolean = true,
        public isCastling: boolean = false,
    ) {
    }
}