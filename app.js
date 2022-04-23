/**
 * 전체 삭제 기능
 * 추가 아이템 스크롤링
 * 스크롤바 디자인
 * 가격 합산 기능
 * 저장 기능(localstorage)
 * 체크한 것 아래로 보내기
 * 우선순위 필터링 및 위로 보내고, 구분된 디자인
 */

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
