window.addEventListener('load', function () {
  const localStorageArray = []
  for (let key in localStorage) {
    if (isNaN(key) === false) {
      localStorageArray.push(key)
    }
  }
  localStorageArray.sort(function (task_1_id, task_2_id) {
    return task_1_id - task_2_id
  })

  for (k of localStorageArray) {
    const localStorageItems = localStorage.getItem(k)
    const setTasksWindowHTML = JSON.parse(localStorageItems)
    taskToAdd(setTasksWindowHTML, k)
  }
});

let tasks = []
const taskProp = [
  'textArea',
  'date',
  'time',
]

function resetForm() {
  form.reset()
}

function add() {

  let d = new Date()
  let n = d.getTime()
  let taskToLocalStorage

  const taskEach = {}
  for (let task of taskProp) {
    taskEach[task] = form.elements[task].value
  }
  taskToLocalStorage = JSON.stringify(taskEach)
  localStorage.setItem(n, taskToLocalStorage)
  tasks.push(taskEach)
  taskToAdd(taskEach, n)
  form.reset()
}

function taskToAdd(taskEach, taskid) {

  const taskDetails = document.createElement('div')
  taskDetails.classList.add('taskDetails')
  taskDetails.id = "task_" + taskid
  taskDetails.setAttribute('onmouseover', 'glyphIconShow("' + taskid + '")')
  taskDetails.setAttribute('onmouseout', 'glyphIconHide("' + taskid + '")')

  const imagephoto = document.createElement('img')
  imagephoto.src = "./notebg.png"
  imagephoto.classList.add('img')



  const gliphy = document.createElement('span')
  gliphy.id = "gliphy_" + taskid
  gliphy.classList.add('glyphicon')
  gliphy.classList.add('glyphicon-remove')
  gliphy.classList.add('glyphiRemove')
  gliphy.setAttribute('onclick', 'deleteTask("' + taskid + '")')

  const inputTextArea = document.createElement('p')
  inputTextArea.classList.add('inputTextArea')
  inputTextArea.innerHTML = taskEach.textArea

  const inputDateTime = document.createElement('div')
  inputDateTime.classList.add('dateTimeInput')
  inputDateTime.innerHTML = taskEach.date + "<br>" + taskEach.time

  taskDetails.appendChild(imagephoto)
  taskDetails.appendChild(gliphy)
  taskDetails.appendChild(inputTextArea)
  taskDetails.appendChild(inputDateTime)

  const taskListRef = document.querySelector('.taskList')
  taskListRef.appendChild(taskDetails)
}

function deleteTask(id) {
  localStorage.removeItem(id)
  document.getElementById("task_" + id).remove()
}

function glyphIconShow(id) {
  const glyphicon = document.querySelector('span' + '#gliphy_' + id)
  glyphicon.classList.remove('glyphiRemove')
  glyphicon.classList.add('glyphiconShow')
}

function glyphIconHide(id) {
  const glyphicon = document.querySelector('span' + '#gliphy_' + id)
  glyphicon.classList.remove('glyphiconShow')
  glyphicon.classList.add('glyphiRemove')

}




