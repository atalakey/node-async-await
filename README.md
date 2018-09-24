# node-async-await

A NodeJS app.

The app demonstrate how async/await works.

## App description (two apps)

### app-promises.js

A simple app that implements the same method once with the good old promise chaining and another with the async/await new way of writing asynchronous code.

### currency-convert.js

A currency converter app that uses the axios promise based HTTP client with the async/await syntax to make HTTP GET requests to Fixer API to get the exchange rates and REST Countries API to get the list of countries that use the currency converted to and print that information to the console.

## Installation

Be sure to have NodeJS installed.

### Prerequisites:

```
1. You must have nodejs installed.
2. It is recommended to have nodemon installed globally.
3. You must have a Fixer API Access Key.
```

### To install the prerequisites (macOS only)

```
1. Install Homebrew:

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. Install nodejs:

    brew install node

3. Install nodemon globally:

    npm install -g nodemon
```

### To obtain the pre required API key

```
Fixer API Access Key:

    visit https://fixer.io and create an account.
```

### To use the application:

``` 
1. Clone the project:

    git clone https://github.com/atalakey/node-async-await.git ~/Desktop/node-async-await

2. Navigate to where you cloned the project:

    cd ~/Desktop/node-async-await

3. Install App local packages:

    npm install

4. Add your Fixer API Access Key to:

    Desktop/node-async-await/currency-convert.js
```

## Run the App

```
- run the app-promises.js app:

    node app-promises.js

- run the currency-convert.js app:

    node currency-convert.js

- run the currency-convert.js app and watch any changes:

    nodemon currency-convert.js
```

# Disclaimer:

This app is for demo purposes only.
