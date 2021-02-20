import {App} from './Classes'

addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#addBtn'),
  dropzones = document.querySelectorAll('.drop-zone'),
  input = document.querySelector('#input')

  // dom = new DOM(dropzones, input, todos)
  const todos = JSON.parse(localStorage.getItem('TODOS')) ?? []
  const app = new App(todos, dropzones, input)

  addBtn.addEventListener('click', app.dom.addTodo.bind(app.dom))

  dropzones.forEach(dropZone => {
    dropZone.addEventListener('drop', app.dnd.drop.bind(app.dnd))
    dropZone.addEventListener('dragover', app.dnd.dragover.bind(app.dnd))
    dropZone.addEventListener('dragleave', app.dnd.dragleave.bind(app.dnd))
  })
  window.deleteTodo = app.dom.deleteTodo.bind(app.dom)
  window.dragStart = app.dnd.dragStart.bind(app.dnd)
})