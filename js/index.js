
const billAmount = document.querySelector("#amount");
const selectionTips = document.querySelectorAll('input[name="tips"]');
const customInput = document.querySelector("#custom-input");
const numberClient = document.querySelector("#number-people");
const btnClass = document.querySelector(".reset-btn");
const btnTrue = document.querySelector("button").classList;
const errorMsg = document.querySelector(".people").classList;
const radios = document.querySelectorAll('input[type="radio"]');
var tipOriginalText = document.querySelector(".tip-amount").innerHTML;
var totalOriginalText = document.querySelector(".total-amount").innerHTML;
var theAmount;
var inputClient;
var percent;

billAmount.addEventListener("input", function () {
  theAmount = Number(billAmount.value);
  if (percent > 0)
    btnClass.classList.add("ready");
  calculationTips();
});

customInput.addEventListener("click", function () {
  for (let i = 0; i < radios.length; i++)
    radios[i].checked = false;
  percent = Number(customInput.value);
  calculationTips();
});

customInput.addEventListener("input", function () {
  percent = Number(customInput.value);
  calculationTips();
});


for (let i = 0; i < selectionTips.length; i++) {
  selectionTips[i].addEventListener("change", function () {
    percent = Number(selectionTips[i].value);
    if (theAmount > 0)
      btnClass.classList.add("ready");
    if (theAmount > 0 && percent != undefined && (inputClient == undefined || inputClient == false)) {
      errorMsg.add("peopleSpan");
    } else
      calculationTips();
  });
}

numberClient.addEventListener("input", function () {
  inputClient = Number(numberClient.value);
  if (inputClient >= 1) {
    errorMsg.remove("peopleSpan");
    calculationTips();
  }
  else errorMsg.add("peopleSpan");
});

function calculationTips() {
  let tipAmount = (theAmount * (percent / 100)) / inputClient;
  let totalAmount = tipAmount + (theAmount / inputClient);
  if (theAmount > 0 && percent > 0 && inputClient > 0) {
    formatAmount(tipAmount, ".tip-amount");
    formatAmount(totalAmount, ".total-amount");
  }
}

function formatAmount(money, option) {
  let formattedAmount = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' });
  return document.querySelector(option).innerHTML = formattedAmount.format(money);
}

btnClass.addEventListener("click", function () {
  if (btnTrue.contains("ready")) {
    numberClient.value = "";
    customInput.value = "";
    billAmount.value = "";
    inputClient = "";
    theAmount = "";
    percent = "";
    if (document.querySelector('input[name="tips"]:checked'))
      document.querySelector('input[name="tips"]:checked').checked = false;
    errorMsg.remove("peopleSpan")
    document.querySelector(".tip-amount").innerHTML = tipOriginalText;
    document.querySelector(".total-amount").innerHTML = totalOriginalText;
    btnClass.classList.remove("ready");
  }
})