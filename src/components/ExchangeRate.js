import React from 'react'

const ExchangeRate = ({ exchangedData }) => {

  const {primaryCurrency, secondaryCurrency, exchangeRate } = exchangedData;


  return (
    <div className="exchange-rate">
        <h3>Exchange Rate</h3>
        <h1>{secondaryCurrency}{exchangeRate}</h1>
        <p>{primaryCurrency} converted to {secondaryCurrency}</p>
    </div>
  )
}

export default ExchangeRate;
