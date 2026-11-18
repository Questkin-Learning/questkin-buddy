const buddy = document.createElement("div");
buddy.style.width = "60px";
buddy.style.height = "60px";
buddy.style.background = "hotpink";
buddy.style.borderRadius = "50%";
buddy.style.position = "fixed";
buddy.style.bottom = "20px";
buddy.style.right = "20px";
buddy.style.zIndex = "999999";
document.body.appendChild(buddy);
document.addEventListener("mousemove", function (event) {
  console.log(event.clientX, event.clientY);
  buddy.style.left = event.clientX + "px";
  buddy.style.top = event.clientY + "px";
});
