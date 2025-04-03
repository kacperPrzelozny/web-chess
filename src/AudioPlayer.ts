import {Move} from "./Moves/Move";

export class AudioPlayer
{
    public playSoundOnMove(move: Move) {
        const audio = new Audio(move.generateSoundPath());

        this.play(audio);
    }

    public playPromotionSound() {
        const audio = new Audio('assets/sounds/promote.mp3');

        this.play(audio);
    }

    private play(audio: HTMLAudioElement) {
        audio.currentTime = 0;
        audio.play().then();
    }
}