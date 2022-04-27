/**
 * 전체 체크, 삭제 기능 ⭕
 * 추가 아이템 스크롤링 ⭕
 * 스크롤바 디자인
 * 가격 합산 기능
 * 저장 기능(localstorage)
 * 체크한 것 아래로 보내기 ⭕
 * 우선순위 필터링 및 위로 보내고, 구분된 디자인
 * 코드 효율적으로 개선 ⭕
 */

const lists = document.querySelector('.lists');
const form = document.querySelector('form');
const controlBtn = document.querySelector('.control-box');
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
  list.scrollIntoView({ block: 'center' });
  inputText.value = '';
  inputText.focus();
}

let id = 1;
function addList(newList) {
  const list = document.createElement('li');
  list.setAttribute('class', 'list-row');
  list.setAttribute('data-id', id);
  list.innerHTML = `
    <div id="list">
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

controlBtn.addEventListener('click', (event) => {
  const targetClass = event.target.parentElement.className;
  const listAll = lists.childNodes;
  if (targetClass === 'ckeck-all') {
    for (let i = 0; i < listAll.length; i++) {
      listAll[i].childNodes[1].classList.toggle('checked');
    }
  } else if (targetClass === 'remove-all') {
    lists.innerHTML = '';
  } else {
    return;
  }
});
form.addEventListener('submit', onSubmit);
lists.addEventListener('click', (event) => {
  const dataId = event.target.dataset.id;
  const targetClass = event.target.className;
  if (dataId) {
    // remove 버튼 클릭
    const removeList = document.querySelector(`.list-row[data-id="${dataId}"]`);
    removeList.remove();
  } else if (event.target.id === 'list') {
    // 나머지 부분 클릭
    const checkList = event.target;
    checkList.classList.toggle('checked');
    checkList.parentElement.remove();
    lists.appendChild(checkList.parentElement);
  } else if (targetClass === 'check-btn' || targetClass === 'span-text') {
    const checkList = event.target.parentElement;
    checkList.classList.toggle('checked');
    checkList.parentElement.remove();
    lists.appendChild(checkList.parentElement);
  }
});
