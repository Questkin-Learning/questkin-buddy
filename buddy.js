const buddy = document.createElement("div");
buddy.style.width = "120px";
buddy.style.height = "149px";
buddy.style.position = "fixed";
buddy.style.bottom = "20px";
buddy.style.right = "20px";
buddy.style.zIndex = "999999";
buddy.style.pointerEvents = "none";
buddy.style.transformOrigin = "bottom center";
buddy.style.transition = "transform 0.5s ease-out";
document.body.appendChild(buddy);

const body = document.createElement("div");
body.style.width = "120px";
body.style.height = "149px";
body.style.backgroundImage = "url(" + chrome.runtime.getURL("kin.png") + ")";
body.style.backgroundSize = "contain";
body.style.backgroundRepeat = "no-repeat";
body.style.position = "absolute";
body.style.transformOrigin = "bottom center";
buddy.appendChild(body);

body.animate(
  [
    { transform: "scaleY(1)" },
    { transform: "scaleY(1.025)" },
    { transform: "scaleY(1)" }
  ],
  { duration: 3200, iterations: Infinity, easing: "ease-in-out" }
);

function makeEye(centerX, centerY, paintedX, paintedY) {
  const patch = document.createElement("div");
  patch.style.width = "4px";
  patch.style.height = "4.5px";
  patch.style.background = "#020202";
  patch.style.borderRadius = "50%";
  patch.style.position = "absolute";
  patch.style.left = paintedX - 2 + "px";
  patch.style.top = paintedY - 2.25 + "px";
  body.appendChild(patch);

  const anchor = document.createElement("div");
  anchor.style.position = "absolute";
  anchor.style.left = centerX + "px";
  anchor.style.top = centerY + "px";
  body.appendChild(anchor);

  const glint = document.createElement("div");
  glint.style.width = "2px";
  glint.style.height = "2.5px";
  glint.style.background = "white";
  glint.style.borderRadius = "50%";
  glint.style.boxShadow = "0 0 1px white";
  glint.style.position = "absolute";
  glint.style.left = paintedX - centerX - 1 + "px";
  glint.style.top = paintedY - centerY - 1.25 + "px";
  glint.style.transition = "left 0.25s ease-out, top 0.25s ease-out";
  anchor.appendChild(glint);

  const lid = document.createElement("div");
  lid.style.width = "15px";
  lid.style.height = "17px";
  lid.style.background = "#fdeed3";
  lid.style.borderRadius = "50%";
  lid.style.borderBottom = "2px solid #4a3340";
  lid.style.position = "absolute";
  lid.style.left = centerX - 7.5 + "px";
  lid.style.top = centerY - 8.5 + "px";
  lid.style.transformOrigin = "top center";
  lid.style.transform = "scaleY(0)";
  lid.style.transition = "transform 0.09s ease-in";
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

function blink() {
  leftEye.lid.style.transform = "scaleY(1)";
  rightEye.lid.style.transform = "scaleY(1)";
  setTimeout(function () {
    leftEye.lid.style.transform = "scaleY(0)";
    rightEye.lid.style.transform = "scaleY(0)";
  }, 140);
}

setInterval(blink, 4200);

document.addEventListener("mousemove", function (event) {
  const kinX = window.innerWidth - 80;
  const distance = event.clientX - kinX;
  const tilt = Math.max(-8, Math.min(8, distance / 80));
  buddy.style.transform = "rotate(" + tilt + "deg)";
  lookAt(leftEye, event);
  lookAt(rightEye, event);
});



