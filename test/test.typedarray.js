/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array pdf', function tests() {

	var alpha = 9,
		beta = 2;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Gamma pdf', function test() {
		var data, actual, expected, i;

		data = new Float64Array([
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9
		]);
		actual = new Float64Array( data.length );

		actual = pdf( actual, data, alpha, beta );

		// Evaluated in R:
		expected = new Float64Array([
			0.000000000, 0.001718543, 0.059540363, 0.206515467,
		 	0.279173064, 0.225198064, 0.131046570, 0.060871081,
		 	0.023974945, 0.008325088
		]);

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( new Int8Array(), new Int8Array(), alpha, beta ), new Int8Array() );
	});

});
