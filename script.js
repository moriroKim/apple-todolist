document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelector('.section');
    const writeTaskModal = document.querySelector('.add-task-box');
    const taskContainer = document.querySelector('.task-list-container');
    const header = document.querySelector('.header');
    const taskList = document.querySelector('.task-lists');

    const time = document.querySelector('.time');
    const logo = document.querySelector('.logo');
    const prevBtn = document.querySelector('.prev-btn');
    const startBtn = document.querySelector('.start-btn');
    const writeTitle = document.querySelector('.write-title');
    const writeBtn = document.querySelector('.btn-col');
    const writeTaskBtn = document.querySelector('.write-task-btn');
    const closeModalBtn = document.querySelector('.close-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const taskTitleInput = document.querySelector('#task-title');
    const taskDescInput = document.querySelector('#task-description');
    const addTaskAni = document.querySelector('.add-task-ani');
    const delTaskAni = document.querySelector('.del-task-ani');



    // 로컬스토리지에 저장할 배열
    let userData = [];

    // 키값 저장할 변수
    let currIdForIndex;

    // 캐러셀용 좌표값 변수
    let displayLocationX = 0;
    let displayWidth = 368;

    // 인트로 write task 버튼
    startBtn.addEventListener('click', () => {
        displayLocationX -= displayWidth;
        sections.style.left = `${displayLocationX}px`;
    });

    // Add task화면의 이전 버튼
    prevBtn.addEventListener('click', () => {
        if(header.style.height > `838.50px`) {
            header.style.height = `250px`;
            logo.style.top = '104px';
            logo.style.transform = 'scale(1)';
            taskContainer.classList.remove('appear');
            taskContainer.classList.add('disappear');
            setTimeout(() => {
                taskContainer.style.display = 'none';
            }, 700);
        } else {
            displayLocationX += displayWidth;
            sections.style.left = `${displayLocationX}px`;
        }
    });

    // write your to-dos 버튼
    writeBtn.addEventListener('click', () => {
        header.style.height = 'calc(100% + 50px)';
        logo.style.top = '670px';
        logo.style.transform = 'scale(0.6)';
        taskContainer.classList.remove('disappear');
        taskContainer.classList.add('appear');
        setTimeout(() => {
            taskContainer.style.display = 'flex';
        }, 700);
    });

    // add task 버튼 (task 작성용 모달창 열림)
    writeTaskBtn.addEventListener('click', () => {
        taskTitleInput.value = '';
        taskDescInput.value = '';
        writeTaskModal.style.display = 'flex';
        writeTaskModal.classList.remove('disappear');
        writeTaskModal.classList.add('appear');
    });

    // 모달창 닫기 버튼
    closeModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if( writeTitle.innerText === 'Edit Task' ) {
            setTimeout(() => {
                writeTitle.innerText = 'Write Task';
            }, 700);
        }
        writeTaskModal.classList.remove('appear');
        writeTaskModal.classList.add('disappear');
        setTimeout(() => {
            writeTaskModal.style.display = 'none';
        }, 700);
    });

    // 모달창 submit 버튼
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // 수정버튼을 눌렀을 시,
        if( writeTitle.innerText === 'Edit Task' ) {

            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentDay = now.getDate();
            console.log(currIdForIndex);
            const itemIndex = userData.findIndex((item) => item.id === currIdForIndex);

            userData[itemIndex].title = taskTitleInput.value;
            userData[itemIndex].description = taskDescInput.value;
            userData[itemIndex].date = `${currentMonth}. ${currentDay}`
            userData[itemIndex].complete = false;

            localStorage.setItem('userData', JSON.stringify(userData));
            taskList.innerHTML = ''; // task 수정완료 후 요소가 중복되는 이슈 방지
            render();

        // add task버튼을 눌렀을 시,
        } else {
            // 객체 고유id값과 리스트의 현재날짜 텍스트에 씀
            const now = new Date();
            const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
            const currentDay = String(now.getDate()).padStart(2, '0');

            // 배열에 push할 객체 생성
            const taskData = {
                id: Date.now(),
                date: `${currentMonth}. ${currentDay}`,
                title: taskTitleInput.value,
                description: taskDescInput.value,
                complete: false, // 토글버튼
            };

            userData.push(taskData);
            addTask(taskData); // DOM 생성 함수
            saveTask(userData, taskData);
            
            taskTitleInput.value = '';
            taskDescInput.value = '';

            writeTaskModal.classList.remove('appear');
            writeTaskModal.classList.add('disappear');
            setTimeout(() => {
                writeTaskModal.style.display = 'none';
            }, 700);
        }
    });

    const addTask = (item) => {

        // 요소 생성
        const taskList = document.querySelector('.task-lists');
        const task = document.createElement('div');
        const taskTitle = document.createElement('h2');
        const taskPhrase = document.createElement('p');
        const taskDate = document.createElement('p');
        const doneToggleBtn = document.createElement('button');
        const tglCircle = document.createElement('div');
        const iconCheck = document.createElement('span');
        const iconEdit = document.createElement('span');
        const iconDel = document.createElement('span');
        const options = document.createElement('div');
        const delEditBtnContainer = document.createElement('div');
        const editBtn = document.createElement('button');
        const delBtn = document.createElement('button');

        // 클래스 추가
        task.classList.add('task');
        task.classList.add('add-task-ani');
        taskTitle.classList.add('task-title');
        taskPhrase.classList.add('task-phrase');
        taskDate.classList.add('date');
        doneToggleBtn.classList.add('done-toggle-btn');
        tglCircle.classList.add('toggle-circle');
        iconCheck.classList.add('material-symbols-outlined');
        iconCheck.classList.add('done');
        options.classList.add('options');
        delEditBtnContainer.classList.add('del-edit-btns');
        editBtn.classList.add('material-symbols-outlined');
        delBtn.classList.add('material-symbols-outlined');
        iconEdit.classList.add('material-symbols-outlined');
        iconDel.classList.add('material-symbols-outlined');
        editBtn.classList.add('edit-btn');
        delBtn.classList.add('del-btn');

        // 텍스트, 아이콘 추가
        taskTitle.innerText = item.title;
        taskPhrase.innerText = item.description;
        taskDate.innerText = item.date;
        iconCheck.innerText = 'check';
        iconEdit.innerText = 'edit';
        iconDel.innerText = 'delete';

        // 화면에 업데이트
        tglCircle.appendChild(iconCheck);
        doneToggleBtn.appendChild(tglCircle);
        editBtn.appendChild(iconEdit);
        delBtn.appendChild(iconDel);
        delEditBtnContainer.append(editBtn, delBtn);
        options.appendChild(delEditBtnContainer);
        task.append(taskTitle, taskPhrase, taskDate, doneToggleBtn, options);
        taskList.appendChild(task);

        // 로컬스토리지의 데이터를 받고 렌더링 될때의 경우.
        if (item.complete) { // 인자값(item => 객체 )으로 받아온 객체의 complete값에 접근하여
            tglCircle.classList.add('checked'); // 마지막으로 설정한 값에 따른 클래스를 렌더링 또는 submit할때마다 추가
        } else {                               // submit으로 생성될 경우, item.complete의 기본값 === false
            tglCircle.classList.add('yet');
        }

        // 토글버튼 이벤트리스너
        doneToggleBtn.addEventListener('click', () => {
            
            // submit하여 생성될 때 또는 데이터에서 렌더링되는 도중에 미리 객체의 고유id값 보존
            // currIdForIndex를 이용해 배열의 index 찾기
            currIdForIndex = item.id;
            console.log(currIdForIndex);
            const itemIndex = userData.findIndex((item) => item.id === currIdForIndex);

            // 만약 배열에서 클릭된 요소의 index를 찾으면
            if (itemIndex > -1) {
                // complete값 버튼 누를때마다 토글링(true/false)
                userData[itemIndex].complete = !userData[itemIndex].complete;

                if (userData[itemIndex].complete) { // complete 값이 true일 경우
                    tglCircle.classList.remove('yet');
                    tglCircle.classList.add('checked');
                } else {
                    tglCircle.classList.remove('checked'); // false일 경우
                    tglCircle.classList.add('yet');
                }
                // 클릭된 해당 인덱스의 객체가 업데이트 될때마다 로컬스토리지에도 업데이트
                localStorage.setItem('userData', JSON.stringify(userData));
            }
        })

        delBtn.addEventListener('click', (e) => {
            currIdForIndex = item.id;
            console.log(currIdForIndex);
            const itemIndex = userData.findIndex((item) => item.id === currIdForIndex);
            if (itemIndex > -1) {
                // 배열에서 해당 인덱스에 있는 객체 삭제.
                userData.splice(itemIndex, 1);
                //
                task.classList.add('del-task-ani');
                setTimeout(() => {
                    task.remove();
                }, 700);
                localStorage.setItem('userData', JSON.stringify(userData));
            }
        });

        editBtn.addEventListener('click', () => {
            currIdForIndex = item.id;
            console.log(currIdForIndex);
            const itemIndex = userData.findIndex((item) => item.id === currIdForIndex);
            if (itemIndex > -1) {

                taskTitleInput.value = userData[itemIndex].title;
                taskDescInput.value = userData[itemIndex].description;
                writeTitle.innerText = 'Edit Task';
                writeTaskModal.style.display = 'flex';
                writeTaskModal.classList.remove('disappear');
                writeTaskModal.classList.add('appear');
            }
        })
    };

    // 객체를 배열에 push > 로컬스토리지 저장
    const saveTask = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    // 화면 렌더링
    const render = () => {
        const loadedData = JSON.parse(localStorage.getItem('userData'));
        if (loadedData !== null && loadedData.length > 0) {
            userData = loadedData;
            userData.forEach((item) => {
                addTask(item);
            });
        }
    };

    const updateTime = () => {
        let date = new Date();
    
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
    
        time.textContent = `${hours} : ${minutes} : ${seconds}`;
    };

    render();
    setInterval(updateTime, 1000);
});