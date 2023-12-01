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

    let add,
      active = todos,
      complete = completedTodos;
    
    if (source.droppableId === 'TodosList') {
      add = active[ source.index ];
      active.splice(source.index, 1);
    } else {
      add = complete[ source.index ];
      complete.splice(source.index, 1);
    }

    if (source.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      active.splice(destination.index, 0, add);
    }
    
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
