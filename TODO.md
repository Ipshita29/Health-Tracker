# TODO for Login/Signup and Navigation Fixes

## Step 1: Update Login.jsx
- Modify handleLogin to check user credentials from AsyncStorage instead of server API.
- On successful login, set 'loggedIn' flag in AsyncStorage.
- Navigate to HomeScreen after success.

## Step 2: Update App.js
- Add logic to check 'loggedIn' flag on app start.
- Set initialRouteName to 'HomeScreen' if logged in, else 'SignUp'.
- Handle async check with useState and useEffect.

## Step 3: Update HomeScreen.jsx
- Add a logout button that removes 'loggedIn' flag and navigates to Login.

## Step 4: Update Profile.jsx
- Fetch user data from AsyncStorage and display the user's name.
- Style the profile screen appropriately.

## Step 5: Test the flow
- Ensure signup stores data, login checks it, navigation works, logout clears flag.
