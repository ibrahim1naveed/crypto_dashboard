import React from 'react'
import ExchangeRate from './ExchangeRate'
import { useState } from 'react';
import axios from "axios";

const CurrencyConverter = () => {

    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA'];
    const [chosenCurrencyOne, setChosenCurrencyOne] = useState('BTC'); //This is the currency the user chooses to convert from.
    const [chosenCurrencyTwo, setChosenCurrencyTwo] = useState('USD'); //This is the currency the user choses to convert to.
    const [amount, setAmount] = useState(1);//This is the result of the currency conversion from one to two.
    const [exchangedData, setExchangedData] = useState({ //This is the prop we pass into ExchangeRate.js to display info in that component. 
        primaryCurrency: 'BTC',
        secondaryCurrency: 'USD',
        exchangeRate: 0
    });
    const [result, setResult] = useState(0); //This is the `amount * exchange rate` value we get to display in our input box.

    const convertCurrency = () => {

        const options = {
          method: 'GET',
          url: 'https://alpha-vantage.p.rapidapi.com/query',
          params: {from_currency: chosenCurrencyOne, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenCurrencyTwo},
          headers: {
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
            'X-RapidAPI-Key': '995aec3bc7mshc37bef82e58bb35p1ab841jsne8ad9b11a7fe'
          }
        };
        
        axios.request(options).then((response) => {
            const value = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            const value_into_primary = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount;
            const final_result = Math.round(value_into_primary * 100) / 100;
            setResult(final_result);
            setExchangedData({
                primaryCurrency: chosenCurrencyOne,
                secondaryCurrency: chosenCurrencyTwo,
                exchangeRate: Math.round(value * 100) / 100
            });
        }).catch((error) => {
            console.error(error);
        });

    }
    




  return (
    <div className="currency-converter">
        <h2> Currency Converter </h2>
        <div className="input-box">
            <table>
                <tbody>
                    <tr>
                        <td>Primary Currency: {chosenCurrencyOne}</td>
                        <td>
                            <input type="number" name="currency-amount-1" value={amount} onChange={(e) => setAmount(e.target.value)}/> 
                        </td>
                        <td>
                            <select
                            value={chosenCurrencyOne}
                            name="currency-option-1"
                            className="currency-options"
                            onChange={(e) => setChosenCurrencyOne(e.target.value)}>
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>

                    </tr>

                    <tr>
                        <td>Secondary Currency: {chosenCurrencyTwo}</td>
                        <td>
                            <input type="number" name="currency-amount-2" value={result} disabled={true}/> 
                        </td>
                        <td>
                            <select
                            value={chosenCurrencyTwo}
                            name="currency-option-2"
                            className="currency-options"
                            onChange={(e) => setChosenCurrencyTwo(e.target.value)}>
                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>

                    </tr>
                </tbody>
            </table>

            <button className="convert-button" onClick={convertCurrency}>Convert</button>


        </div>



        <ExchangeRate
        exchangedData={exchangedData}
        />
    </div>
  )
}

export default CurrencyConverter;
