"use client";
import { TypeTodo } from "../types/types";
import { FaTrashAlt, FaClipboard, FaClipboardCheck } from "react-icons/fa";
import React, { useState } from "react";

// 受け取るPropsの型定義
type Props = {
	todos: TypeTodo[];
	setTodos: React.Dispatch<React.SetStateAction<TypeTodo[]>>;
};

// 入力されたTODOをリスト表示するコンポーネント
const TodoList = ({ todos, setTodos }: Props) => {
	const [copiedTodoId, setCopiedTodoId] = useState<number | null | undefined>(null);

	// TODOの完了状態を管理する関数
	const handleChecked = (e: React.ChangeEvent<HTMLInputElement>)=>{
		const targetId = Number(e.currentTarget.value);
		const newTodos = todos.map((todo)=>{
			if(todo.id === targetId){
				return {
					...todo,
					completed:!todo.completed
				}
			}
			return todo;
		})
		setTodos([...newTodos])
	}

	// TODOをクリップボードにコピーする関数
	const handleCopy = (id: number | null, title: string | undefined) => {

		// コピーが押された状態を管理しsetTimeoutでIDがはずれるまでの間出力部でアイコンを変更
		navigator.clipboard
			.writeText(title || "")
			.then(() => {
				setCopiedTodoId(id);

				setTimeout(() => {
					setCopiedTodoId(null);
				}, 1500);
			})
			.catch((err) => {
				alert("todoをコピーできませんでした。");
			});
	};

	// TODOを削除する関数
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		const targetId = Number(e.currentTarget.value);
		const newTodos = todos.filter((todo) => todo.id !== targetId);
		setTodos([...newTodos]);
	};

	
	// TODOリストのコンポーネント出力部
	return (
		<ul className="todo_list">
			{todos.map((todo) => (
				<li key={todo.id}>
					<input type="checkbox" checked={todo.completed} value={todo.id} onChange={handleChecked}/>
					<span className={`todo_title ${todo.completed ? 'completed' : ''}`}>{todo.title}</span>
					<div className="btn_wrap">
						<button
							className="icon_btn"
							data-unit="コピーする"
							onClick={() =>
								handleCopy(todo.id ? todo.id : null, todo.title)
							}
						>
							{copiedTodoId === todo.id ? (
								<FaClipboardCheck color="Green" />
							) : (
								<FaClipboard />
							)}
						</button>
						<button
							className="icon_btn"
							data-unit="削除する"
							onClick={handleDelete}
							value={todo.id}
						>
							<FaTrashAlt />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
};

export default TodoList;