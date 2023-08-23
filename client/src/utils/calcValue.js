
const calculateExchangeRate = (sourceCurrency, targetCurrency, exchangeRateData) =>  {

    const baseCurr = exchangeRateData.Abase
    
    const baseCurrencyRate = exchangeRateData.rates[baseCurr];
    
    const exchangeRate = (exchangeRateData.rates[targetCurrency] / exchangeRateData.rates[sourceCurrency] ) * baseCurrencyRate;
    
    return exchangeRate;
};

export default calculateExchangeRate;
