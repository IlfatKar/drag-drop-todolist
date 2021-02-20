import {App} from './Classes'

addEventListener('DOMContentLoaded', () => {
  const todos = JSON.parse(localStorage.getItem('TODOS')) ?? []
  new App(todos, '.drop-zone', '#input', '#addBtn')
})