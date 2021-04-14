import Input from './Input'
import TopNavbar from './TopNavbar'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { firestore } from '../config/firebase';
import TodoItem from './TodoItem';
import Filter from './Filter';

export default function Todo() {
    const { currentUser } = useAuth();
    const [firstName, setFistName] = useState('');
    const [lastName, setLastName] = useState('');
    const [filter, setFilter] = useState("ALL");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            setTodos([]);
            const data = await firestore.collection("todos").where("user_id", "==", currentUser.uid).get();
            data.forEach(doc => {
                const todo = doc.data();
                todo.id = doc.id;
                setTodos(todos => [...todos, todo]);
            })
        }
        fetchData();
    }, [])

    useEffect(() => {
        firestore.collection('users').doc(currentUser.uid).get()
            .then((data) => {
                setFistName(data.data().firstName);
                setLastName(data.data().lastName);
            })
    }, [currentUser.uid]);

    const handleAdd = async (input) => {
        const newTodo = {
            todo: input,
            user_id: currentUser.uid,
            done: false,
            createdAt: new Date().getTime()
        }
        const newData = await firestore.collection('todos').add(newTodo);
        newTodo.id = newData.id;
        setTodos([...todos, newTodo]);
    }

    const username = firstName + " " + lastName;

    const handleFilterChange = (value) => { setFilter(value) }

    const handleCheck = checked => {
        const newTodos = todos.map(todo => {
            if(todo.id === checked.id){
                todo.done =! todo.done;
                firestore.collection('todos').doc(todo.id).update({ done: todo.done });
            }
            return todo;
        })
        setTodos(newTodos);
    }

    const displayItems = todos.filter(item => {
        if (filter === 'ALL') return true;
        if (filter === 'TODO') return !item.done;
        if (filter === 'DONE') return item.done;
    }); 
      

    return (
        <div>
            <TopNavbar username={ username } />
            <Input onAdd={ handleAdd } />
            <Filter onChange={ handleFilterChange } value={filter} />
            { displayItems.map(todo => (
                <TodoItem key={ todo.id } todo={ todo } onCheck={ handleCheck } />
            )) }
        </div>
    )
}
