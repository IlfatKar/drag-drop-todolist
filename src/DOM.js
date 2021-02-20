export class DOM {
  constructor(dropzones, input, todos) {
    this.dropzones = dropzones
    this.input = input
    this.todos = todos
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
  setIdx(idx){
    this.idx = idx
  }
}
//
// function addTodo(e) {
//   const value = input.value.trim()
//   if (value) {
//     dropzones[0].insertAdjacentHTML('beforeend', todoHtml({idx: addTodo.idx, value}))
//     input.value = ''
//   }
//   todos.addTodo({idx: addTodo.idx, value, dropzone: '0'})
//   addTodo.idx++
// }

// function deleteTodo(btn) {
//   const todo = btn.closest('.todo')
//   todos.deleteTodo(todo)
//   todo.remove()
// }


function todoHtml(todo) {
  return `
       <div class="todo" draggable="true" data-id="${todo.idx}" ondragstart="dragStart(event)">
          <h5>${todo.value}</h5>
          <button class="button button-outline btn-del" onclick="deleteTodo(this)">&times</button>
       </div>
    `
}