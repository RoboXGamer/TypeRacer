// console.log("Hello World!");
let NO_OF_WORDS = 1;
const API_URL = `https://api.freeapi.app/api/v1/public/quotes/quote/random`;
let currentWordIndex = 0;

// Main Entry Point

const main = async function () {
  const getWords = async () => {
    const response = await fetch(API_URL);
    const {
      data: { content },
    } = await response.json();
    // console.log(content);
    const words = content.split(" ");
    NO_OF_WORDS = words.length;
    return words;
  };
  const renderInitialWords = function () {
    wordList.forEach((word) => {
      const wordElement = WORD_TEMPLATE.content
        .cloneNode(true)
        .querySelector("li");
      wordElement.textContent = word;
      wordListElm.append(wordElement);
    });
  };

  const highlightCurrentWord = function (index) {
    // const wordListElm = document.querySelector("#word-list");
    const words = wordListElm.children;
    if (index > 0) {
      words[index - 1].classList.remove("border-2", "border-dotted");
    }
    words[index].classList.add("border-2", "border-dotted");
  };

  const checkWord = function (typedWord) {
    if (typedWord === wordList[currentWordIndex]) {
      return "correct";
    }
    return "incorrect";
  };

  const wordListElm = document.querySelector("#word-list");
  wordListElm.textContent = "Loading...";
  const WORD_TEMPLATE = document.querySelector("#word-template");
  const messageElm = document.querySelector("#message");
  const textInputForm = document.querySelector("#text-form");

  const wordList = await getWords();
  wordListElm.textContent = "";
  // console.log(wordList);
  renderInitialWords();
  highlightCurrentWord(currentWordIndex);

  const handleTyping = function (e) {
    e.preventDefault();
    const typedWord = textInputForm.text.value.trim();
    // console.log(typedWord);
    const state = checkWord(typedWord);
    wordListElm.children[currentWordIndex].dataset.state = state;
    if (state === "correct") {
      wordListElm.children[currentWordIndex].classList.remove(
        "text-red-500",
        "border-red-500"
      );
      wordListElm.children[currentWordIndex].classList.add(
        "text-green-500",
        "border-green-500"
      );
      currentWordIndex++;

      if (currentWordIndex === NO_OF_WORDS) {
        messageElm.textContent = "You Win! Game Over";
        messageElm.classList.add("text-green-500", "font-bold", "text-3xl");
        textInputForm.text.disabled = true;
        textInputForm.text.blur();
      } else {
        highlightCurrentWord(currentWordIndex);
      }
    } else {
      wordListElm.children[currentWordIndex].classList.add(
        "text-red-500",
        "border-red-500"
      );
    }
    textInputForm.text.value = "";
  };

  const handleTypingNew = function (e) {
    if (e.code === "Space") {
      e.preventDefault();
      handleTyping(e);
    }
  };

  textInputForm.addEventListener("keyup", handleTypingNew);
  textInputForm.addEventListener("submit", handleTyping);
};

main();
