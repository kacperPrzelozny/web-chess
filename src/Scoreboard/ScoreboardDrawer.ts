import {Move} from "../Moves/Move";

export class ScoreboardDrawer
{
    public drawTable(notation: Array<{moveNumber: number, whiteMove: string, blackMove: string}>) {
        const scoreboard = document.getElementById('scoreboard');
        if (scoreboard === null) {
            return;
        }
        this.clearTable(scoreboard)


        notation.forEach((item) => {
            const row = document.createElement('tr');
            const col1 = document.createElement('td');
            col1.innerHTML = item.moveNumber.toString() + '.';
            const col2 = document.createElement('td');
            col2.innerHTML = item.whiteMove;
            const col3 = document.createElement('td');
            col3.innerHTML = item.blackMove;
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            scoreboard.appendChild(row);
        })
    }

    private clearTable(scoreboard: HTMLElement) {
        scoreboard.innerHTML = '';
    }
}