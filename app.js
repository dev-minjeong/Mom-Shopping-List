/**
 * 전체 체크, 삭제 기능 ⭕
 * 추가 아이템 스크롤링 ⭕
 * 스크롤바 디자인 ⭕
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

let dataArr = []; // localStrorage에 저장할 배열
let checkedArr = [];

/* 추가한 리스트 localstorage에 저장 */
function saveData() {
  localStorage.setItem('data', JSON.stringify(dataArr));
  localStorage.setItem('checked', JSON.stringify(checkedArr));
}

/* 삭제한 리스트 localstrorage에서 삭제 */
function removeData(target) {
  const cleanList = dataArr.filter(
    (list) => list.dataId !== parseInt(target.dataset.id)
  );
  dataArr = cleanList;
  saveData();
}
/* 체크 상태 localStorage 수정 */
function checkData(target) {
  const getData = JSON.parse(localStorage.getItem('checked'));
  if (target.className === 'checked') {
    console.log(getData);
    // getData.check = '1';
  } else {
    console.log(getData);
    // getData.check = '0';
  }

  // if (dataObj.check === '0') {
  //   list.childNodes[1].remove('checked');
  // } else if (dataObj.check === '1') {
  //   list.childNodes[1].add('checked');
  // }
}

/* 추가할 리스트 */
let id = 0;
function addList(text, check) {
  const list = document.createElement('li');
  list.setAttribute('class', 'list-row');
  list.setAttribute('data-id', id);
  list.innerHTML = `
    <div id="list">
      <button class="check-btn">✔</button>
      <span class="span-text">${text}</span>
      <button class="remove-btn">
        <i class="fa-solid fa-xmark" data-id="${id}"></i>
      </button>
    </div>
  `;
  lists.appendChild(list);
  list.scrollIntoView({ block: 'center' });

  // 추가한 리스트 배열에 추가
  const dataObj = {
    text: text,
    dataId: id,
  };
  dataArr.push(dataObj);
  checkedArr.push(check);
  saveData();

  id++;
}

/* 리스트 추가시 이벤트 */
function onSubmit(event) {
  event.preventDefault();
  const newList = inputText.value;
  if (!newList) {
    inputText.focus();
    return;
  }
  addList(newList, 0);
  // 추가 후 상태
  inputText.value = '';
  inputText.focus();
}

/* 리스트 내부 클릭 이벤트 */
function listBtnClick(event) {
  const dataId = event.target.dataset.id;
  const targetClass = event.target.className;
  const checkList = event.target;
  if (dataId) {
    // remove 버튼 클릭
    const removeList = document.querySelector(`.list-row[data-id="${dataId}"]`);
    removeList.remove();
    removeData(removeList);
  } else if (event.target.id === 'list') {
    // 나머지 부분 클릭
    checkList.classList.toggle('checked');
    checkList.parentElement.remove();
    lists.appendChild(checkList.parentElement);
    checkData(checkList);
  } else if (targetClass === 'check-btn' || targetClass === 'span-text') {
    checkList.parentElement.classList.toggle('checked');
    checkList.parentElement.parentElement.remove();
    lists.appendChild(checkList.parentElement.parentElement);
    checkData(checkList.parentElement);
  }
}
/* 리스트 로드 */
function loadList() {
  const loadedList = localStorage.getItem('data');
  if (loadedList != null) {
    const parseList = JSON.parse(loadedList);
    parseList.forEach((list) => {
      addList(list.text);
    });
  }
}

/* 페이지 새로고침 */
function init() {
  loadList();
  /* submit 이벤트 실행 */
  form.addEventListener('submit', onSubmit);
}

/* 전체 체크, 삭제 */
controlBtn.addEventListener('click', (event) => {
  const targetClass = event.target.parentElement.className;
  const listAll = lists.childNodes;
  if (targetClass === 'ckeck-all') {
    for (let i = 0; i < listAll.length; i++) {
      listAll[i].childNodes[1].classList.toggle('checked');
      checkData(listAll[i].childNodes[1]);
    }
  } else if (targetClass === 'remove-all') {
    lists.innerHTML = '';
    localStorage.clear();
  } else {
    return;
  }
});

/* 리스트 하위 버튼 클릭 */
lists.addEventListener('click', listBtnClick);

init();
