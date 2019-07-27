const Chai = require('chai'),
    expect = Chai.expect,
    solver = require('./sudoku_solver');

const board = '000006001\n' + 
            '087005000\n' +
            '000000082\n' +
            '300104006\n' +
            '004308000\n' +
            '009500437\n' +
            '006000000\n' +
            '900001250\n' +
            '203709000';

describe('Sudoku Solver', () => {
	describe('#parseBoard()', () => {
	  it('should parse a sudoku board into a 2D array', () => {
	    const parsedBoard = solver.parseBoard(board);
	    const expectedBoard = [
	      [0,0,0,0,0,6,0,0,1],
	      [0,8,7,0,0,5,0,0,0],
	      [0,0,0,0,0,0,0,8,2],
	      [3,0,0,1,0,4,0,0,6],
	      [0,0,4,3,0,8,0,0,0],
	      [0,0,9,5,0,0,4,3,7],
	      [0,0,6,0,0,0,0,0,0],
	      [9,0,0,0,0,1,2,5,0],
	      [2,0,3,7,0,9,0,0,0]
	    ];

	    expect(parsedBoard.length).to.equal(9);
	    expect(parsedBoard[0].length).to.equal(9);
	    expect(parsedBoard).to.eql(expectedBoard);
	  });
	});

	describe('#saveEmptyPositions()', () => {
	  it('should save all of the empty positions, 0s, in a parsed board', () => {
	    const emptyPositions = solver.saveEmptyPositions(solver.parseBoard(board));

	    const expectedPositions = [
	      [0,0],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],
	      [1,2],[1,5],[2,0],[2,1],[2,2],[2,6],[2,7],[2,8],[3,0],
	      [3,1],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[4,4],[4,5],
	      [4,7],[4,8],[5,1],[5,3],[5,4],[5,5],[5,8],[6,1],[6,2],
	      [6,4],[6,6],[6,8],[7,1],[7,3],[7,4],[7,5],[7,8],[8,1],
	      [8,2],[8,3],[8,5],[8,6],[8,7],[8,8]
	    ];
	    expect(emptyPositions.length).to.equal(53);
	    expect(emptyPositions).to.eql(expectedPositions);
	  });
	});

	describe('#checkRow()', function() {
	  it('should check that each value in the row does not equal the input', function() {
	    // No match. Return true.
	    expect(solver.checkRow(solver.parseBoard(board), 0, 2)).to.be.ok;
	    // Match found. Return false;
	    expect(solver.checkRow(solver.parseBoard(board), 0, 6)).to.not.be.ok;
	  });
	});

	describe('#checkColumn()', function() {
	  it('should check that each value in a column does not equal the input', function() {
	    // No match. Return true
	    expect(solver.checkColumn(solver.parseBoard(board), 0, 5)).to.be.ok;
	    // Match found. Return false
	    expect(solver.checkColumn(solver.parseBoard(board), 0, 3)).to.not.be.ok;
	  });
	});

	describe('#check3x3Square()', function() {
	  it('should check that each value in a 3x3 square does not match the input', function() {
	    // No match. Return true
	    expect(solver.check3x3Square(solver.parseBoard(board), 2, 2, 1)).to.be.ok;
	    // Match found. Return false
	    expect(solver.check3x3Square(solver.parseBoard(board), 1, 6, 6)).to.not.be.ok;
	  });
	});

	describe('#checkValue()', function() {
	  it('should check whether a value is valid for a particular position', function() {
	    // No match. Return true
	    expect(solver.checkValue(solver.parseBoard(board), 0, 0, 5)).to.be.ok;
	    // // Match found. Return false
	    expect(solver.checkValue(solver.parseBoard(board), 0, 0, 9)).to.not.be.ok;
	  });
	});

	const expectedSolution = [[ 5,3,2,9,8,6,7,4,1 ],
                        [ 4,8,7,2,1,5,3,6,9 ],
                        [ 6,9,1,4,3,7,5,8,2 ],
                        [ 3,2,5,1,7,4,8,9,6 ],
                        [ 7,6,4,3,9,8,1,2,5 ],
                        [ 8,1,9,5,6,2,4,3,7 ],
                        [ 1,5,6,8,2,3,9,7,4 ],
                        [ 9,7,8,6,4,1,2,5,3 ],
                        [ 2,4,3,7,5,9,6,1,8 ]];

	describe('#solvePuzzle()', function() {
	  it('should find a solution to the puzzle passed in', function() {
	    const solution = solver.solvePuzzle(solver.parseBoard(board), solver.saveEmptyPositions(solver.parseBoard(board)));

	    expect(solution).to.eql(expectedSolution);
	  });
	});

	describe('#solveSudoku()', function() {
	  it('should find a solution to the puzzle string passed in', function() {
	    var solution = solver.solveSudoku(board);

	    expect(solution).to.eql(expectedSolution);
	  });
	});
  // all tests should be inserted here
});

