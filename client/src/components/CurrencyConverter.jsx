import React, { useState, useEffect, useCallback } from 'react';
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

const ErrorWrapper = styled.div`
  justify-content: center; 
  text-align: center;
  color: #ca1616;
  font-size: 25px;
`;

const LoadingWrapper = styled.div`
  align-self: center;
  text-align: center;
  color: #205ea9;
  font-size: 25px;
`;

const CurrencyConverter = () => {

    const [currencyNames, setCurrencyNames] = useState([]);
    const [sourceCurrency, setSourceCurrency] = useState();
    const [targetCurrency, setTargetCurrency] = useState();
    const [isForward, setisForward] = useState(true);
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState('1.00');
    const [error, serError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    let sourceAmount;
    let targetAmount;

    if (isForward) {
        sourceAmount = amount;
        targetAmount = (amount * exchangeRate).toFixed(2);
    } else {
        targetAmount = amount;
        sourceAmount = (amount / exchangeRate).toFixed(2);
    };

    const fetchCurrencyNames = useCallback(
        async () => {
            try {
                const response = await getCurrencyNames();
                const names = modifyNames(response.data);
                !sourceCurrency && setSourceCurrency(names[0].abw)
                !targetCurrency && setTargetCurrency(names[1].abw)
                setCurrencyNames(names);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching currency names:', error);
                serError(error);
                setIsLoading(false);
            }
        },
      [sourceCurrency, targetCurrency],
    );

    const fetchExchangeRate = useCallback(
        async () => {
            try {
                const response = await getCurrencyRates();
                setExchangeRate(calculateExchangeRate(sourceCurrency, targetCurrency, response.data));
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
                serError(error);
                setIsLoading(false);
                setIsLoading(false);
            }
        },
      [sourceCurrency, targetCurrency],
    );

    useEffect(() => {
        setIsLoading(true);
        fetchCurrencyNames();
        fetchExchangeRate();
    }, [fetchCurrencyNames, fetchExchangeRate, sourceCurrency, targetCurrency]);

    const handleChangeSourceAmount = (e) => {
        setisForward(true);
        setAmount(e.target.value);
    };

    const handleChangeTargetAmount = (e) => {
        setisForward(false);
        setAmount(e.target.value);
    };

    if (error) {
        return (
            <Container>
                <MainContent>
                    <ErrorWrapper>
                        Sorry, something went wrong...
                        <br />
                        Error: {error.message}
                    </ErrorWrapper>
                </MainContent>
            </Container>
        );
    };

    if (isLoading) {
        return (
            <Container>
                <MainContent>
                    <LoadingWrapper>
                        Loading...
                    </LoadingWrapper>
                </MainContent>
            </Container>
        );
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