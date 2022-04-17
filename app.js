const form = document.querySelector('form');
const lists = document.querySelector('form ul');
const submit = document.querySelector('#footer input');
const inputList = document.querySelector('#inputText');
const deleteBtn = document.querySelector('li .deleteBtn');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const list = inputList.value;
  lists.innerHTML += `
  <li>
    <input type="checkbox" />
    <span>${list}</span>
    <button class="deleteBtn">✖</button>
  </li>`;

  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target.parentNode);
  });
});
