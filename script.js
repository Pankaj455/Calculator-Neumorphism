"use strict"
const currentInput = document.querySelector(".curr")
const prevInput = document.querySelector(".prev")
const point = document.querySelector(".point")
const del = document.querySelector(".delete")
const clear = document.querySelector(".clear")
const compute = document.querySelector(".solve")
const nums = document.querySelectorAll(".nums")
const operators = document.querySelectorAll(".operators")
compute.addEventListener("click", solve)
del.addEventListener("click", setInput)
clear.addEventListener("click", clearInput)
point.addEventListener("click", () => { if (currentInput.innerText.indexOf(".") == -1) currentInput.innerText += "." })
let toEraseInput = false
let leftOperand, rightOperand, currentOperator, previousOperator, state = 1;

nums.forEach(num => {
    num.addEventListener("click", () => {
        if (toEraseInput) {
            toEraseInput = false
            currentInput.innerText = "0"
            prevInput.innerText = ""
        }
        if (currentInput.innerText.length == 1 && currentInput.innerText[0] == "0")
            currentInput.innerText = num.innerText
        else
            currentInput.innerText += num.innerText
    })
})

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if (previousOperator != currentOperator) previousOperator = operator.innerText
        let ans;
        rightOperand = currentInput.innerText
        if (state > 1) {
            currentOperator = operator.innerText
            ans = operate(previousOperator)
        }
        else {
            ans = rightOperand
            currentOperator = operator.innerText
            currentInput.innerText = "0"
            state++
        }
        currentInput.innerText = "0"
        if (!isFinite(ans) || isNaN(ans)) {
            prevInput.innerText = isNaN(ans) ? "Undefined" : "Infinity"
            state = 1
            return
        }
        else prevInput.innerText = ans + currentOperator
        leftOperand = ans
        previousOperator = currentOperator

    })
})

function solve() {
    if (prevInput.innerText == "") return
    let ans;
    let text = prevInput.innerText
    let operator = text.slice(text.length - 1)
    rightOperand = currentInput.innerText.slice(0)
    ans = operate(operator)
    prevInput.innerText += currentInput.innerText
    currentInput.innerText = ans + ""
    state = 1
    toEraseInput = true
}

function setInput() {
    let text = currentInput.innerText
    if (text.length > 1) currentInput.innerText = text.slice(0, text.length - 1)
    else currentInput.innerText = "0"
}

function clearInput() {
    if (currentInput.innerText != "0") currentInput.innerText = "0"
    if (prevInput.innerText.length > 0) prevInput.innerText = ""
    state = 1
}

function operate(op) {
    let ans;
    switch (op) {
        case "+": ans = Number(leftOperand) + Number(rightOperand); break;
        case "-": ans = Number(leftOperand) - Number(rightOperand); break;
        case "x": ans = Number(leftOperand) * Number(rightOperand); break;
        case "/": ans = Number(leftOperand) / Number(rightOperand); break;
    }
    if (!isFinite(ans) || isNaN(ans)) {
        ans = isNaN(ans) ? "Undefined" : "Infinity"
        toEraseInput = true
    }
    return ans;
}

