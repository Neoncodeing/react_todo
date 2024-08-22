"use client";

import React, { useState, useEffect } from "react";
import { TypeTodo } from "../types/types";
import TodoList from "./TodoList";


//　todoを作成するコンポーネント
const InputTodo = () => {
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<TypeTodo[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

    //　ローカルストレージからデータをセット
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        setTodos(savedTodos ? JSON.parse(savedTodos) : []);

        setIsInitialLoad(false);
    }, [])

    //　インプットに入力された値をステートに保存
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTodo(e.target.value);
    };

    //　フォーム送信時の処理
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //　フォーム内の押されたボタンを判別
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

        //　デリートであればローカルストレージ及びステートを初期化
        //　それ以外（作成ボタン・インプット内でエンター）であればidとtitleをセット
        if (submitter.value === 'delete') {
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

    //　リロード時以外はtodosが更新される度にローカルストレージのデータを合わせて更新
    useEffect(() => {
        if(!isInitialLoad){
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos,isInitialLoad]);

    return (
        <div className="container">
            <form className="" onSubmit={handleSubmit}>
                <input className="input" type="text" name="title" value={todo} onChange={handleChange} />

                <div className="padding_container">
                    <button className="btn" value="create">作成</button>
                    <button className="btn" value="delete">リセット</button>
                </div>
            </form>
            <TodoList todos={todos} setTodos={setTodos} />
        </div>
    )
}

export default InputTodo;