
const calculateExchangeRate = (sourceCurrency, targetCurrency, exchangeRateData) =>  {

    const baseCurr = exchangeRateData.Abase
    
    const baseCurrencyRate = exchangeRateData.rates[baseCurr];

    const baseToSourceRate = 1 / exchangeRateData.rates[sourceCurrency];
    const baseToTargetRate = 1 / exchangeRateData.rates[targetCurrency];
    
    const exchangeRate = (baseToSourceRate / baseToTargetRate ) * baseCurrencyRate;
    
    return exchangeRate;
};

export default calculateExchangeRate;
