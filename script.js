class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    addNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    addOperation(operation){
        if (this.currentOperand === '')return
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let calculation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                calculation = prev + curr;
                break;
            case '-':
                calculation = prev - curr;
                break;
            case '*':
                calculation = prev * curr;
                break;
            case '/':
                calculation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = calculation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    display(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;

    }
    
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const acBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalBtn = document.querySelector('[data-equal]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.display();
    })
})
operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperation(button.innerText);
        calculator.display();
    })
})
equalBtn.addEventListener('click', button =>{
    calculator.compute();
    calculator.display();
})
acBtn.addEventListener('click', button =>{
    calculator.clear();
    calculator.display();
})
deleteBtn.addEventListener('click', button =>{
    calculator.delete();
    calculator.display();
})

