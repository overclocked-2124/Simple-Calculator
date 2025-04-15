document.addEventListener('DOMContentLoaded', () => {
    const mainDisplay = document.querySelector('.main-display');
    const secondaryDisplay = document.querySelector('.secondary-display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '0';
    let expressionForSecondary = '';

    function updateDisplay() {
        mainDisplay.textContent = currentInput;
        if (expressionForSecondary) {
            secondaryDisplay.textContent = expressionForSecondary + '=';
        } else {
            secondaryDisplay.textContent = '';
        }
    }

    function buttonClick(event) {
        const value = event.target.textContent;
        expressionForSecondary = '';
        if (value === 'C') {
            currentInput = '0';
        } else if (value === '=') {
            try {
                const expressionToEvaluate = currentInput.replace(/x/g, '*');
                expressionForSecondary = currentInput;
                currentInput = String(eval(expressionToEvaluate));
                if (currentInput === 'Infinity' || currentInput === '-Infinity') {
                    currentInput = 'Error';
                    expressionForSecondary = 'Division by zero';
                }
            } catch (error) {
                currentInput = 'Error';
                expressionForSecondary = 'Invalid expression';
            }
        } else {
            if (currentInput === '0' && value !== '.' && value !== 'Error') {
                currentInput = value;
            } else if (currentInput === 'Error') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', buttonClick);
    });

    updateDisplay();
});
