const INCREASE_NUMBER_ANIMATION_SPEED = 40;
function increaseNumberAnimationStep(i, elementCount, endNumber) {
  if (i <= endNumber) {
    if (i === endNumber) {
      elementCount.innerText = i + "+";
    } else {
      elementCount.innerText = i;
      //console.log(i);
    }
    i = i + 100;

    setTimeout(
      increaseNumberAnimationStep,
      INCREASE_NUMBER_ANIMATION_SPEED,
      i,
      elementCount,
      endNumber
    );
  }
}
function initIncreaseNumberAnimation() {
  const begin = 0;
  const end = 5000;
  const elementC = document.querySelector(".features__clients-count");
  increaseNumberAnimationStep(begin, elementC, end);
}
//initIncreaseNumberAnimation();
// раздел по выбору select со значением "другое" и всплывающем текстовым полем
document
  .querySelector("#budget")
  .addEventListener("change", function handleSelectChange(event) {
    if (event.target.value === "other") {
      // Должны добавить еще одно текстовое поле
      let formContainer = document.createElement("div");
      formContainer.classList.add("form__group", "form__other-input");
      let input = document.createElement("input");
      input.placeholder = "Введите ваш вариант";
      input.type = "text";
      formContainer.appendChild(input);
      document
        .querySelector(".form form")
        .insertBefore(formContainer, document.querySelector(".form__submit"));
    }
    const otherInput = document.querySelector(".form__other-input");
    if (event.target.value !== "other" && Boolean(otherInput)) {
      // Удаляем ранее добавленное текстовое поле, если оно есть в DOM
      document.querySelector(".form form").removeChild(otherInput);
    }
  });
// раздел по анимации шапки
let animationInited = false;
function updateScroll() {
  if (window.scrollY > 0) {
    document.querySelector("header").classList.add("header__scrolled");
  } else {
    document.querySelector("header").classList.remove("header__scrolled");
  }
  // Запуск анимации увеличения числа
  let windowBottomPosition = window.scrollY + window.innerHeight;
  let countElementPosition = document.querySelector(
    ".features__clients-count"
  ).offsetTop;
  console.log(windowBottomPosition, countElementPosition);

  if (windowBottomPosition >= countElementPosition && !animationInited) {
    animationInited = true;
    initIncreaseNumberAnimation();
  }
}
window.addEventListener("scroll", updateScroll);
