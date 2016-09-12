describe('Controller: mortgageController', function () {

    // load the controller's module
    beforeEach(module('mortgageCalculatorApp'));

    var mortgageController, scope, filter;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, mortgageFunctions) {
		
		scope = $rootScope.$new();

		mortgageController = $controller('mortgageController', {
            $scope: scope, mortgageFunctions: mortgageFunctions
        });
        
    }));

	/*
	This 1st test does not format the number as currency or even (number,2) so it will be expected the whole result with many number after '.'
	*/
    it('T1 - should monthlyPayment 876.0412137015448 when Amount=$100,000, Interest=1%, and Period=10 years', function () {
		scope.mortgage  = {amount:100000, interest:1, period:10, monthlyPayment:0};
		scope.calculate();
        expect(scope.mortgage.monthlyPayment).toBe(876.0412137015448);
    });
	
	/*
	This 2nd test expects a formatted number (as Currency)
	*/
	it('T2 - should monthlyPayment be $2,427.11 when Amount=$320,000, Interest=71%, and Period=21 years', function () {
		scope.mortgage  = {amount:320000, interest:7, period:21, monthlyPayment:0};
		scope.calculate();
		expect(scope.mortgage.monthlyPaymentAsCurrency).toBe('$2,427.11');
    });
	
	/*
	This 3rd test expects that the Payment for Month 3 will be correct considering the Amortization Table
	*/
	it('T3 - should have month #3 Payment to be $567.00 when Amount=$320,000, Interest=71%, and Period=21 years', function () {
		scope.mortgage  = {amount:320000, interest:7, period:21, monthlyPayment:0};
		scope.calculate();
		
		//var month3Payment = mortgageFunctions.getPaymentForMonthX(scope.mortgage.amount, scope.mortgage.interest, scope.mortgage.period);
		
		expect(scope.month3).toBe('$567.00');
    });
	
	/*
	This 4th test is similar to the 1st but expects that the monthly payment be returned as Currency
	(just to force Error)
	*/
	/*
	it('T4 - should monthlyPayment $876.04 when Amount=$100,000, Interest=1%, and Period=10 years', function () {
		scope.mortgage  = {amount:100000, interest:1, period:10, monthlyPayment:0};
		scope.calculate();
        expect(scope.mortgage.monthlyPayment).toBe('$876.04');
    });
	*/
	
	/*
	If wholy integrated with ASP.net code, we could use the same Mortgage Object parameters like [email]
	Then we could test that the Email Field should be NULL + Sent Attribute should be FALSE
	*/
	it('T5 - should Email be NOT SET just after calculating', function () {
		scope.mortgage  = {amount:100000, interest:1, period:10, monthlyPayment:0};
		scope.calculate();
		//expect(scope.mortgage.email).toBe("msferreira@gmail.com");
		expect(scope.mortgage.email).toBe("");
    });
	
	it('T6 - should Sent flag be FALSE just after calculating', function () {
		scope.mortgage  = {amount:100000, interest:1, period:10, monthlyPayment:0};
		scope.calculate();
		expect(scope.mortgage.sent).toBeFalsy();
    });
});