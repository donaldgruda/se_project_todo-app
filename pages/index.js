import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector(".popup__form");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    handleDelete: (isCompleted) => {
      todoCounter.updateTotal(false);
      if (isCompleted) todoCounter.updateCompleted(false);
    },
    handleToggleComplete: (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
  });
  return todo.getView();
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();
    const values = { name, date, id };
    section.addItem(generateTodo(values));
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos, //pass initial todosye
  renderer: (item) => {
    section.addItem(generateTodo(item));
  },
  containerSelector: ".todos__list",
});
section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
