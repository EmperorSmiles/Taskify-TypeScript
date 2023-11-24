import { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import { Todo } from './modal';
import ToDoList from './components/ToDoList';
import { DragDropContext } from "react-beautiful-dnd";

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


  console.log(todos)
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <ToDoList todos={todos} setTodos={setTodos}
        completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
    </div>
    </DragDropContext>
  )
}

export default App
