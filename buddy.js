function style(element, bundle) {
  for (const key in bundle) {
    element.style[key] = bundle[key];
  }
}

const cards = [
  {
    question: "What does addEventListener do?",
    answer: "It asks the browser to run my code whenever a certain event happens, like a click or a mouse move."
  },
  {
    question: "What is the difference between const and let?",
    answer: "const is for a value that never changes. let is for a value that will change later."
  },
  {
    question: "What are clientX and clientY?",
    answer: "The mouse position. clientX is the distance from the left edge, clientY is the distance from the top."
  },
  {
    question: "Defining a function versus calling it: what is the difference?",
    answer: "Defining writes the recipe. Nothing happens until something calls it by name, like blink()."
  },
  {
    question: "Which three steps make my code changes show up in Chrome?",
    answer: "Save the file, reload the extension, refresh the page."
  }
];

const buddy = document.createElement("div");
style(buddy, {
  width: "120px",
  height: "149px",
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: "999999",
  cursor: "pointer",
  userSelect: "none",
  transformOrigin: "bottom center",
  transition: "transform 0.5s ease-out"
});
document.body.appendChild(buddy);

const hopper = document.createElement("div");
style(hopper, {
  width: "120px",
  height: "149px",
  position: "absolute",
  transformOrigin: "bottom center",
  transition: "transform 0.08s ease-out"
});
buddy.appendChild(hopper);

const body = document.createElement("div");
style(body, {
  width: "120px",
  height: "149px",
  backgroundImage: "url(" + chrome.runtime.getURL("kin.png") + ")",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  position: "absolute",
  transformOrigin: "bottom center"
});
hopper.appendChild(body);

body.animate(
  [
    { transform: "scaleY(1)" },
    { transform: "scaleY(1.025)" },
    { transform: "scaleY(1)" }
  ],
  { duration: 3200, iterations: Infinity, easing: "ease-in-out" }
);

const zzz = document.createElement("div");
zzz.textContent = "z z z";
style(zzz, {
  position: "absolute",
  left: "70px",
  top: "-6px",
  font: "600 14px sans-serif",
  color: "#7a5aa6",
  opacity: "0",
  transition: "opacity 0.8s ease-in-out"
});
hopper.appendChild(zzz);

zzz.animate(
  [
    { transform: "translateY(0)" },
    { transform: "translateY(-6px)" },
    { transform: "translateY(0)" }
  ],
  { duration: 2400, iterations: Infinity, easing: "ease-in-out" }
);

const badge = document.createElement("div");
badge.textContent = "?";
style(badge, {
  position: "absolute",
  left: "88px",
  top: "18px",
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  background: "#7a5aa6",
  color: "white",
  font: "700 14px/22px sans-serif",
  textAlign: "center",
  display: "none"
});
hopper.appendChild(badge);

const bubble = document.createElement("div");
style(bubble, {
  position: "fixed",
  right: "24px",
  bottom: "184px",
  width: "250px",
  boxSizing: "border-box",
  padding: "14px",
  background: "#fffaf0",
  border: "1px solid #e3d8c2",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(60, 40, 80, 0.18)",
  font: "14px/1.45 system-ui, sans-serif",
  color: "#2b2233",
  textAlign: "left",
  zIndex: "999999",
  display: "none"
});
document.body.appendChild(bubble);

const questionText = document.createElement("div");
style(questionText, { fontWeight: "600" });
bubble.appendChild(questionText);

const answerText = document.createElement("div");
style(answerText, { marginTop: "8px", display: "none" });
bubble.appendChild(answerText);

const buttonRow = document.createElement("div");
style(buttonRow, { marginTop: "12px", display: "flex", gap: "8px" });
bubble.appendChild(buttonRow);

function makeButton(label, filled) {
  const button = document.createElement("button");
  button.textContent = label;
  style(button, {
    font: "600 13px system-ui, sans-serif",
    padding: "6px 12px",
    borderRadius: "999px",
    cursor: "pointer",
    border: "1px solid #7a5aa6",
    background: filled ? "#7a5aa6" : "transparent",
    color: filled ? "white" : "#7a5aa6"
  });
  buttonRow.appendChild(button);
  return button;
}

const showButton = makeButton("Show answer", true);
const gotItButton = makeButton("Got it", true);
const notYetButton = makeButton("Not yet", false);

function makeEye(centerX, centerY, paintedX, paintedY) {
  const patch = document.createElement("div");
  style(patch, {
    width: "4px",
    height: "4.5px",
    background: "#020202",
    borderRadius: "50%",
    position: "absolute",
    left: paintedX - 2 + "px",
    top: paintedY - 2.25 + "px"
  });
  body.appendChild(patch);

  const anchor = document.createElement("div");
  style(anchor, {
    position: "absolute",
    left: centerX + "px",
    top: centerY + "px"
  });
  body.appendChild(anchor);

  const glint = document.createElement("div");
  style(glint, {
    width: "2px",
    height: "2.5px",
    background: "white",
    borderRadius: "50%",
    boxShadow: "0 0 1px white",
    position: "absolute",
    left: paintedX - centerX - 1 + "px",
    top: paintedY - centerY - 1.25 + "px",
    transition: "left 0.25s ease-out, top 0.25s ease-out"
  });
  anchor.appendChild(glint);

  const lid = document.createElement("div");
  style(lid, {
    width: "15px",
    height: "17px",
    background: "#fdeed3",
    borderRadius: "50%",
    borderBottom: "2px solid #4a3340",
    position: "absolute",
    left: centerX - 7.5 + "px",
    top: centerY - 8.5 + "px",
    transformOrigin: "top center",
    transform: "scaleY(0)"
  });
  body.appendChild(lid);

  return { anchor: anchor, glint: glint, lid: lid };
}

const leftEye = makeEye(50.2, 56.6, 47.9, 53.4);
const rightEye = makeEye(77.9, 55.3, 75.5, 52.6);

function lookAt(parts, event) {
  const spot = parts.anchor.getBoundingClientRect();
  const angle = Math.atan2(event.clientY - spot.top, event.clientX - spot.left);
  parts.glint.style.left = Math.cos(angle) * 3.2 - 1 + "px";
  parts.glint.style.top = Math.sin(angle) * 3.6 - 1.25 + "px";
}

const SLEEP_AFTER = 8000;
const HELLO_DISTANCE = 160;
const QUESTION_EVERY = 15000;
let asleep = false;
let cursorIsNear = false;
let questionReady = false;
let cardNumber = 0;
let idleTimer;

function setLids(amount, seconds) {
  leftEye.lid.style.transition = "transform " + seconds + "s ease-in-out";
  rightEye.lid.style.transition = "transform " + seconds + "s ease-in-out";
  leftEye.lid.style.transform = "scaleY(" + amount + ")";
  rightEye.lid.style.transform = "scaleY(" + amount + ")";
}

function blink() {
  if (asleep) return;
  setLids(1, 0.09);
  setTimeout(function () {
    if (!asleep) setLids(0, 0.09);
  }, 140);
}

function hop() {
  hopper.animate(
    [
      { transform: "translateY(0)" },
      { transform: "translateY(-22px)", offset: 0.35 },
      { transform: "translateY(0)", offset: 0.7 },
      { transform: "translateY(-6px)", offset: 0.85 },
      { transform: "translateY(0)" }
    ],
    { duration: 500, easing: "ease-out" }
  );
}

function wiggle() {
  hopper.animate(
    [
      { transform: "rotate(0deg)" },
      { transform: "rotate(-5deg)" },
      { transform: "rotate(5deg)" },
      { transform: "rotate(-3deg)" },
      { transform: "rotate(0deg)" }
    ],
    { duration: 450, easing: "ease-in-out" }
  );
}

function floatHeart() {
  const heart = document.createElement("div");
  heart.textContent = "♥";
  style(heart, {
    position: "absolute",
    left: 40 + Math.random() * 40 + "px",
    top: "14px",
    font: "18px sans-serif",
    color: "#e2557a",
    pointerEvents: "none"
  });
  hopper.appendChild(heart);

  const rising = heart.animate(
    [
      { transform: "translateY(0) scale(0.6)", opacity: 0 },
      { transform: "translateY(-12px) scale(1)", opacity: 1, offset: 0.25 },
      { transform: "translateY(-46px) scale(1.2)", opacity: 0 }
    ],
    { duration: 1100, easing: "ease-out" }
  );
  rising.onfinish = function () {
    heart.remove();
  };
}

function fallAsleep() {
  if (bubble.style.display === "block") return;
  asleep = true;
  setLids(1, 0.8);
  zzz.style.opacity = "1";
}

function wakeUp() {
  asleep = false;
  setLids(0, 0.2);
  zzz.style.opacity = "0";
  hop();
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  if (asleep) wakeUp();
  idleTimer = setTimeout(fallAsleep, SLEEP_AFTER);
}

function offerQuestion() {
  questionReady = true;
  badge.style.display = "block";
  wiggle();
}

function openQuestion() {
  const card = cards[cardNumber];
  questionText.textContent = card.question;
  answerText.textContent = card.answer;
  answerText.style.display = "none";
  showButton.style.display = "block";
  gotItButton.style.display = "none";
  notYetButton.style.display = "none";
  bubble.style.display = "block";
  badge.style.display = "none";
  questionReady = false;
}

function closeQuestion(remembered) {
  bubble.style.display = "none";
  cardNumber = (cardNumber + 1) % cards.length;
  if (remembered) {
    hop();
    floatHeart();
  } else {
    blink();
  }
  setTimeout(offerQuestion, QUESTION_EVERY);
}

showButton.addEventListener("click", function () {
  answerText.style.display = "block";
  showButton.style.display = "none";
  gotItButton.style.display = "block";
  notYetButton.style.display = "block";
});

gotItButton.addEventListener("click", function () {
  closeQuestion(true);
});

notYetButton.addEventListener("click", function () {
  closeQuestion(false);
});

setInterval(blink, 4200);
setTimeout(offerQuestion, QUESTION_EVERY);
resetIdleTimer();

buddy.addEventListener("mousedown", function () {
  hopper.style.transform = "scale(1.07, 0.9)";
});

buddy.addEventListener("mouseup", function () {
  hopper.style.transform = "scale(1, 1)";
});

buddy.addEventListener("mouseleave", function () {
  hopper.style.transform = "scale(1, 1)";
});

buddy.addEventListener("click", function () {
  if (questionReady) {
    openQuestion();
    return;
  }
  hop();
  floatHeart();
  blink();
});

document.addEventListener("mousemove", function (event) {
  resetIdleTimer();

  const kinX = window.innerWidth - 80;
  const kinY = window.innerHeight - 95;
  const distanceX = event.clientX - kinX;
  const distanceY = event.clientY - kinY;

  const tilt = Math.max(-8, Math.min(8, distanceX / 80));
  buddy.style.transform = "rotate(" + tilt + "deg)";

  const howFar = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  if (howFar < HELLO_DISTANCE && !cursorIsNear) {
    cursorIsNear = true;
    wiggle();
  }
  if (howFar > HELLO_DISTANCE + 60) {
    cursorIsNear = false;
  }

  lookAt(leftEye, event);
  lookAt(rightEye, event);
});





