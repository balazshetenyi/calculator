let total = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

document.querySelector(".calc-buttons").addEventListener("click", (event) => {
    buttonClick(event.target.innerHTML)
})

const buttonClick = (value) => {
    console.log(value)
    if (isNaN(parseInt(value))) {
        handleSymbol(value)
    } else {
        handleNumber(value)
    }
    rerender()
}

const handleNumber = (value) => {
    if (buffer === "0") {
        buffer = value
    } else {
        buffer += value
    }
}

const handleSymbol = (value) => {
    switch (value) {
        case 'C':
            buffer = "0"
            total = 0
            previousOperator = null
            break
        case '=':
            if (previousOperator === null) {
                return
            }
            flushOperation(parseInt(buffer))
            previousOperator = null
            buffer = "" + total 
            total = 0
            break
        case '←':
            if (buffer.length === 1) {
                buffer = "0"
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break
        case "+":
        case "-":
        case "*":
        case "÷":
            handleMath(value)
            break
    }
}

const handleMath = (value) => {
    if (buffer === "0") {
        return
    }

    const intBuffer = parseInt(buffer)
    if (total === 0) {
        total = intBuffer
    } else {
        flushOperation(intBuffer)
    }

    previousOperator = value

    buffer = "0"
}

const flushOperation = (intBuffer) => {
    if (previousOperator === "+") {
        total += intBuffer
    } else if (previousOperator === "-") {
        total -= intBuffer
    } else if (previousOperator === "*") {
        total *= intBuffer
    } else {
        total /= intBuffer
    }
}

const rerender = () => {
    screen.innerHTML = buffer
}