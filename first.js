


const BASE_URL ="https://v6.exchangerate-api.com/v6/1ab62c0f46db454b27999884/latest"
const flag = "https://flagsapi.com/US/flat/64.png";

const dropdowns =document.querySelectorAll(".dropdown select");


const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for ( currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

    select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {

  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};



const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const fromCurrency = document.querySelector(".from select").value;
  const toCurrency = document.querySelector(".to select").value;

  const URL = `${BASE_URL}/${fromCurrency}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.conversion_rates[toCurrency];

    let finalAmount = amtVal * rate;

    const msg = document.querySelector(".msg");
    msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});



