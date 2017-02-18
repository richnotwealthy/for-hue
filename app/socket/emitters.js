import {socket} from './listeners';

export const addTodoEmit = (todo) => {
  let dataToSave = {
    value: todo,
    isDone: false
  }
  socket.emit('add-todo', dataToSave);
}

export const editTodoEmit = (id, status) => {
  let dataToSave = {
    id,
    isDone: status
  }
  socket.emit('edit-todo', dataToSave);
}

export const deleteTodoEmit = (id) => {
  socket.emit('delete-todo', id);
}

export default {
  addTodoEmit,
  editTodoEmit,
  deleteTodoEmit
}