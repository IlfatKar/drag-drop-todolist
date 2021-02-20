export class DragAndDrop {
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
