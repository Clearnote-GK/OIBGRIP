
class Calculator {
    constructor(prevOpTxtEl, currOpTxtEl) {
        this.prevOpTxtEl = prevOpTxtEl
        this.currOpTxtEl = currOpTxtEl
        this.clear()
    }

    clear() {
        this.currOp = ''
        this.prevOp = ''
        this.operation = undefined
    }

    delete() {
        this.currOp = this.currOp.toString().slice(0, -1)
    }

    appendNum(number) {
        if (number === '.' && this.currOp.includes('.')) return
        this.currOp = this.currOp.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currOp === '') return
        if (this.prevOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOp = this.currOp
        this.currOp = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOp)
        const curr = parseFloat(this.currOp)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case 'x':
                computation = prev * curr
                break
            case '/':
                computation = prev / curr
                break
            default:
                return
        }
        this.currOp = computation
        this.operation = undefined
        this.prevOp = ''
    }

    getDispNum(number) {
        const stringNum = number.toString()
        const integerDigs = parseFloat(stringNum.split('.')[0])
        const decimalDigs = stringNum.split('.')[1]
        let integerDisp
        if (isNaN(integerDigs)) {
            integerDisp = ''
        }
        else {
            integerDisp = integerDigs.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigs != null) {
            return `${integerDisp}.${decimalDigs}`
        }
        else {
            return integerDisp
        }
    }

    updateDisp() {
        this.currOpTxtEl.innerText = this.getDispNum(this.currOp)
        if (this.operation != null) {
            this.prevOpTxtEl.innerText = `${this.getDispNum(this.prevOp)} ${this.operation}`
        }
        else {
            this.prevOpTxtEl.innerText = ''
        }
    }
}

const numB = document.querySelectorAll('[data-number]')
const operationB = document.querySelectorAll('[data-operation]')
const equalsB = document.querySelector('[data-equals]')
const deleteB = document.querySelector('[data-delete]')
const AllCB = document.querySelector('[data-all-clear]')
const prevOpTxtEl = document.querySelector('[data-prev-operand]')
const currOpTxtEl = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(prevOpTxtEl, currOpTxtEl)

numB.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisp()
    })
})

operationB.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisp()
    })
})

equalsB.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisp()
})

AllCB.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisp()
})
deleteB.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisp()
})
