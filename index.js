let randomValue = 0;
let valueOfStart = '';
let valueOfCheck = '';
let numberOfMoves = 1;
const tableForAppend = document.getElementById("for_append");

const button_start = document.getElementById('button_start');
button_start.addEventListener("click", () => {
    if(checkIfCorrectChosen(chooseNumberInput.value)) {
        randomValue = createRandomDigits(chooseNumberInput.value);
        valueOfStart += chooseNumberInput.value;
        console.log(randomValue);
        console.log(valueOfStart);
        tableForAppend.innerHTML += createRow(numberOfMoves++, cows(randomValue,valueOfCheck), bulls(randomValue,valueOfCheck));
        console.log(randomValue);



    }
});

const chooseNumberInput = document.getElementById("choose_number_input");

const checkInput = document.getElementById('check_number');

const checkBtn = document.getElementById('check_number_btn');
checkBtn.addEventListener("click", () => {
    if (checkIfLengthsAreEqual(randomValue, checkInput.value)) {
        valueOfCheck = checkInput.value;
        console.log("works");
        console.log();
        console.log(bulls(randomValue, valueOfCheck));
        tableForAppend.innerHTML += createRow(numberOfMoves++, cows(randomValue,valueOfCheck), bulls(randomValue,valueOfCheck));

    }
    else {
        alert("Неверный ввод");
        valueOfCheck = '';
    }

})

//проверяет верность ввода у первого инпута.
function checkIfCorrectChosen(firsInputStr) {
    if(isFinite(firsInputStr) && +firsInputStr >= 3 && +firsInputStr <= 6)
    return true;
    else
        chooseNumberInput.value = '';
        alert("Неверный ввод");
}
//сравнивает длину введённого числа с выбранным
function checkIfLengthsAreEqual(randomValue, secondInput) {
    if(String(randomValue).length === secondInput.length && isFinite(secondInput)) {
        return true;
    }
    else {
        checkInput.value = '';
        valueOfCheck = '';
    }
}

//создаёт рандомное значение, в зависимости от выбранной сложности
function createRandomDigits (numberOfDigits)  {
    let res = ''
    let nums = +numberOfDigits;
    for (let i = 0; i < nums ; i++) {
        res += Math.floor(Math.random() * (9 + 1));
    }
    return res;

}

function cows(inputNumber, randomValue) {
    let res = 0;
    let index = 0;
    randomValue.split('').forEach(el => {
        if (randomValue.includes(inputNumber[index]) && randomValue.indexOf(el) !== inputNumber.indexOf(el)) {
            index++
            res++;
        } else {
            index++;

        }

    })
    return res;
}

function bulls(randomValue, inputNumber) {
    let res = 0;
    let index = 0;

    randomValue.split('').forEach(el => {

        if (randomValue.includes(inputNumber[index]) && randomValue.indexOf(el) === inputNumber.indexOf(el)) {
            index++
            res++;
        } else {
            index++;
        }
    })
    return res;
}



function createRow(numberOfMoves, cows, bulls) {
    return `<tr><th scope="row">${numberOfMoves}<td>${bulls}</td><td>${cows}</td></tr></th>`.toString();

}

