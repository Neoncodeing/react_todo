"use client";

import React, { useState, useEffect } from "react";
import { TypeTodo } from "../types/types";
import TodoList from "./TodoList";

const InputTodo = () => {
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<TypeTodo[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        setTodos(savedTodos ? JSON.parse(savedTodos) : []);

        setIsInitialLoad(false);
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTodo(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

        if (submitter.value === 'delete') {
            console.log(submitter.value);
            localStorage.removeItem('todos');
            setTodos([]);
        } else {
            if(todo){
                const newTodo: TypeTodo = {
                    id: todos.length + 1,
                    title: todo
                };
                setTodos([...todos, newTodo])
            }    
        }
        setTodo("");
    }

    useEffect(() => {
        if(!isInitialLoad){
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos,isInitialLoad]);

    return (
        <div className="container">
            <form className="" onSubmit={handleSubmit}>
                <input className="input" type="text" name="title" value={todo} onChange={handleChange} />

                <div className="pdding_container">
                    <button className="btn" value="create">作成</button>
                    <button className="btn" value="delete">リセット</button>
                </div>
            </form>
            <TodoList todos={todos} setTodos={setTodos} />
        </div>
    )
}

export default InputTodo;