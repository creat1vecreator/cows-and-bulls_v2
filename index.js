let randomValue = 0;
let valueOfStart = '';
let valueOfCheck = '';
let numberOfMoves = 1;
let numberOfDigits = 0;
let numberOfBulls = 0;

const tableForAppend = document.getElementById("for_append");

const chooseNumberInput = document.getElementById("choose_number_input");

const checkInput = document.getElementById('check_number');

const checkBtn = document.getElementById('check_number_btn');

const button_start = document.getElementById('button_start');
button_start.addEventListener("click", () => {
    valueOfStart = chooseNumberInput.value;
    if (checkIfCorrectChosen(valueOfStart)) {
        randomValue = createRandomDigits(chooseNumberInput.value);
        numberOfDigits = +chooseNumberInput.value;
        tableForAppend.innerHTML = '';
        checkBtn.disabled = false;

    } else {
        checkBtn.disabled = true;

    }
});


checkBtn.addEventListener("click", () => {
    const inputValue = checkInput.value;
    if (checkIfLengthsAreEqual(randomValue, inputValue)) {
        valueOfCheck = checkInput.value;
        console.log("Random value:", randomValue);
        numberOfBulls = checkCowsAndBulls(randomValue, valueOfCheck)[1];
        tableForAppend.innerHTML += createRow(numberOfMoves++, checkCowsAndBulls(String(randomValue), valueOfCheck)[0], checkCowsAndBulls(String(randomValue), valueOfCheck)[1]);
        checkIfWon(numberOfBulls);


    } else {
        alert("Неверный ввод");
        valueOfCheck = '';
    }

})

//проверяет верность ввода у первого инпута.
function checkIfCorrectChosen(firsInputStr) {
    const firstInputVal = +firsInputStr
    if (isFinite(firstInputVal) && firstInputVal >= 3 && firstInputVal <= 6)
        return true;
    else
        chooseNumberInput.value = '';
    alert("Неверный ввод");
}

//сравнивает длину введённого числа с выбранным
function checkIfLengthsAreEqual(randomValue, secondInput) {
    if (String(randomValue).length === secondInput.length && isFinite(secondInput)) {
        return true;
    } else {
        checkInput.value = '';
        valueOfCheck = '';
    }
}

//создаёт рандомное значение, в зависимости от выбранной сложности
function createRandomDigits(numberOfDigits) {
    let res = [];
    let nums = +numberOfDigits;
    while (res.length < nums) {
        const num = Math.floor(Math.random() * (9 + 1));
        if(res.indexOf(num) === -1 && !(num === 0 && res.length === 0)) {

                res.push(num);
        }
    }
    return res.join('');
}

function createRow(numberOfMoves, cows, bulls) {
    return `<tr><th scope="row">${numberOfMoves}<td>${cows}</td><td>${bulls}</td></tr></th>`.toString();
}
function checkIfWon(numbersOfBullsInput) {
    if (numbersOfBullsInput === numberOfDigits) {
        alert("Поздравляем! Вы выиграли!");
        checkBtn.disabled = true;
    }
}


function checkCowsAndBulls(secret, guess) {
    let bulls = 0, cows = 0, secretMap = {}, guessMap = {};

    for (let i = 0; i < secret.length; i += 1) {
        if (secret[i] === guess[i]) {
            bulls += 1;
        } else {
            secretMap[secret[i]] = secretMap[secret[i]] + 1 || 1;
            guessMap[guess[i]] = guessMap[guess[i]] + 1 || 1;
        }
    }
    let keys = Object.keys(guessMap);
    for (let i = 0; i < keys.length; i += 1) {
        if (secretMap[keys[i]]) {
            cows += Math.min(guessMap[keys[i]], secretMap[keys[i]]);
        }
    }

    return [cows, bulls];
}
