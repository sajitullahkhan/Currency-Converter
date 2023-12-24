import { countryList } from "./country.js";

const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const massage = document.querySelector(".massage");
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");

for (let select of dropDowns) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencyCode === "BDT") {
            newOption.selected = "selected";
        }
        select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === '' || amountValue < 1) {
        amountValue = 1;
        amount.value = "1"
    }
    let url = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalValue = amountValue * rate;
    massage.innerText = `${amountValue} ${fromCurr.value} = ${Math.floor(finalValue)} ${toCurr.value}`;
});


let converterLogo = document.querySelector(".logo");

converterLogo.addEventListener('click', () => {
    let fC = fromCurr.value;
    let tC = toCurr.value;
    toCurr.value = fC;
    fromCurr.value = tC;
    let countryCode_fC = countryList[fC];
    let countryCode_tC = countryList[tC];
    let changeFromSRC = `https://flagsapi.com/${countryCode_tC}/flat/64.png`;
    let changeToSRC = `https://flagsapi.com/${countryCode_fC}/flat/64.png`;
    let imgFrom = document.querySelector(".img-from");
    let imgTo = document.querySelector(".img-to");
    imgFrom.src = changeFromSRC;
    imgTo.src = changeToSRC;
});

