"use client";
import { TypeTodo } from "../types/types";

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
			{todos.map((todo) => (
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
			))}
		</ul>
	);
};

export default TodoList;
