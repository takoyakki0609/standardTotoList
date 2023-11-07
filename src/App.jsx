import { useState } from "react";
import "./App.css";
import uuid from "react-uuid";

function App() {
  const [task, setTask] = useState([
    {
      id: uuid(),
      title: "제목",
      contents: "콘텐츠",
      isDone: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  return (
    // 1. todolist 추가 o, 완료버튼, 되돌리기버튼, 삭제버튼
    <div className="App">
      <header className="header">
        <p>Todo List</p>
        <p>React Standard Class</p>
      </header>
      {/* 인풋 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            const newTask = {
              id: uuid(),
              title: title,
              contents: contents,
              isDone: false,
            };
            setTask([...task, newTask]);
            setTitle('')
            setContents('')
          }}
        >
          추가
        </button>
      </form>
      <div>
        <h2>진행중</h2>
        <div className="ongoing">
          {task
            .filter((item) => {
              return item.isDone === false;
            })
            .map((item) => {
              return (
                <div key={item.id} className="ongoing-box">
                  <h3>{item.title}</h3>
                  <p>{item.contents}</p>
                  <button
                    onClick={() => {
                      const newTask = task.map((t) => {
                        if (t.id === item.id) {
                          return {
                            ...t,
                            isDone: !t.isDone,
                          };
                        }
                        return t;
                      });
                      setTask(newTask);
                    }}
                  >
                    완료
                  </button>
                  <button
                    onClick={() => {
                      const deleteTask = task.filter((tasks) => {
                        return tasks.id !== item.id;
                      });
                      setTask(deleteTask);
                    }}
                  >
                    삭제
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h2>완료</h2>
        <div className="done">
          {task
            .filter((t) => {
              return t.isDone === true;
            })
            .map((item) => {
              return (
                <div key={item.id}>
                  <h3>{item.title}</h3>
                  <p>{item.contents}</p>
                  <button
                    onClick={() => {
                      const newTask = task.map((t) => {
                        if (t.id === item.id) {
                          return {
                            ...t,
                            isDone: !t.isDone,
                          };
                        }
                        return t;
                      });
                      setTask(newTask);
                    }}
                  >
                    되돌리기
                  </button>
                  <button
                    onClick={() => {
                      const deleteTask = task.filter((tasks) => {
                        return tasks.id !== item.id;
                      });
                      setTask(deleteTask);
                    }}
                  >
                    삭제
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
