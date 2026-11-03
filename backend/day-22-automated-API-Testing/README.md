# DAY 22 automated API Testing

## Personal experience
making test cases i got a major part to do after building things i tried to make it and it worked and kinda found it boring as write code then write tests for those code but watching it passes it is nice , finally did it.


## Unit testing

this is a kind of testing in which we test only the single components, single logic in a isolated environment(sandbox).

## Integration testing

this is a kind of testing in which we actually test all the components working together with actual data not in sandbox or dummy data

## assertions 
these are the check points having cases , looks at if the code works as expected  if pass then move to next test and if fails then throw error and move to next test 


## Test cases i built
this time i used supertest and vitest and setup the vitest.config.ts for global and also made a folder having 
test/integration
test/unit

and built all test in a single file tests/integration/app.api.test.js

-  Valid user creation returns 201.
- Missing name returns 400.
- Invalid email returns 400.
- Duplicate user returns your chosen error status.
- Unknown route returns 404.
- Unexpected error returns 500.