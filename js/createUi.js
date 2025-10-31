const wrapper = document.querySelector(".wrapper");
const overlay = document.querySelector(".overlay");
const formModal = document.querySelector(".inpBox");
const cencle = document.querySelector(".bekor");
const save = document.querySelector(".saqlash");
const textEl = document.getElementById("textModal");

export const createUi = (todos) => {
  wrapper.innerHTML = "";
  //create Lists
  todos.forEach(({ text, id, isComplated }, i) => {
    const box = document.createElement("div");
    box.classList.add("textBox");
    const span = document.createElement("span");
    const orderEl = document.createElement("span");
    orderEl.style.width = "15%";
    const wrapperBtns = document.createElement("div");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    delBtn.classList.add("deleteBtn");
    const editBtn = document.createElement("button");
    editBtn.classList.add("editeBtn");
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    wrapperBtns.classList.add("btns");
    wrapperBtns.append(editBtn, delBtn);
    let order = i + 1;
    orderEl.textContent = order;
    span.textContent = text;
    box.append(orderEl, span, wrapperBtns);
    wrapper.append(box);
    //delete function
    delBtn.addEventListener("click", () => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      createUi(newTodos);
    });
    //edite function
    editBtn.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      overlay.style.display = "flex";

      todos.forEach((todo) => {
        //qaysi todo edit qlishni aniqlash id orqali
        if (todo.id === id) {
          textEl.value = todo.text;
          //edit modal form

          formModal.addEventListener("submit", (e) => {
            //
            e.preventDefault();
            //
            // if (textEl.value.trim()) {
            const form = new FormData(formModal);
            const modalInpValue = form.get("text");
            todo.text = modalInpValue;
            localStorage.setItem("todos", JSON.stringify(todos));
            overlay.classList.add("hidden");
            overlay.style.display = "none";
            createUi(todos);
            //
            formModal.reset();
          });
          //
        }
      });
    });
    cencle.addEventListener("click", () => {
      overlay.classList.add("hidden");
      overlay.style.display = "none";
    });

    span.addEventListener("click", () => {
      const commplated = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplated: !todo.isComplated };
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(commplated));
      createUi(commplated);
    });
  });

  //
};
