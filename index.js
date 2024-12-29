const passwordLength = document.querySelector("#password-length-number");
const passwordRange = document.querySelector("#password-length-range");
const indicator = document.querySelector("#strength-indicator");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const symbolCheck = document.querySelector("#symbols");
const numberCheck = document.querySelector("#numbers");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const copyMsg = document.querySelector("#copy-msg");
const copyBtn = document.querySelector("#copy-btn");
const passwordDisplay = document.querySelector("#password-display");
const generateBtn = document.querySelector("#password-generate-btn");

let checkCount = 0;
let password = "";
let defPassword = 10;
setIndicator("#ccc");
function handleSlider() {
  passwordRange.value = defPassword;
  passwordLength.innerText = defPassword;
}

handleSlider();

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateUpperCase() {
  return String.fromCharCode(generateRandomNumber(65, 90));
}

function generateLowerCase() {
  return String.fromCharCode(generateRandomNumber(97, 123));
}
function generateNumber() {
  return generateRandomNumber(0, 9);
}
function generateSymbol() {
  let num = generateRandomNumber(0, symbols.length);
  return symbols.charAt(num);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasSym = false;
  let hasNum = false;

  if (uppercaseCheck.checked) {
    hasUpper = true;
  }
  if (lowercaseCheck.checked) {
    hasLower = true;
  }
  if (symbolCheck.checked) {
    hasSym = true;
  }
  if (numberCheck.checked) {
    hasNum = true;
  }

  if (hasSym && (hasLower || hasNum) && defPassword >= 8) {
    setIndicator("#0f0");
  } else if (hasUpper && (hasSym || hasNum) && defPassword >= 6) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyButton() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }

}

function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    //swap number at i index and j index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });

  if (defPassword < checkCount) {
    defPassword = checkCount;
    handleSlider();
  }
}

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyButton();

    copyMsg.innerText="copied";

  setTimeout(() => {
    copyMsg.innerText="";
  }, 2000);
  }
});

passwordRange.addEventListener("input", (e) => {
  defPassword = e.target.value;
  handleSlider();
});

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

generateBtn.addEventListener("click", () => {
  if (checkCount == 0) {
    return;
  }

  if (defPassword < checkCount) {
    defPassword = checkCount;
    handleSlider();
  }

  password = "";

  let arr = [];

  if (uppercaseCheck.checked) {
    arr.push(generateUpperCase());
  }
  if (lowercaseCheck.checked) {
    arr.push(generateLowerCase());
  }
  if (numberCheck.checked) {
    arr.push(generateNumber());
  }
  if (symbolCheck.checked) {
    arr.push(generateSymbol());
  }

  for (let i = 0; i < arr.length; i++) {
    password += arr[i];
  }

  for (let i = arr.length -1; i < defPassword; i++) {
    let random = String.fromCharCode(generateRandomNumber(65,123));
    password += random;
  }

  password = shufflePassword(Array.from(password));
  passwordDisplay.value = password;

  calcStrength();
});
