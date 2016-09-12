'use strict';

angular.module('mortgageCalculatorApp')

.controller('mortgageController', ['$scope', '$filter', 'mortgageFunctions', function ($scope, $filter, mortgageFunctions) {
	$scope.mortgage = {
		amount: 100000,
		interest: 1,
		period: 10,
		monthlyPayment: 0,
		totalPayment: 0,
		email: null,
		sent: null
	};
	/*
	TODO: 
	1. Mortgage Object with 3 main attributes (amount, interest, period)
	2. Mortgage Object with 5 methods: getTotalPayment(), getTotalInterest(), getAverageMonthlyInterest(), getPaymentForMonthX(), and getAmortizationTable()
	*/
	
	$scope.showOutputs = false;
	
	$scope.activate = function(){
		this.calculate();
		$scope.showOutputs = true;
	}

	$scope.calculate = function () {

		var amount = $scope.mortgage.amount;
		/* As the interest is per Cent and per Year */
		var interest = $scope.mortgage.interest / 100 / 12; 
		/* As the period is in Years */
		var period = $scope.mortgage.period * 12;
		
		$scope.mortgage.email = "";
		$scope.mortgage.sent = false;

		if (amount > 0 && interest > 0 && period > 0) {
			$scope.mortgage.monthlyPayment = mortgageFunctions.getMonthlyPayment(amount, interest, period);
			$scope.totalPayment = mortgageFunctions.getTotalPayment(amount, interest, period);
			$scope.totalInterest = mortgageFunctions.getTotalInterest(amount, interest, period);
			$scope.averageMonthlyInterest = mortgageFunctions.getAverageMonthlyInterest(amount, interest, period);
			
			// Formatting values to have only 2 decimals
			$scope.mortgage.monthlyPaymentAsCurrency = $filter('currency')($scope.mortgage.monthlyPayment);

			// Showing the Amortization Table
			var divAmortizationTable = document.getElementById("divAmortizationTable");
			if (divAmortizationTable){
				divAmortizationTable.innerHTML = mortgageFunctions.getAmortizationTable(amount, interest, period);	
			}else{
				console.warn('No access to divAmortizationTable!');
			}
			
			// Example of Month #3 Payment
			$scope.month3 = $filter('currency')(mortgageFunctions.getPaymentForMonthX(amount, interest, period, 3));
		}
	};
}]);