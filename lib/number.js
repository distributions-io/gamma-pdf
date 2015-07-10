'use strict';

// MODULES //

var gamma = require( 'gamma' );


// FUNCTIONS //

var exp = Math.exp,
	ln = Math.log;


// PDF //

/**
* FUNCTION: pdf( x, alpha, beta )
*	Evaluates the probability density function (PDF) for a Gamma distribution with shape parameter `alpha` and rate parameter `beta` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} alpha - shape parameter
* @param {Number} beta - rate parameter
* @returns {Number} evaluated PDF
*/
function pdf( x, alpha, beta ) {
	var lnl;
	if ( x > 0 ) {
		lnl = alpha * ln( beta ) - gamma.log( alpha ) + ( alpha - 1 ) * ln( x ) - beta * x;
		return exp( lnl );
	} else {
		return 0;
	}
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
