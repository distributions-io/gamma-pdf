/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var alpha = 1,
		beta = 1;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Gamma probability density function', function test() {
		assert.closeTo( pdf( 1, alpha, beta ), 0.367879441, 1e-7 );
		assert.closeTo( pdf( 4, alpha, beta ), 0.018315639, 1e-7 );
		assert.closeTo( pdf( 6, alpha, beta ), 0.002478752, 1e-7 );
	});

});
