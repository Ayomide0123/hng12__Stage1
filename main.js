const targetColorBox = document.querySelector('[data-testid="colorBox"]');
const optionsContainer = document.querySelector('[data-testid="colorOption"]');
const resultMessage = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const resetButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let correctColor;

// Function to generate a random color with hex.
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to generate the 6 different color options.
function generateOptions() {
  const options = [];
  correctColor = getRandomColor();
  targetColorBox.style.backgroundColor = correctColor;

  options.push(correctColor);

  for (let i = 0; i < 5; i++) {
    options.push(getRandomColor());
  }

  return options.sort(() => Math.random() - 0.5);
}

// Function to render the options as buttons.
function renderOptions() {
  const options = generateOptions();
  optionsContainer.innerHTML = '';
  options.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.addEventListener('click', () => checkAnswer(color));
    optionsContainer.appendChild(button);
  });
}

// Function to see if the selected color is correct.
function checkAnswer(selectedColor) {
  if (selectedColor === correctColor) {
    resultMessage.textContent = 'Correct! 🎉';
    resultMessage.style.color = 'green';
    score++;
    scoreDisplay.textContent = score;
    targetColorBox.classList.add('correct');

    // Continue the game after a short delay
    setTimeout(() => {
      resultMessage.textContent = '';
      targetColorBox.classList.remove('correct');
      renderOptions();
    }, 1000);
  } else {
    resultMessage.textContent = 'Wrong! Try again. 😢';
    resultMessage.style.color = 'red';
    targetColorBox.classList.add('wrong');

    // Remove animations after a delay
    setTimeout(() => {
      targetColorBox.classList.remove('wrong');
    }, 1000);
  }
}

// Function to start the game again.
function resetGame() {
  score = 0;
  scoreDisplay.textContent = score;
  resultMessage.textContent = '';
  renderOptions();
}

resetButton.addEventListener('click', resetGame);

// Start the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  resetGame();
});
