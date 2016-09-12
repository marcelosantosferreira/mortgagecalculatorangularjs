## Synopsis

A Mortgage Calculator prototype (a test for a job position).
Intended to be integrated with a ASP.Net MVC project - published here as well [mortgagecalculatoraspnetmvc]

## Built using

AngularJS

## My Goal

Conceive a simple interface providing the user with the Monthly Payment value + Amortization Table to be used on the ASP.net MVC project (mortgagecalculatoraspnetmvc).

## Main Page

app/index.html

## Necessary Packages

Jasmine
	npm install jasmine-core --save-dev

Karma
	npm install karma-cli -g

karma-jasmine plugin
	npm install karma-jasmine --save-dev

PhantomJS
	npm install phantomjs karma-phantomjs-launcher karma-chrome-launcher --save-dev

Angular Mocks
	bower install angular-mocks -S

## Tests

Access the [test] folder and type:

karma start karma.conf.js