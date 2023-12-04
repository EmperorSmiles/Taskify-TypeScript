import { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import ToDoList from './components/ToDoList';
import { Todo } from './modal';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App:React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  
  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };

  const onDragEnd = (result:DropResult) => {
    const { source, destination } = result
    console.log(result)

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    let add;
    const active = todos;
    const complete = completedTodos;
    
    if (source.droppableId === 'TodosList') {
      add = active[ source.index ];
      active.splice(source.index, 1);
    } else {
      add = complete[ source.index ];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    
    setCompletedTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <span className='heading'>Taskify by Smiles</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <ToDoList todos={todos} setTodos={setTodos}
          completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
        <footer className='footer'>Built with Typescript by <a href="https://github.com/EmperorSmiles" target="_blank">Favour Smiles Adejoh</a></footer>
    </div>
    </DragDropContext>
  )
}

export default App
