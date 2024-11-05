
const primerMoneda = document.querySelector("#primerMoneda");
const segundMoneda = document.querySelector("#segundaMoneda");



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

