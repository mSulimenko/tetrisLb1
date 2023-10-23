import {SCORES,
        LEVELS,
        ARRAY_ROWS,
        ARRAY_COLUMNS,
        WINDOW_ROWS,
        WINDOW_COLUMNS,
        TETROMINO_MATRIX,
        TETROMINO_NAMES,
        TETROMINO_OFFSET,
        TETROMINO_COLOURS,
        getRandomTetromino} from "./utilities.js"
import {increaseSpeed} from "./main.js";

export class Tetris{

    constructor() {
        this.playfield;
        this.score = 0;
        this.level = 1;
        this.tetromino = {
            x: Math.floor(ARRAY_COLUMNS/2),
            y:-2,
            name:'',
            matrix:[],
            color:'',
            offset:0,
            size:4
        };
        this.nextTetromino =  {
            x: Math.floor(ARRAY_COLUMNS/2),
            y:-2,
            name:'',
            matrix:[],
            color:'',
            offset:0,
            size:4
        };
        this.miniWindow;
        this.gameOver = false;
        this.init();
    }

    init(){
        this.createPlayfield();
        this.createMiniWindow();
        this.createNextTetromino();
        this.createTetromino();
    }

    createMiniWindow(){
        this.miniWindow = new Array(WINDOW_ROWS).fill().map(()=>new Array(WINDOW_COLUMNS).fill(0));
    }
    createPlayfield(){
        this.playfield = new Array(ARRAY_ROWS).fill().map(()=>new Array(ARRAY_COLUMNS).fill(0));
    }

    createNextTetromino(){
        this.createTetromino();
        this.nextTetromino.name = getRandomTetromino(TETROMINO_NAMES);
        this.nextTetromino.matrix = [...TETROMINO_MATRIX[this.nextTetromino.name].map((innerArray)=>[...innerArray])];
        this.nextTetromino.color = TETROMINO_COLOURS[this.nextTetromino.name];
        this.nextTetromino.x = 2;
        this.nextTetromino.y = 2;
        this.nextTetromino.size = this.nextTetromino.matrix.length;

    }
    createTetromino(){
        this.tetromino.name = this.nextTetromino.name;
        this.tetromino.matrix = this.nextTetromino.matrix;
        this.tetromino.color = this.nextTetromino.color;
        this.tetromino.size = this.nextTetromino.size;
        this.tetromino.x = 4;
        this.tetromino.y = TETROMINO_OFFSET[this.tetromino.name];
    }

    moveDown(){
        this.tetromino.y+=1;
        if(!this.isValid()){
            this.tetromino.y-=1;
            this.secureTetromino();
        }
    }

    moveLeft(){
        this.tetromino.x-=1;
        if(!this.isValid())
            this.tetromino.x+=1;
    }

    moveRight(){
        this.tetromino.x+=1;
        if(!this.isValid())
            this.tetromino.x-=1;
    }

    rotate(){
        const l = this.tetromino.matrix.length;
        const current = [...this.tetromino.matrix.map((innerArray)=>[...innerArray] )];

        for(let i = 0; i < l; i++){
            for(let j = 0; j < l; j++){
                this.tetromino.matrix[i][j] = current[l-j-1][i];
            }
        }

        if(!this.isValid()){
            this.tetromino.matrix = [...current.map((innerArray)=>[...innerArray] )];
        }

    }
    isValid(){
        for(let y = this.tetromino.y, i=0; y < this.tetromino.y + this.tetromino.matrix.length; y++, i++){
            for (let x = this.tetromino.x, j=0; x < this.tetromino.x + this.tetromino.matrix[i].length; x++, j++){
                if(this.tetromino.matrix[i][j] && (this.isOutOfBounds(i, j) || this.isCollides(y, x)))
                    return false;
            }
        }
        return true;
    }
    isOutOfBounds(y, x){
        return this.tetromino.x + x < 0||
            this.tetromino.x +x >= ARRAY_COLUMNS ||
            this.tetromino.y + y >= ARRAY_ROWS;
    }

    isOutsideOfTop(y){
        if(this.tetromino.y  < 0){
            return true;
        }

    }
    isCollides(y, x){
        return this.playfield[y]?.[x];
    }
    secureTetromino(){
        for(let y = this.tetromino.y, i=0; y < this.tetromino.y + this.tetromino.matrix.length; y++, i++){
            for (let x = this.tetromino.x, j=0; x < this.tetromino.x + this.tetromino.matrix[i].length; x++, j++){
                if(this.tetromino.matrix[i][j]){
                    if(this.isOutsideOfTop(i)) {
                        this.gameOver = true;
                        return;
                    }
                    this.playfield[y][x]=this.tetromino.matrix[i][j];
                }
            }
        }

        this.processFilledRows();
        this.createNextTetromino();
    }

    processFilledRows(){
        let rows = this.checkFilledRows();
        if(rows[0]) this.deleteFilledRows(rows);
    }

    deleteFilledRows(rows){
        rows.forEach((elem)=>{
            this.dropRowsAbove(elem);
         })
        this.score += SCORES[rows.length];
        if((this.level!==4) && (this.score > LEVELS[this.level])){
            this.level++;
            increaseSpeed(this.level);
        }
    }

    dropRowsAbove(y){
        for(let i = y; i > 0; i--){
            for(let j = 0; j < ARRAY_COLUMNS; j++){
                this.playfield[i][j] = this.playfield[i-1][j];
            }
        }

        for(let j = 0; j < ARRAY_COLUMNS; j++){
            this.playfield[0][j] = 0;
        }
    }

    checkFilledRows(){
        let rows =[];
        for(let i = 0; i<ARRAY_ROWS; i++){
            let flag = true;
            for(let j = 0; j < ARRAY_COLUMNS; j++){
                if(this.playfield[i][j]===0) flag = false
            }
            if (flag) rows.push(i);
        }

        return rows;
    }

}