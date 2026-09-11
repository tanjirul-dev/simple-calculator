let display = document.getElementById('display');

// Append number to display
function appendNumber(num) {
    display.value += num;
}

// Append operator to display
function appendOperator(op) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent multiple operators in a row
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
        return;
    }
    
    // Prevent operator if display is empty
    if (display.value === '') {
        return;
    }
    
    display.value += op;
}

// Clear the display
function clearDisplay() {
    display.value = '';
}

// Delete last character
function deleteLast() {
    display.value = display.value.toString().slice(0, -1);
}

// Calculate the result
function calculate() {
    try {
        // Validate the expression
        const expression = display.value;
        
        if (expression === '') {
            return;
        }
        
        // Check for invalid operators at the end
        const lastChar = expression[expression.length - 1];
        if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
            display.value = 'Error';
            return;
        }
        
        // Evaluate the expression safely
        const result = Function('"use strict"; return (' + expression + ')')();
        
        // Display result with proper formatting
        if (Number.isInteger(result)) {
            display.value = result;
        } else {
            display.value = parseFloat(result.toFixed(10));
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});