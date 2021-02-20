export class Todos {
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