# List Survey

> ## Success case
1. ❌ Receive a **GET** http request on the **api/surveys** route.
2. ❌ Validate if the request was made by a user.
3. ❌ Return **200** with the user's data

> ## Exception
1. ❌ Return error **404** if API does not exist.
2. ❌ Return error **403** if it's not a user.
3. ❌ Return an error 500 if an error occurs while trying to list the survey.
