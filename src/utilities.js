export const ARRAY_ROWS = 20;
export const ARRAY_COLUMNS = 10;
export const WINDOW_ROWS = 6;
export const WINDOW_COLUMNS = 4;

export const TETROMINO_NAMES = [ 1, 2, 3, 4, 5, 6, 7];

export const NAMES_MATCHING={
    1: 'I',
    2: 'L',
    3: 'J',
    4: 'O',
    5: 'S',
    6: 'Z',
    7: 'T'
}
export const TETROMINO_OFFSET ={
    1: -1,
    2: -1,
    3: -1,
    4: 0,
    5: -1,
    6: -1,
    7: -1
}

export const TETROMINO_COLOURS={
    1: 'aqua',
    2: 'orange',
    3: 'red',
    4: 'yellow',
    5: 'green',
    6: 'blue',
    7: 'pink'
}
export const TETROMINO_MATRIX={
    1: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    2: [
        [2,0,0],
        [2,2,2],
        [0,0,0],
    ],
    3: [
        [0,0,3],
        [3,3,3],
        [0,0,0],
    ],
    4: [
        [4,4],
        [4,4]
    ],
    5: [
        [0,5,5],
        [5,5,0],
        [0,0,0],
    ],
    6: [
        [6,6,0],
        [0,6,6],
        [0,0,0],
    ],
    7: [
        [0,7,0],
        [7,7,7],
        [0,0,0],
    ]
}

export const SCORES = {
    1:100,
    2:300,
    3:700,
    4:1500
}

export const LEVELS = {
    1:99,
    2:199,
    3:299,
    4:399
}

export function getRandomTetromino(array){
    return array[Math.floor(Math.random()*7)];
}