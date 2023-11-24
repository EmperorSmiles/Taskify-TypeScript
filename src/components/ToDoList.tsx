import React from 'react'
import './style.css'
import { Todo } from '../modal';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[];
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const ToDoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
    
    return (
        
        <div className="container">
            <Droppable droppableId='TodosList'>
                {
                    (provided, ) => (
                        <div className="todos">
                <span className="todos__heading">
                    Active Task
                </span>
                {
                    todos.map((todo) => (
                        <SingleTodo todo={todo} todos={todos} key={todo.id} setTodos={setTodos}/>
                    ))
                }
            </div>
                    )
        }

            </Droppable>
            <div className="todos remove">
            <span className="todos__heading">
                    Completed Task
                </span>
                {
                    todos.map((todo) => (
                        <SingleTodo todo={todo} todos={todos} key={todo.id} setTodos={setTodos}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ToDoList
