/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor pdf', function tests() {

	var alpha = 3,
		beta = 3;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Gamma pdf using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4},
			{'x':5},
			{'x':6}
		];
		actual = new Array( data.length );

		actual = pdf( actual, data, alpha, beta,getValue );

		expected = [
			0.000000e+00, 6.721254e-01, 1.338526e-01, 1.499429e-02, 1.327150e-03, 1.032420e-04, 7.401770e-06
		];

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = pdf( actual, data, alpha, beta, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
