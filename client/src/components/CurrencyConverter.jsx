import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import { getCurrencyNames, getCurrencyRates } from '../services/currencyService';
import modifyNames from '../utils/modifyNames';
import calculateExchangeRate from '../utils/calcValue';
import CurrencyRow from './CurrencyRow/CurrencyRow';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const MainContent = styled.div`
  border: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  height: 220px;
  width: 520px;
  background-color: white;
`;


const CurrencyConverter = () => {

    const [currencyNames, setCurrencyNames] = useState([]);
    const [sourceCurrency, setSourceCurrency] = useState();
    const [targetCurrency, setTargetCurrency] = useState();
    const [isForward, setisForward] = useState(true);
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState('1.00');

    let sourceAmount;
    let targetAmount;

    if (isForward) {
        sourceAmount = amount;
        targetAmount = (amount * exchangeRate).toFixed(2);
    } else {
        targetAmount = amount;
        sourceAmount = (amount / exchangeRate).toFixed(2);
    };




    useEffect(() => {
        fetchCurrencyNames();
        fetchExchangeRate();
    }, [sourceCurrency, targetCurrency]);

    const fetchCurrencyNames = async () => {
        try {
            const response = await getCurrencyNames();
            console.log(response.data,'fetchCurrencyNames');
            const res = modifyNames(response.data)
            console.log(res);
            !sourceCurrency && setSourceCurrency(res[0].abw)
            !targetCurrency && setTargetCurrency(res[1].abw)
            setCurrencyNames(res);
        } catch (error) {
            console.error('Error fetching currency names:', error);
        }
    };

    const fetchExchangeRate = async () => {
        try {
            const response = await getCurrencyRates();
            console.log(response.data, 'fetchExchangeRate');
            setExchangeRate(calculateExchangeRate(sourceCurrency, targetCurrency, response.data));
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    const handleChangeSourceAmount = (e) => {
        setisForward(true);
        setAmount(e.target.value);
    };

    const handleChangeTargetAmount = (e) => {
        setisForward(false);
        setAmount(e.target.value);
    };


    return (
        <Container>
            <MainContent>
                <Header
                    amount={sourceAmount}
                    sourceCurrency={sourceCurrency}
                    targetCurrency={targetCurrency}
                    exchangeRate={exchangeRate}
                    targetAmount={targetAmount}
                />
                <CurrencyRow
                    amount={sourceAmount}
                    handleChangeAmount={handleChangeSourceAmount}
                    selectedCurrency={sourceCurrency}
                    handleChangeCurrency={(e) => setSourceCurrency(e.target.value)}
                    currencyNames={currencyNames}
                />
                <CurrencyRow
                    amount={targetAmount}
                    handleChangeAmount={handleChangeTargetAmount}
                    selectedCurrency={targetCurrency}
                    handleChangeCurrency={(e) => setTargetCurrency(e.target.value)}
                    currencyNames={currencyNames}
                />

            </MainContent>
        </Container>
    );
};

export default CurrencyConverter;