const INCREASE_NUMBER_ANIMATION_SPEED = 50;
function increaseNumberAnimationStep(i, elementCount, endNumber) {
  if (i <= endNumber) {
    if (i === endNumber) {
      elementCount.innerText = i + "+";
    } else {
      elementCount.innerText = i;
      //console.log(i);
    }
    i++;
    setTimeout(
      increaseNumberAnimationStep(i, elementCount, endNumber),
      INCREASE_NUMBER_ANIMATION_SPEED
    );
  }
}
function initIncreaseNumberAnimation() {
  const begin = 0;
  const end = 5000;
  const elementC = document.querySelector(".features__clients-count");
  increaseNumberAnimationStep(begin, elementC, end);
}
initIncreaseNumberAnimation();
