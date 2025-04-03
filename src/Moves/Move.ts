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
        public isEnPassant: boolean = false,
    ) {
    }

    public generateSoundPath(): string {
        let path: string = 'assets/sounds/';

        if (this.isCastling) {
            return path + 'castle.mp3';
        }

        if (this.isCapture) {
            return path + 'capture.mp3';
        }

        return path + 'move-self.mp3';
    }
}