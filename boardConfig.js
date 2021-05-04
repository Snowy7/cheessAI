var board,
    game = new Chess();

// Actions after any move
var onMoveEnd = function(oldPos, newPos) {
    // Alert if game is over
    if (game.game_over() === true) {
        alert('Game Over');
        console.log('Game Over');
    }

    // Log the current game position
    console.log(game.fen());
};

// Check before pick pieces that it is white and game is not over
var onDragStart = function(source, piece, position, orientation) {
    if (game.game_over() === true || piece.search(/^b/) !== -1) {
        return false;
    }
};

// Update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
    board.position(game.fen());
};

var onMouseoverSquare = function(square, piece) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#3f3f7e';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#5766ba';
    }

    squareEl.css('background', background);
};

// Configure board
var cfg = {
    draggable: true,
    position: 'start',
    // Handlers for user actions
    onMoveEnd: onMoveEnd,
    onDragStart: onDragStart,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
board = ChessBoard('board', cfg);
