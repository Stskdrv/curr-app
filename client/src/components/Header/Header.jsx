import React from "react";
import styled from 'styled-components';

const HeaderContainer = styled.div`
  border-bottom: 2px solid grey;
  margin-bottom: 3em;
`;

const Title = styled.p`
  margin: 5px;
  font-size: 22px;
  font-weight: bold;
  color: #205ea9;
`;

const SubTitle = styled.p`
  margin: 3px;      
  font-size: 14px;
  font-weight: normal;
  color: grey;
`;


const Header = ({ amount, sourceCurrency, targetCurrency, exchangeRate, targetAmount }) => {

  const rate = amount !== '0.00' ? exchangeRate : 'Please, insert amount to see rate!';

  return (
    <HeaderContainer >
      <SubTitle data-testid="source-currency">
        {`${amount || '0.00'} ${sourceCurrency} entspricht, rate: ${rate}`}
      </SubTitle>
      <Title data-testid="target-amount">
        {`${targetAmount || '0.00'} ${targetCurrency}`}
      </Title>
    </HeaderContainer>
  );
};

export default Header;