import {DragAndDrop} from './DragAndDrop'
import {Todos} from './Todos'
import {DOM} from './DOM'


let input, fCol, dropzones, dom

addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#addBtn')
  dropzones = document.querySelectorAll('.drop-zone')
  input = document.querySelector('#input')
  fCol = document.querySelector('#first-col')

  dom = new DOM(dropzones, input, todos)

  init()

  addBtn.addEventListener('click', dom.addTodo.bind(dom))

  dropzones.forEach(dropZone => {
    dropZone.addEventListener('drop', dnd.drop.bind(dnd))
    dropZone.addEventListener('dragover', dnd.dragover.bind(dnd))
    dropZone.addEventListener('dragleave', dnd.dragleave.bind(dnd))
  })
  window.deleteTodo = dom.deleteTodo.bind(dom)
  window.dragStart = dnd.dragStart.bind(dnd)
})

const todos = new Todos(JSON.parse(localStorage.getItem('TODOS')) ?? [])
const dnd = new DragAndDrop(todos)


function init() {
  let idx
  todos.todos.forEach(todo => {
    dropzones[todo.dropzone].insertAdjacentHTML('beforeend', dom.todoHtml(todo))
    idx = todo.idx
  })
  dom.setIdx(idx ?? '0')
}
