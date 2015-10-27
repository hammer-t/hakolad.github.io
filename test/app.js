window.onload = function() {

	"use strict";

	/*
	var a_goodGrid = [],
		a_starGrid = [],
		a_fiveGrid = [],
		a_myGridTo = [],
		a_bigTableWithGrid = [];


	// We start to generate 1 stars, which will be used as grid to obtain
	// Generate a number between [1, 10]
	var numberGenerate = Math.floor(Math.random()*10) + 1;
	a_starGrid.push(numberGenerate);

	// Now we generate a grid with 5 numbers
	for (var i = 0; i < 5; i++) {
		// Generate a number between [1, 49]
		var numberGenerate = Math.floor(Math.random()*49) + 1;
		a_fiveGrid.push(numberGenerate);
	};

	// We order the table to go from low to high
	a_fiveGrid.sort();

	a_goodGrid.push(a_fiveGrid);
	a_goodGrid.push(a_starGrid);

	// We clear the table
	a_fiveGrid = [];
	a_starGrid = [];

	for (var i = 0; i < 100; i++) {
		// Same idea as before
		// Generate a number between [1, 10]
		var numberGenerate = Math.floor(Math.random()*10) + 1;
		a_starGrid.push(numberGenerate);

		// Now we generate a grid with 5 numbers
		for (var y = 0; y < 5; y++) {
			// Generate a number between [1, 49]
			var numberGenerate = Math.floor(Math.random()*49) + 1;
			a_fiveGrid.push(numberGenerate);
		};

		// We order the table to go from low to high
		a_fiveGrid.sort();

		a_myGridTo.push(a_fiveGrid);
		a_myGridTo.push(a_starGrid);

		a_bigTableWithGrid.push(a_myGridTo);

		a_fiveGrid = [];
		a_starGrid = [];
		a_myGridTo = [];

	};
	*/

	var gridGenerator = function(maximumNumber, numberOfGrid, numbersInOneGrid) {

		// We will generate an array to pick ours number in
		var a_wholeNumbers = [],
			a_myGrid = [],
			i_maximumArrayLength = maximumNumber - 1,
			a_grids = [];

		// This will generate the whole numbers that we want to find
		for (var i = 1; i <= maximumNumber; i++) {
			a_wholeNumbers.push(i);
		};

		// So now we will pick numbers and create a grid with
		for (var i = 1; i <= numberOfGrid; i++) {

			var a_myGrid = [];

			for (var i = 1; i <= numbersInOneGrid; i++) {

				var a_innerWholeNumberss = a_wholeNumbers;

				var randomNumber = a_innerWholeNumberss[Math.floor(Math.random() * i_maximumArrayLength)];
				// We remove the value found, so we can't find it in the same grid
				a_innerWholeNumberss.splice(randomNumber, 1);
				// We decrease our maximum length so we can't find an undefined number
				i_maximumArrayLength--;

				a_myGrid.push(randomNumber);

			};

			// We sort the array from low to high
			a_myGrid.sort();

			a_grids.push(a_myGrid);

			// We clear the grid
			a_myGrid = [];

		};

		return a_grids;

	};

	console.log(gridGenerator(50, 5, 5));

}