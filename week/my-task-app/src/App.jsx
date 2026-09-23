import { useState } from "react";

function App() {
  // タスクの一覧データ（初期データ例）
  const [tasks, setTasks] = useState([
    { id: 1, text: "牛乳を買う", done: false },
    { id: 2, text: "Reactの復習", done: true },
    { id: 3, text: "ミニドリルを解く", done: false },
  ]);

  // 入力フォームの値
  const [input, setInput] = useState("");

  // フィルターの状態 ("all" | "undone" | "done")
  const [filter, setFilter] = useState("all");

  // タスクの追加
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  // タスクの完了／未完了の切り替え
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // タスクの削除
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // フィルターの条件に応じて表示するタスクを絞り込む
  const visibleTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "undone") return !task.done;
    return true; // "all" の場合は全て表示
  });

  return (
    <div className="max-w-md mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">タスク管理</h1>

      {/* 入力フォーム */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          追加
        </button>
      </div>

      {/* フィルターボタン */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={
            filter === "all"
              ? "bg-blue-500 text-white px-3 py-1.5 rounded"
              : "border border-gray-400 px-3 py-1.5 rounded text-gray-700"
          }
        >
          すべて
        </button>
        <button
          onClick={() => setFilter("undone")}
          className={
            filter === "undone"
              ? "bg-blue-500 text-white px-3 py-1.5 rounded"
              : "border border-gray-400 px-3 py-1.5 rounded text-gray-700"
          }
        >
          未完了
        </button>
        <button
          onClick={() => setFilter("done")}
          className={
            filter === "done"
              ? "bg-blue-500 text-white px-3 py-1.5 rounded"
              : "border border-gray-400 px-3 py-1.5 rounded text-gray-700"
          }
        >
          完了済み
        </button>
      </div>

      {/* タスク一覧 */}
      <ul className="space-y-2">
        {visibleTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
          >
            <span
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer select-none ${
                task.done ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400 hover:text-red-600 text-sm"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;