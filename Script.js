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

  "Jo beet gaya usse yaad karna chhod diya,\nKyuki yaadein aksar aaj ko barbaad kar deti hain.",

  "Zindagi ka sabse mushkil kaam yahi hota hai,\nApne dil ko samjhana jab woh kisi aur ko chahne lage.",

  "Humne bhi kuch khwaab bade shauk se dekhe the,\nPar waqt ne ek-ek karke sabko haqeeqat dikha di.",

  "Akele chalna tab shuru hota hai,\nJab log saath chalne ka vaada karke raasta badal lete hain.",

  "Dil ka bojh shabdon se halka nahi hota,\nPar likh dene se thoda sa sukoon mil jaata hai.",

  "Zindagi ne yeh bhi sikha diya,\nKe har sawaal ka jawaab zaroori nahi hota.",

  "Humne logon se kam aur khud se zyada baat karna seekh liya,\nIsliye shayad ab zyada khamosh rehte hain.",

  "Kabhi kabhi lagta hai hum galat duniya mein aa gaye,\nYahan jazbaat se zyada fayda dekha jaata hai.",

  "Waqt ke saath jazbaat nahi marte,\nBas log unki kadar karna chhod dete hain.",

  "Zindagi ek kitaab ki tarah hoti hai,\nKuch safhe samajhne mein waqt lagta hai, kuch dil tod dete hain.",

  "Humne apni khushi dusron ke haath mein dena chhod diya,\nTab jaakar thoda sukoon milna shuru hua.",

  "Khud ko samajhna bhi zindagi ka ek hissa hai,\nKyuki har sawaal ka jawaab duniya ke paas nahi hota.",

  "Waqt badalta hai, log nahi,\nBas unka asli chehra saamne aa jaata hai.",

  "Zindagi ne humein yeh bhi sikha diya,\nKe har rishte ka bojh uthana zaroori nahi hota.",

  "Hum chup rahe toh kamzor mat samajhna,\nBas humne bekaar ki ladaai chhod di hai."
];

const shayariEl = document.getElementById("shayari");
const randomIndex = Math.floor(Math.random() * shayariList.length);

// reset animation
shayariEl.style.animation = "none";
shayariEl.offsetHeight;
shayariEl.innerText = shayariList[randomIndex];
shayariEl.style.animation = "";

let isColor = false;

function enableColor() {
  if (!isColor) {
    document.body.style.filter = "grayscale(0%)";
    isColor = true;
  }
}

document.addEventListener("click", enableColor);
document.addEventListener("touchstart", enableColor);
