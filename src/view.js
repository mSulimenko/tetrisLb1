import {NAMES_MATCHING, TETROMINO_COLOURS, TETROMINO_MATRIX, WINDOW_COLUMNS, WINDOW_ROWS} from "./utilities.js";
export class View{
    constructor(width, height, rows, columns) {

        this.cells = document.querySelectorAll('.grid>div');
        this.width =width;
        this.height = height;

        this.score = document.getElementById("score");
        this.level = document.getElementById("level");

        this.canvas = document.getElementById('main-canvas');
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        this.ctx = this.canvas.getContext('2d');

        this.blockWidth = this.width / columns;
        this.blockHeight = this.height / rows;

        this.backgroundColor = 'gray';


    }
    drawNext(tetris){
        this.cells.forEach((cell)=> cell.removeAttribute('class'));
        this.drawNextTetromino(tetris);
    }

    drawScore(cur_score){
        this.score.textContent = `Счет:${cur_score}`;
    }
    drawLevel(cur_level){
        this.level.textContent = `Уровень:${cur_level}`;
    }

    drawNextTetromino(tetris){
        const {name, size} = tetris.nextTetromino;
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++ ){
                if(!TETROMINO_MATRIX[name][i][j]) continue;
                this.cells[4*i+j].classList.add(NAMES_MATCHING[name]);  //6  4*i+j
            }
        }
    }


    clear(){
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }


    draw(playfield, tetromino){
        this.clear();
        for(let y = 0; y < playfield.length; y++){
            const line = playfield[y];
            for (let x = 0; x < line.length; x++){
                const cell = line[x];
                if(cell){
                    this.drawCell(x*this.blockWidth, y*this.blockHeight,
                        this.blockWidth, this.blockHeight, TETROMINO_COLOURS[cell]);
                }
            }
        }

        for(let y = tetromino.y, i=0; y < tetromino.y + tetromino.matrix.length; y++, i++){
            const line = tetromino.matrix[i];
            for (let x = tetromino.x, j=0; x < tetromino.x + line.length; x++, j++){
                const cell = line[j];
                if(cell){
                    this.drawCell(x*this.blockWidth, y*this.blockHeight,
                        this.blockWidth, this.blockHeight, tetromino.color);
                }
            }
        }

    }
    drawCell(x, y, width, height, color){
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeRect(x, y, width, height);
    }

}