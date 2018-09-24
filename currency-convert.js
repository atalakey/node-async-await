/*
  - Fixer is a foreign exchange rates and currency conversion JSON API.

  Base URL: http://data.fixer.io/api/
  Endpoints:
    /latest:
      description: request the most recent exchange rate data.
      URL: http://data.fixer.io/api/latest
      parameters:
        equired; access_key, base (available for paid plans)
        optional: symbols

    /historical (available for paid plans):
      description: request historical rates for a specific day.
      URL: http://data.fixer.io/api/YYYY-MM-DD
      parameters:
        required; access_key, base
        optional: symbols
    
    /convert (available for paid plans):
      description: convert any amount from one currency to another using real-time
                   exchange rates.
      URL: http://data.fixer.io/api/convert
      parameters:
        required; access_key, from, to, amount
        optional: date
    
    /timeseries (available for paid plans):
      description: request exchange rates for a specific period of time.
      URL: http://data.fixer.io/api/timeseries
      parameters:
        required; access_key, start_date, end_date
        optional: base, symbols
    
    /fluctuation (available for paid plans):
      description: request any currency's change parameters (margin and percentage),
                   optionally between two specified dates.
      URL: http://data.fixer.io/api/fluctuation
      parameters:
        required; access_key
        optional: base, symbols, start_date, end_date

  Visit https://fixer.io/quickstart to learn more.

  - Rest countries provides information about countries via a RESTful API.

  Base URL: https://restcountries.eu/rest/v2/
  Endpoints:
    /name:
      description: search by country name. It can be the native name or partial name.
      URL: https://restcountries.eu/rest/v2/name/{name}
           https://restcountries.eu/rest/v2/name/{name}?fullText=true

    /alpha:
      description: Search by 2-letter or 3-letter country code.
      URL: https://restcountries.eu/rest/v2/alpha/{code}
           https://restcountries.eu/rest/v2/alpha?codes={code};{code};{code}

    /currency:
      description: search by currency code.
      URL: https://restcountries.eu/rest/v2/currency/{currency}

    /lang:
      description: search by language code.
      URL: https://restcountries.eu/rest/v2/lang/{et}

    /capital:
      description: search by capital city.
      URL: https://restcountries.eu/rest/v2/capital/{capital}

    /callingcode:
      description: search by calling code.
      URL: https://restcountries.eu/rest/v2/callingcode/{callingcode}

    /region:
      description: search by region.
      URL: https://restcountries.eu/rest/v2/region/{region}

    /regionalbloc:
      description: search by regional bloc.
      URL: https://restcountries.eu/rest/v2/regionalbloc/{regionalbloc}

  Output of the request can be filtered using the ?fields={field};{field};{field} aparm.

  Visit https://restcountries.eu/ to learn more.
*/
const axios = require('axios');

const FIXER_API_ACCESS_KEY = '';

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${FIXER_API_ACCESS_KEY}`);
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    const countries = response.data.map((country) => country.name);
  
    return countries; 
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};

const convertCurrency = async (from, to, amount) => {
  const exchangeRate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
};

convertCurrency('USD', 'SAR', 1).then((message) => {
  console.log(message);
}).catch((e) => {
  console.log(e.message);
});
