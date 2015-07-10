/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset pdf', function tests() {

	var alpha = 1,
		beta = 2;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should compute the Gamma pdf and deep set', function test() {
		var data, expected, i;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4},
			{'x':5},
			{'x':6}
		];

		data = pdf( data, alpha, beta, 'x' );

		expected = [
			{'x':2},
			{'x':2.706706e-01},
			{'x':3.663128e-02},
			{'x':4.957504e-03},
			{'x':6.709253e-04},
			{'x':9.079986e-05},
			{'x':1.228842e-05}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x, expected[ i ].x, 1e-7 );
		}

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]},
			{'x':[9,4]},
			{'x':[9,5]},
			{'x':[9,6]}
		];

		data = pdf( data, alpha, beta, 'x/1', '/' );
		expected = [
			{'x':[9,2]},
			{'x':[9,2.706706e-01]},
			{'x':[9,3.663128e-02]},
			{'x':[9,4.957504e-03]},
			{'x':[9,6.709253e-04]},
			{'x':[9,9.079986e-05]},
			{'x':[9,1.228842e-05]}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7, 'custom separator' );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], alpha, beta, 'x' ), [] );
		assert.deepEqual( pdf( [], alpha, beta, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = pdf( data, alpha, beta, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
