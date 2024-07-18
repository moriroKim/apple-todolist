document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelector('.section');
    const writeTaskModal = document.querySelector('.add-task-box');
    const taskContainer = document.querySelector('.task-list-container');
    const header = document.querySelector('.header');
    const task = document.querySelector('.task');


    const logo = document.querySelector('.logo');
    const toggleCircle = document.querySelector('.toggle-circle');
    const toggleChecked = document.querySelector('.done');

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const startBtn = document.querySelector('.start-btn');
    const writeBtn = document.querySelector('.btn-col');
    const writeTaskBtn = document.querySelector('.write-task-btn');
    const closeModalBtn = document.querySelector('.close-btn');
    const submitBtn = document.querySelector('.submit-btn');

    const taskTitleInput = document.querySelector('#task-title');
    const taskDescriptionInput = document.querySelector('#task-description');

    const toggleBtn = document.querySelector('.done-toggle-btn');

    let userData = [];
    let currIdForIndex;
    let displayLocationX = 0;
    let displayWidth = 368;

    startBtn.addEventListener('click', () => {
        displayLocationX -= displayWidth;
        sections.style.left = `${displayLocationX}px`;
    })

    prevBtn.addEventListener('click', () => {
        displayLocationX += displayWidth;
        sections.style.left = `${displayLocationX}px`;
    })

    writeBtn.addEventListener('click', () => {
        header.style.height = 'calc(100% + 50px)';
        logo.style.top = '670px';
        logo.style.transform = 'scale(0.6)';

        setTimeout( () => {
            taskContainer.style.display = 'flex';
            taskContainer.classList.add('appear');
        }, 700)
    })

    writeTaskBtn.addEventListener('click', () => {
        writeTaskModal.style.display = 'flex';
        writeTaskModal.classList.remove('disappear');
        writeTaskModal.classList.add('appear');
    })

    closeModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        writeTaskModal.classList.remove('appear');
        writeTaskModal.classList.add('disappear');
        setTimeout( () => {
            writeTaskModal.style.display = 'none';
        }, 700)
    })

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentDay = now.getDate();

        const taskData = {
            id: Date.now(),
            date: `${currentMonth}. ${currentDay}.`,
            title: taskTitleInput.value,
            description: taskDescriptionInput.value,
            complete: false
        }

        currIdForIndex = taskData.id;
        
        addTask(taskData, userData, currIdForIndex);
        saveTask(userData, taskData, currIdForIndex);
    })

    const saveTask = (userData, taskData) => {
        userData.push(taskData);
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    const addTask = (taskData, userData, currIdForIndex) => {

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

        task.classList.add('task');
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
        iconDel.classList.add('material-symbols-outlined')
        editBtn.classList.add('edit-btn');
        delBtn.classList.add('del-btn');

        taskTitle.innerText = taskData.title;
        taskPhrase.innerText = taskData.description;
        taskDate.innerText = taskData.date;
        iconCheck.innerText = 'check';
        iconEdit.innerText = 'edit';
        iconDel.innerText = 'delete';

        tglCircle.appendChild(iconCheck);
        doneToggleBtn.appendChild(tglCircle);
        editBtn.appendChild(iconEdit);
        delBtn.appendChild(iconDel);
        delEditBtnContainer.appendChild(editBtn);
        delEditBtnContainer.appendChild(delBtn);
        options.appendChild(delEditBtnContainer);

        task.appendChild(taskTitle);
        task.appendChild(taskPhrase);
        task.appendChild(taskDate);
        task.appendChild(doneToggleBtn);
        task.appendChild(options);

        taskList.appendChild(task);



        doneToggleBtn.addEventListener('click', (e) => {
            if(tglCircle.classList.contains('checked')) {
                tglCircle.classList.remove('checked');
                tglCircle.classList.add('yet');
            } else {
                tglCircle.classList.remove('yet');
                tglCircle.classList.add('checked');
            }
        });

        // doneToggleBtn.addEventListener('click', () => {
        //     const itemIndex = userData.findIndex((item) => item.id === currIdForIndex);
        //     if(itemIndex > -1) {
        //         if(userData[itemIndex].complete == false) {
        //             userData[itemIndex].complete = true;
        //             tglCircle.classList.remove('yet');
        //             tglCircle.classList.add('checked');
        //             saveTask();
        //         } else {
        //             userData[itemIndex].complete = false;
        //             tglCircle.classList.remove('checked');
        //             tglCircle.classList.add('yet');
        //             saveTask();
        //         }
        //     }
            
        // });

        // taskList.innerHTML = userData.map((data) => { 
        //     return `<div class="task">
        //     <h2 class="task-title">${data.title}</h2>
        //     <p class="task-phrase">${data.description}</p>
        //     <p class="date">${data.date}</p>
        //     <button class="done-toggle-btn">
        //         <div class="toggle-circle yet">
        //             <span class="material-symbols-outlined done">check</span>
        //         </div>
        //     </button>
        //     <div class="options">
        //         <div class="del-edit-btns">
        //             <button class="edit-btn"><span class="material-symbols-outlined">edit</span></button>
        //             <button class="del-btn"><span class="material-symbols-outlined">delete</span></button>
        //         </div>
        //     </div>
        // </div>`;
        // }).join('');
    }

    const render = () => {
        const loadedData = JSON.parse(localStorage.getItem('userData'))
        if(loadedData !== null && loadedData.length > 0)
        userData = loadedData;
        userData.forEach((item) => {
            addTask(item);
        })
    }

    render();
});