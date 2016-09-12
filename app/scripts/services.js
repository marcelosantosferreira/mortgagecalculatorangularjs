'use strict';

angular.module('mortgageCalculatorApp')

.service('mortgageFunctions', ['$filter',function($filter){
	
	/*
	Get the Monthly Payment - main return
	*/
	this.getMonthlyPayment = function(amount, interest, period){
		return (amount * Math.pow(1+interest,period))/((Math.pow((1+interest),(period-1) + 1) - 1)/((1+interest) - 1));
	}
	
	/*
	Get the Total Payment
	*/
	this.getTotalPayment = function(amount, interest, period){
		return this.getMonthlyPayment(amount, interest, period) * period;
	};
	
	/*
	Get the Total Interest
	*/
	this.getTotalInterest = function(amount, interest, period){
		return this.getTotalPayment(amount, interest, period) - amount;
	}
	
	/*
	Get the Average Monthly Interest
	*/
	this.getAverageMonthlyInterest = function(amount, interest, period){
		return this.getTotalInterest(amount, interest, period)/period;
	};
	
	/*
	Get the payment for a specific Month
	*/
	this.getPaymentForMonthX = function(amount, interest, period, month){
		
		var _monthlyPayment = this.getMonthlyPayment(amount, interest, period);
		var paymentForMonthX = 0;
		for(var i=0; i<month; i++){
			paymentForMonthX = _monthlyPayment - (amount * interest);
			amount = amount - paymentForMonthX;
		}
		return paymentForMonthX;
	};
	
	/*
	Get the entire Amortization Table
	TODO: 	1. Should return a collection (now mixing UI and controller)
			2. Better Formatting (grouping Years, on UI)
	*/
	this.getAmortizationTable = function(amount, interest, period){
		var sumPerYear = 0;
		var concat = "";
		var years = 0;
		concat = concat + "<table class='table table-hover table-striped table-condensed'>";
		concat = concat + "<tr bgcolor='#ffffff'>";
			concat = concat + "	<td><b>Month #</b>";
			concat = concat + "	</td>";
			concat = concat + "	<td><b>Payment</b>";
			concat = concat + "	</td>";
			concat = concat + "	<td><b>Balance</b>";
			concat = concat + "	</td>";
			concat = concat + "</tr>";
		for(var c=1; c<=period; c++){
			sumPerYear = sumPerYear + this.getPaymentForMonthX(amount, interest, period, c);
			
			concat = concat + "	<td>" + c;
			concat = concat + "	</td>";
			concat = concat + "	<td>" + $filter('currency')(this.getPaymentForMonthX(amount, interest, period, c));
			concat = concat + "	</td>";
			concat = concat + "	<td>" + $filter('currency')(amount-sumPerYear);
			concat = concat + "	</td>";
			concat = concat + "</tr>";
			
			if (c % 12 == 0){
				years++;
				concat = concat + "<tr class='info'>";
				concat = concat + "	<td align='right' valign='middle'>Total payment on year #"+years+"</td>";
				concat = concat + "	<td colspan='2'>";
				concat = concat + "		<span class='label label-default' style='font-size: 105%'>" + $filter('currency')(sumPerYear) + "</span>";
				concat = concat + "	</td>";
				concat = concat + "</tr>";
				sumPerYear = 0; 
			}
		}
		concat = concat + "<table>";
		return concat;
	}
}]);