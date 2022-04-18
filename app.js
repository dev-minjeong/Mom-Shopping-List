const form = document.querySelector('form');
const lists = document.querySelector(' ul');
const submitBtn = document.querySelector('#footer input');
const inputList = document.querySelector('#inputText');
const deleteBtn = document.querySelector('.deleteBtn');

function onSubmit(event) {
  event.preventDefault();
  const newList = inputList.value;
  inputList.value = '';
  addList(newList);
}

function addList(newList) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', onCheck);
  const span = document.createElement('span');
  span.textContent = newList;
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.addEventListener('click', onRemove);
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  lists.appendChild(li);
}
function onRemove(event) {
  const removeList = event.target.parentElement;
  removeList.remove();
}
function onCheck(event) {
  const checkList = event.target.parentElement;
  event.target.checked
    ? (checkList.style.color = 'rgb(209, 209, 209)')
    : (checkList.style.color = 'black');
}
form.addEventListener('submit', onSubmit);
