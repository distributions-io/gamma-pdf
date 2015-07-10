'use strict';

// MODULES //

var gamma = require( 'gamma' );


// FUNCTIONS //

var exp = Math.exp,
	ln = Math.log;


// PARTIAL //

/**
* FUNCTION: partial( alpha, beta )
*	Partially applies shape parameter `alpha` and rate parameter `beta` and returns a function for evaluating the probability density function (PDF) for a Gamma distribution.
*
* @param {Number} alpha - shape parameter
* @param {Number} beta - rate parameter
* @returns {Function} PDF
*/
function partial( alpha, beta ) {

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Gamma distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {
		var lnl;
		if ( x > 0 ) {
			lnl = alpha * ln( beta ) - gamma.log( alpha ) + ( alpha - 1 ) * ln( x ) - beta * x;
			return exp( lnl );
		} else {
			return 0;
		}
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
