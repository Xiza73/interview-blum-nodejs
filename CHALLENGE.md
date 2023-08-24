This serverless app is invoked when an AWS ApiGateway receives a GET /customers request. It uses the [Random User API](https://randomuser.me) to get user data (name, last name).

Challenges:

- The Random User API contains the user's phone number. Change the code to include in the API response also the phone number.
- Identify ways to change the code to improve its quality.

The results will be evaluated during the interview.

# Solution I

- Add property `phoneNumber` to the Customer class
- Add property `phone` to the RandomUser type, because type RandomUser represents the response from the Random User API
- Update CustomerRepository.test.ts to include the new property on the expected result
- Update CustomerRepository.ts to include the new property on the Customer object and fix the test
- CustomerService.ts destructures the phone number from the RandomUser object and assigns it to the Customer object, so no changes are needed, but the test needs to be updated to include the new property on the expected result
- CustomerController.ts also destructures the phone number from the Customer object and assigns it to the response object, so no changes are needed, but the test needs to be updated to include the new property on the expected result
