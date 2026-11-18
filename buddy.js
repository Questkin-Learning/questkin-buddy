const buddy = document.createElement("div");
buddy.style.width = "80px";
buddy.style.height = "80px";
buddy.style.background = "hotpink";
buddy.style.borderRadius = "50%";
buddy.style.position = "fixed";
buddy.style.bottom = "20px";
buddy.style.right = "20px";
buddy.style.zIndex = "999999";
buddy.style.pointerEvents = "none";
document.body.appendChild(buddy);

function makeEye(leftPosition) {
  const eye = document.createElement("div");
  eye.style.width = "20px";
  eye.style.height = "20px";
  eye.style.background = "white";
  eye.style.borderRadius = "50%";
  eye.style.position = "absolute";
  eye.style.top = "22px";
  eye.style.left = leftPosition + "px";

  const pupil = document.createElement("div");
  pupil.style.width = "8px";
  pupil.style.height = "8px";
  pupil.style.background = "black";
  pupil.style.borderRadius = "50%";
  pupil.style.position = "absolute";
  pupil.style.top = "6px";
  pupil.style.left = "6px";

  eye.appendChild(pupil);
  buddy.appendChild(eye);
  return pupil;
}

const leftPupil = makeEye(14);
const rightPupil = makeEye(46);

function lookAt(pupil, event) {
  const eye = pupil.parentElement.getBoundingClientRect();
  const eyeX = eye.left + eye.width / 2;
  const eyeY = eye.top + eye.height / 2;
  const angle = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);
  pupil.style.left = 6 + Math.cos(angle) * 5 + "px";
  pupil.style.top = 6 + Math.sin(angle) * 5 + "px";
}

document.addEventListener("mousemove", function (event) {
  lookAt(leftPupil, event);
  lookAt(rightPupil, event);
});
