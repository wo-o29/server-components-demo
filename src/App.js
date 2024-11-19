import {Suspense, use} from 'react';

export default function App() {
  return (
    <div>
      <h1>메인 컴포넌트</h1>
      <div style={{display: 'flex', gap: '100px'}}>
        <Suspense fallback={<div>로딩중...</div>}>
          <TodoComponents userId={1} />
        </Suspense>
        <Suspense fallback={<div>로딩중...</div>}>
          <TodoComponents userId={2} />
        </Suspense>
      </div>
    </div>
  );
}

const fetchUser = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${userId}`
  );
  const data = await res.json();
  return data;
};

function TodoComponents({userId}) {
  const todoData = use(fetchUser(userId));

  return (
    <div>
      <h3>Todo 컴포넌트</h3>
      <p>유저ID: {todoData.id}</p>
      <p>제목: {todoData.title}</p>
    </div>
  );
}
