/*
 * jQuery autoTab plugin 0.1
 *
 * http://wnas.nl/
 *
 * Copyright (c) 2008 Wilfred Nas
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

jQuery.fn.autotab = function() {
	jQuery(this).keyup(
			function(e) {
				switch (e.keyCode) {
				// ignore the following keys
				case 9: // tab
					return false;
				case 16: // shift
					return false;
				case 20: // capslock
					return false;
				default: // any other keyup actions will trigger
					var maxlength = jQuery(this).attr('maxlength'); // get
																	// maxlength
																	// value
					var inputlength = jQuery(this).val().length; // get the
																	// length of
																	// the text
					if (inputlength >= maxlength) { // if the text is equal of
													// more than the max length
						jQuery(this).next(
								'input[type="text"], input[type="password"]')
								.focus(); // set focus to the next text field
					}
				}
			});
};