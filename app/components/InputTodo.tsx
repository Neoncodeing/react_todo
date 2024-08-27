"use client";

import React, { useState, useEffect } from "react";
import { TypeTodo } from "../types/types";
import TodoList from "./TodoList";

// TODO入力エリアのコンポーネント
const InputTodo = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<TypeTodo[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

    // ローカルストレージに保存されたTODOを読み込み
    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        setTodos(savedTodos ? JSON.parse(savedTodos) : []);

        setIsInitialLoad(false);
    }, []);

    // 入力されたTODOの状態を管理する関数
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setTodo(e.target.value);
    };

    // フォーム送信時にTODOを作成する関数
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // どのボタンが押されたかを取得
        const submitter = (e.nativeEvent as SubmitEvent)
            .submitter as HTMLButtonElement;

		// 押されたボタンによって処理を振り分け
        if (submitter.value === "delete") {
            setTodos([]);
            setTodo("");
            localStorage.removeItem("todos");
        } else {
            if (todo) {
                const newTodo: TypeTodo = {
                    id: todos.length + 1,
                    title: todo,
                    completed: false,
                };
                setTodos([...todos, newTodo]);
            }
            setTodo("");
        }
    };

	// 初回ロード時はローカルストレージを更新しない
    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos, isInitialLoad]);

	// コンポーネント出力部
    return (
        <>
            <div className="container">
                <form className="" onSubmit={handleSubmit}>
                    <input
                        className="input"
                        type="text"
                        name="title"
                        value={todo}
                        onChange={handleChange}
                    />

                    <div className="padding_container">
                        <button className="btn" value="create">
                            作成
                        </button>
                        <button className="btn" value="delete">
                            リセット
                        </button>
                    </div>
                </form>
				{/* TODOリストをコンポーネントから呼び出し */}
                <TodoList todos={todos} setTodos={setTodos} />
            </div>
            <div className="spacer"></div>
        </>
    );
};

export default InputTodo;
