import { createUi } from "./createUi.js";
//selection
const formEl = document.querySelector(".form");
const inpEl = document.querySelector("#text");
const toast = document.querySelector(".toast");
const timeEl = document.querySelector(".time");
const toastCloseBtn = document.querySelector(".toastCloseBtn");
const sucsessToast = document.querySelector(".sucsess-toast");
const sucsessTime = document.querySelector(".sucsess-time");
const sucsessBtn = document.querySelector(".sucsess-btn");
//
const todos = JSON.parse(localStorage.getItem("todos")) || [];
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(formEl);
  const getText = form.get("text");

  const mal = {
    text: getText,
    id: Math.random(),
    isComplated: false,
  };
  if (inpEl.value.trim()) {
    todos.push(mal);
    localStorage.setItem("todos", JSON.stringify(todos));
    createUi(todos);
    //succsess toast
    sucsessToast.style.transform = "translateY(0)";
    let time = 100;
    const succsess = setInterval(() => {
      time--;
      sucsessTime.style.width = `${time}%`;
      if (time === 0) {
        clearInterval(succsess);
        sucsessToast.style.transform = "translateY(-100vw)";
      }
      sucsessBtn.addEventListener("click", () => {
        clearInterval(succsess);
        sucsessToast.style.transform = "translateY(-100vw)";
      });
    }, 40);
  } else {
    //agar input bo'sh bolsa toast
    let time = 100;
    const setIntervalTime = setInterval(() => {
      toast.style.transform = "translateY(0px)";
      time--;
      timeEl.style.width = `${time}%`;
      if (time === 0) {
        clearInterval(setIntervalTime);
        toast.style.transform = "translateY(-100vw)";
      }
      toastCloseBtn.addEventListener("click", () => {
        clearInterval(setIntervalTime);
        toast.style.transform = "translateY(-100vw)";
      });
    }, 40);
  }

  //
  formEl.reset();
});

createUi(todos);
