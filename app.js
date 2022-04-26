/**
 * 전체 삭제 기능
 * 추가 아이템 스크롤링
 * 스크롤바 디자인
 * 가격 합산 기능
 * 저장 기능(localstorage)
 * 체크한 것 아래로 보내기
 * 우선순위 필터링 및 위로 보내고, 구분된 디자인
 * 코드 효율적으로 개선 ⭕
 */

const lists = document.querySelector('.lists');
const form = document.querySelector('form');
const inputText = document.querySelector('.input-text');
const submitBtn = document.querySelector('.submit-btn');

function onSubmit(event) {
  event.preventDefault();
  const newList = inputText.value;
  if (!newList) {
    inputText.focus();
    return;
  }
  const list = addList(newList);
  lists.appendChild(list);
  inputText.value = '';
  inputText.focus();
}

let id = 1;
function addList(newList) {
  const list = document.createElement('li');
  list.setAttribute('class', 'list-row');
  list.setAttribute('data-id', id);
  list.innerHTML = `
    <div class="list">
      <button class="check-btn">✔</button>
      <span class="span-text">${newList}</span>
      <button class="remove-btn">
        <i class="fa-solid fa-xmark" data-id="${id}"></i>
      </button>
    </div>
  `;
  id++;
  return list;
}
function onCheck(event) {
  const checkList = event.target.parentElement;
  event.target.checked
    ? (checkList.style.color = 'rgb(209, 209, 209)')
    : (checkList.style.color = 'black');
}
form.addEventListener('submit', onSubmit);
lists.addEventListener('click', (event) => {
  const dataId = event.target.dataset.id;
  if (dataId) {
    const removeList = document.querySelector(`.list-row[data-id="${dataId}"]`);
    removeList.remove();
  } else {
    const checkList = event.target.parentElement;
    checkList.classList.toggle('checked');
  }
});
