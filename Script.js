document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SHAYARI LOGIC
     ========================= */
  const shayariList = [
    "Kabhi kabhi khamoshi bhi cheekh kar sab kuch keh jaati hai,\nBas sunne wala chahiye jo alfaazon ke bina bhi samajh sake.",
    "Waqt ne sikhaya hai ke har apna hamesha apna nahi hota,\nAur jo paraye lagte hain, wahi mushkil waqt mein saath dete hain.",
    "Zindagi ne ek baat zaroor samjha di,\nKe log saath tab tak rehte hain jab tak unhe zaroorat hoti hai.",
    "Humne chhodna seekh liya un chehron ko,\nJo saath rehkar bhi dil ke kareeb nahi hote.",
    "Dil tootne ka dard lafzon mein bayan nahi hota,\nYeh woh ehsaas hai jo sirf sehne wala hi jaanta hai.",
    "Har muskurahat ke peeche ek kahani hoti hai,\nAur har chup rehne wale ke andar ek toofan hota hai.",
    "Zindagi ne dheere dheere yeh bhi sikha diya,\nKe sukoon bheed mein nahi, khud ke saath rehne mein hota hai.",
    "Log poochte hain itne shaant kyun rehte ho,\nUnhe kaun samjhaye ke shor andar bahut hota hai.",
    "Hum badle nahi hain janab,\nBas ab har baat par react karna chhod diya hai.",
    "Hum chup rahe toh kamzor mat samajhna,\nBas humne bekaar ki ladaai chhod di hai."
  ];

  const shayariEl = document.getElementById("shayari");
  if (shayariEl) {
    const randomIndex = Math.floor(Math.random() * shayariList.length);
    shayariEl.style.animation = "none";
    shayariEl.offsetHeight;
    shayariEl.innerText = shayariList[randomIndex];
    shayariEl.style.animation = "";
  }

  /* =========================
     PRESS = COLOR | RELEASE = B/W
     ========================= */
  const root = document.documentElement;

  function enableColor() {
    document.body.classList.add("color-on");
  }

  function disableColor() {
    document.body.classList.remove("color-on");
  }

  // Mobile
  root.addEventListener("touchstart", enableColor, { passive: true });
  root.addEventListener("touchend", disableColor);
  root.addEventListener("touchcancel", disableColor);

  // Desktop
  root.addEventListener("mousedown", enableColor);
  root.addEventListener("mouseup", disableColor);
  root.addEventListener("mouseleave", disableColor);

});
