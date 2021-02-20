export class App {
  constructor(todos, dropzones, input) {
    this.todos = new Todos(todos)
    this.dnd = new DragAndDrop(this.todos)
    this.dropzones = dropzones
    this.dom = new DOM(input, this.todos, this.dropzones)

    this.init()
  }

  init() {
    let idx
    this.todos.todos.forEach(todo => {
      this.dropzones[todo.dropzone].insertAdjacentHTML('beforeend', this.dom.todoHtml(todo))
      idx = todo.idx
    })
    this.dom.setIdx(idx ?? '0')
  }
}

class DOM {
  constructor(input, todos, dropzones) {
    this.input = input
    this.todos = todos
    this.dropzones = dropzones
  }

  addTodo(e) {
    const value = this.input.value.trim()
    if (value) {
      this.dropzones[0].insertAdjacentHTML('beforeend', this.todoHtml({idx: this.idx, value}))
      this.input.value = ''
    }
    this.todos.addTodo({idx: this.idx, value, dropzone: '0'})
    this.idx++
  }

  deleteTodo(btn) {
    const todo = btn.closest('.todo')
    this.todos.deleteTodo(todo)
    todo.remove()
  }

  todoHtml(todo) {
    return `
       <div class="todo" draggable="true" data-id="${todo.idx}" ondragstart="dragStart(event)">
          <h5>${todo.value}</h5>
          <button class="button button-outline btn-del" onclick="deleteTodo(this)">&times</button>
       </div>
    `
  }

  setIdx(idx) {
    this.idx = idx
  }
}

class DragAndDrop {
  constructor(todos) {
    this.todos = todos
  }

  drop(e) {
    e.preventDefault()
    const idx = e.dataTransfer.getData('Text')
    const dropzone = e.target.closest('.drop-zone').dataset.dropzone
    this.todos.changeDropzone(idx, dropzone)
    e.target.closest('.drop-zone').appendChild(document.querySelector(`[data-id='${idx}']`))
    e.target.closest('.drop-zone').classList.remove('drag-over')
  }

  dragover(e) {
    e.preventDefault()
    e.target.closest('.drop-zone').classList.add('drag-over')
  }

  dragleave(e) {
    e.preventDefault()
    e.target.closest('.drop-zone').classList.remove('drag-over')
  }

  dragStart(e) {
    e.dataTransfer.setData('Text', e.target.dataset.id)
  }
}

class Todos {
  constructor(todos = []) {
    this.TODOS = todos
  }

  addTodo(todo) {
    this.TODOS.push(todo)
    this.saveInLocalStorage()
  }

  deleteTodo(todo) {
    this.TODOS = this.TODOS.filter(el => +el.idx !== +todo.dataset.id)
    this.saveInLocalStorage()
  }

  changeDropzone(idx, dropzone) {
    this.TODOS = this.TODOS.map(todo => {
      if (+todo.idx === +idx) {
        todo.dropzone = dropzone
      }
      return todo
    })
    this.saveInLocalStorage()
  }

  saveInLocalStorage() {
    localStorage.setItem('TODOS', JSON.stringify(this.TODOS))
  }

  get todos() {
    return this.TODOS
  }
}