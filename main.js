
const d = document;

const primerMoneda = document.querySelector("#primerMoneda");
const segundMoneda = document.querySelector("#segundaMoneda");
const primerMontElemnt = d.querySelector("#primerMonto");
const segundMontElemnt = d.querySelector("#segundoMonto");
const buttonElemntt = d.querySelector("#btn-calcular");



const getPaises =  async () => {
    const response = await fetch("https://api.vatcomply.com/currencies")
    const paises = await response.json();
    console.log(paises);
    const currencyNames = Object.keys(paises);
    console.log(currencyNames);


    currencyNames.forEach((currencyName)=> {
        const optionElemnt = document.createElement("option");
        optionElemnt.textContent = currencyName;
        optionElemnt.value = currencyName;
        primerMoneda.appendChild(optionElemnt);
       

        const optionElemnt2 = document.createElement("option");
        optionElemnt2.textContent = currencyName;
        optionElemnt2.value = currencyName;
        segundMoneda.appendChild(optionElemnt2);
    })
}

getPaises();

async function fetchExchangeRates() {
    try {
      const response = await fetch('https://api.vatcomply.com/rates');
      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return null;
    }
  }

  function currencyDropdowns(rates) {
    const currencies = Object.keys(rates);
    const firstSelect = d.getElementById('primerMoneda');
    const secondSelect = d.getElementById('segundaMoneda');
  
    currencies.forEach(currency => {
      const option1 = new Option(currency, currency);
      const option2 = new Option(currency, currency);
      firstSelect.add(option1);
      secondSelect.add(option2);
    });
  
    
    firstSelect.value = 'USD';
    secondSelect.value = 'EUR';
  }

  function calculateExchange(rates) {
    const firstCurrency = d.getElementById('primerMoneda').value;
    const secondCurrency = d.getElementById('segundaMoneda').value;
    const firstAmount = parseFloat(d.getElementById('primerMonto').value);
  
    if (isNaN(firstAmount)) {
      alert('Please enter a valid number');
      return;
    }
  
    const exchangeRate = rates[secondCurrency] / rates[firstCurrency];
    const result = firstAmount * exchangeRate;
  
    document.getElementById('segundoMonto').value = result.toFixed(2);
    document.getElementById('cambio').textContent = 
      `1 ${firstCurrency} = ${exchangeRate.toFixed(4)} ${secondCurrency}`;
  }

  async function initApp() {
    const rates = await fetchExchangeRates();
    if (rates) {
      currencyDropdowns(rates);

      d.getElementById('btn-calcular').addEventListener('click', () => calculateExchange(rates));
  

      calculateExchange(rates);
    } else {
      alert('Failed to fetch exchange rates. Please try again later.');
    }
  }

  document.addEventListener('DOMContentLoaded', initApp);

