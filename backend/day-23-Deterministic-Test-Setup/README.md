# DAY 22 Deterministic Test Setup


## what i learned
i got to learn to properly format test cases and its data before even test starts and some terms which works in order to form test cases
- test isolation
- test setup
- teardown
- test factory



## Test isolation
 
each test case should be independent and does not break any other test case if it fail or pass 

**previous code - the test case of 422 user already exist was totally dependent or 201 successfully created (if the user creation test fails then duplicate user creation test fails tooo) **


## test setup 
for the test cases we should have proper environment and data already setup for a successful test exection without any interuption of other test or user 


In this i created a whole saperate db engineering_lab_test to test the server working

for this we use `beforeAll` or `beforeEach`

## teardown 

proper clean up should be there before exiting or after all the test got ran we don't want any abundent instance to stay active 

for this we use `afterAll` or  `afterEach`


## Test Factory
this is a helper function to generate pridictable data 
this helps to repeatedly rewriting the same userData and manually inserts over and over again 

it have two parts 
object factory : generate a javascript user object with smart default.
database factory: programmatically seed that user into postgreSQL.


## beforeAll vs beforeEach

**beforeAll** = this is the global setup for all the testcases, it run once before all in its scope.
**beforeEach** - this is the local setup for all testcases, it run each time before all test cases in its scope.



## afterAll vs afterEach

**afterAll** - this is the global setup for all the testcases, it run once after all test cases are done working with in its scope
**afterEach** - this is the local setup fro all the testcases, it run every time a test case ends even if it fails or pass in its scope.

