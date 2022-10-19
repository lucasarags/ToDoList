import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/todoFrom/TodoForm';
import TodoList from './components/todoList/TodoList';
import './App.css';

export default function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    const todoJSON = localStorage.getItem("todos");
    const retrievedTodos = JSON.parse(todoJSON);
    if (retrievedTodos.length > 0) {
      setTodos(retrievedTodos);
    }
  }, []);

  useEffect(() => {
    const todoJSON = JSON.stringify(todos);
    localStorage.setItem("todos", todoJSON);
  }, [todos]);

  const handleInputChange = (e) => {
    console.log(e.target.id);
    if (e.target.id === "todo-add-input") {
      setTodo(e.target.value);
    } else {
      setEditTodo(e.target.value);
    }
  };
  const handleInputSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    if (e.target.id === "todo-add-form") {
      const newTodo = {
        id: uuidv4(),
        todoText: todo,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setTodo("");
    } else {
      const updateTodos = [...todos].map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, todoText: editTodo };
        }
        return todo;
      });
      setTodos(updateTodos);
      setEditTodoId(null)
      setEditTodo("")
    }

  };
  const removeTodo = (id) => {
    console.log(`Id: ${id}`);
    //array 'todos' vai ser filtrado atras de um dado 'id', fuction callback vai estar dentro do 'filter()', realizando a ação da função
    // utilizando ARROW FUNCTION
    //const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //const retorno = numeros.filter((pares) => (pares %2)== 0);
    //console.log(retorno);
    //O método JavaScript filter() é um recurso que permite a manipulação de elementos em uma array.
    //nesse caso, retornaremos uma nova lista, sem o dado a ser retirado update, e mudaremos o estado, renderizando a nova lista.
    const updateTodos = todos.filter((todo) => { return todo.id !== id });
    setTodos(updateTodos);
    // If you would want to manage the list as state in the List component instead of managing it in the App component, you would have to lift state (estudar depois).
    //neste caso não precisa usar o useReducer (estudar depois) - para estados e transição de estados mais complexos.
  };
  const completeTodo = (id) => {
    console.log(`ID: ${id}`);
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    })
    setTodos(updatedTodos)
  };
  const toggleEditMode = (id) => {
    console.log(`ID: ${id}`);
    const todo = [...todos].find((todo) => {
      return todo.id === id;
    })
    setEditTodoId(id);
    setEditTodo(todo.todoText);
  };

  return (

    <div className="app-container">
      <TodoForm
        id='todo-add'
        type='text'
        btnText='Add'
        value={todo}
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
      />
      <TodoList
        todos={todos}
        editTodo={editTodo}
        editTodoId={editTodoId}
        removeTodo={removeTodo}
        completeTodo={completeTodo}
        toggleEditMode={toggleEditMode}
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
      />
    </div>

  );
};


