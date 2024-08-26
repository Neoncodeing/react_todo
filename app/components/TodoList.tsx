"use client";
import { TypeTodo } from "../types/types";
import { FaClipboard } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
	todos: TypeTodo[];
	setTodos: React.Dispatch<React.SetStateAction<TypeTodo[]>>;
};

const TodoList = ({ todos, setTodos }: Props) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const targetId = Number(e.currentTarget.value);
		const newTodos = todos.filter((todo) => todo.id !== targetId);
		setTodos([...newTodos]);
	};

	return (
		<ul className="todo_list">
			{/* {todos.map((todo) => (
				<li key={todo.id}>
					{todo.title}
					<button
						className="btn"
						onClick={handleClick}
						value={todo.id}
					>
						削除
					</button>
				</li>
			))} */}
			{todos.map((todo) => (
				<li key={todo.id}>
					{todo.title ? (todo.title.length > 25 ? todo.title.substring(0, 25) + '...' : todo.title.substring(0, 25)) : ''}
					<div className="btn_wrap">
						<button className="icon_btn" onClick={()=>{
							navigator.clipboard.writeText(todo.title ? todo.title : '')
							.then(()=>{
								alert('todoをコピーしました。');
							}).catch(err =>{
								alert('todoをコピーできませんでした。')
							});
						}}><FaClipboard /></button>
						<button className="icon_btn" onClick={handleClick} value={todo.id}>
							<FaTrashAlt />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
