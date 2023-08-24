import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const RowWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  margin-inline: 0.5rem;
  width: 100%;
`;

const StyledSelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  margin-inline: 0.5rem;
  width: 100%;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: -10px;
`;


const CurrencyRow = ({ amount, handleChangeAmount, selectedCurrency, handleChangeCurrency, currencyNames }) => {

    const [isValidAmount, setIsValidAmount] = useState(true);

    useEffect(() => {
        setIsValidAmount(validateInput(amount));
    }, [amount])

    const validateInput = (inputValue) => {
        return /^\d+(\.\d{2})?$/.test(inputValue);
    };

    const handleKeyPress = (e) => {
        const keyCode = e.which || e.keyCode;
        const validKeyCodes = [8, 9, 13, 27, 46, 190, 110];
        const isValidKeyCode = validKeyCodes.includes(keyCode);
        
        if (!isValidKeyCode && !/\d/.test(String.fromCharCode(keyCode))) {
          e.preventDefault();
        }
      };

    return (
        <>
            <RowWrapper>
                <StyledInput
                    type="number"
                    placeholder='0.00'
                    value={amount}
                    onChange={handleChangeAmount}
                    onKeyDown={handleKeyPress}
                />
                <StyledSelect
                    value={selectedCurrency}
                    onChange={handleChangeCurrency}
                >
                    {currencyNames.map((item) => (
                        <option key={item.abw} value={item.abw}>
                            {item.name}
                        </option>
                    ))}
                </StyledSelect>

            </RowWrapper>
            {!isValidAmount && <ErrorText>Please enter a valid amount with two decimal places.</ErrorText>}
        </>

    )
};

export default CurrencyRow;