import { targetInput, sequentialBtn, resultContainer } from './elements.js';

let CHARACTERS = [];

for (let i = 0; i < 128; i++) {
  CHARACTERS.push(String.fromCharCode(i));
}

sequentialBtn.onclick = (e) => {
  e.preventDefault();

  const targetText = targetInput.value;

  console.time();
  const write = (currentText) => {
    try {
      // base case
      if (currentText === targetText.toLowerCase()) {
        return;
      }
  
      const currentTargetChar = targetText[currentText.length].toLowerCase();
      const nextChar = CHARACTERS.find(char => char === currentTargetChar);
      const newText = `${currentText}${nextChar}`;
  
      // User Feedback
      resultContainer.innerText = newText;
  
      // Repeat
      write(newText);
    } catch (error) {
      debugger;
    }
  }
  write('');
  console.timeEnd();
}