import axios from "axios";

const apiInstance = axios.create({
    baseURL: 'http://localhost:8087',
  });


export const getCurrencyNames = () => {
    return apiInstance.get('/currency-names');
};

export const getCurrencyRates = () => {
    return apiInstance.get('/currencies');
};