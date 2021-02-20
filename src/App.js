export class App{
  constructor(todos, dom, dropzones) {
    this.todos = todos
    this.dom = dom
    this.dropzones = dropzones

    this.init()
  }
  init(){
    let idx
    this.todos.todos.forEach(todo => {
      this.dropzones[todo.dropzone].insertAdjacentHTML('beforeend', this.dom.todoHtml(todo))
      idx = todo.idx
    })
    this.dom.setIdx(idx ?? '0')
  }
}