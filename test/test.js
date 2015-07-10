/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	pdf = require( './../lib' ),

	// Error function:
	PDF = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-gamma-pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( pdf( values[ i ] ) ) );
		}
	});

	it( 'should compute the Gamma pdf when provided a number', function test() {
		assert.strictEqual( pdf( -1 ), 0 );
	});

	it( 'should evaluate the Gamma pdf when provided a plain array', function test() {
		var data, actual, expected, i;

		data = [ -2, -1, 0, 1, 2, 3, 4, 5 ];
		expected = [
			0, 0, 1.000000000, 0.367879441, 0.135335283, 0.049787068,
			0.018315639, 0.006737947
		];

		actual = pdf( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate...
		actual = pdf( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the Gamma pdf when provided a typed array', function test() {
		var data, actual, expected;

		var alpha = 2,
			beta = 1;

		data = new Int8Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] );

		expected = new Float64Array([
			0.0000000000, 0.3678794412, 0.2706705665, 0.1493612051, 0.0732625556, 0.0336897350, 0.0148725131, 0.0063831738,
			0.0026837010, 0.0011106882
		]);

		actual = pdf( data, {
			'alpha': alpha,
			'beta': beta
		});

		assert.notEqual( actual, data );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );


		// Mutate:
		actual = pdf( data, {
			'alpha': alpha,
			'beta': beta,
			'copy': false
		});
		expected = new Int8Array([
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0
		]);
		assert.strictEqual( actual, data );

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});

	it( 'should evaluate the Gamma pdf element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		var alpha = 0.9,
			beta = 0.1;

		data = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		expected = new Float32Array([
			Number.POSITIVE_INFINITY, 0.10659669, 0.08999353, 0.07819387,
 			0.06874631, 0.06083156, 0.05404821, 0.04815676,
 			0.04299605, 0.03844890
		]);

		actual = pdf( data, {
			'alpha': alpha,
			'beta': beta,
			'dtype': 'float32'
		});

		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 4 );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the Gamma pdf element-wise using an accessor', function test() {
		var data, actual, expected, i;

		var alpha = 3,
			beta = 3;

		data = [
			[0,0],
			[1,1],
			[2,2],
			[3,3],
			[4,4],
			[5,5],
			[6,6]
		];

		expected = [
			0.000000e+00, 6.721254e-01, 1.338526e-01, 1.499429e-02, 1.327150e-03, 1.032420e-04, 7.401770e-06
		];

		actual = pdf( data, {
			'alpha': alpha,
			'beta': beta,
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = pdf( data, {
			'alpha': alpha,
			'beta': beta,
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the Gamma pdf element-wise and deep set', function test() {
		var data, actual, expected, i;

		var alpha = 1,
			beta = 2;

		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]},
			{'x':[9,4]},
			{'x':[9,5]},
			{'x':[9,6]}
		];
		expected = [
			{'x':[9,2]},
			{'x':[9,2.706706e-01]},
			{'x':[9,3.663128e-02]},
			{'x':[9,4.957504e-03]},
			{'x':[9,6.709253e-04]},
			{'x':[9,9.079986e-05]},
			{'x':[9,1.228842e-05]}
		];

		actual = pdf( data, {
			'alpha': alpha,
			'beta': beta,
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}

		// Specify a path with a custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]},
			{'x':[9,4]},
			{'x':[9,5]},
			{'x':[9,6]}
		];
		actual = pdf( data, {
			'alpha': alpha,
			'beta': beta,
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}
	});

	it( 'should evaluate the Gamma pdf element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = PDF( i / 5, 1, 1 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = pdf( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the Gamma pdf element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = PDF( i / 5, 1, 1 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( pdf( [] ), [] );
		assert.deepEqual( pdf( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( pdf( new Int8Array() ), new Float64Array() );
	});

});
