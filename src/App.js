import {Suspense, use} from 'react';

export default function App() {
  return (
    <div>
      <h1>메인 컴포넌트</h1>
      <div style={{display: 'flex', gap: '100px'}}>
        <Suspense fallback={<div>로딩중...</div>}>
          <A userId={1} />
        </Suspense>
        <B />
      </div>
    </div>
  );
}

const fetchUser = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${userId}`
  );
  const data = await res.json();
  console.log(data);
  return data;
};

function A({userId}) {
  const todoData = use(fetchUser(userId));
  return (
    <div>
      <h2>A 컴포넌트</h2>
      <p>유저ID: {todoData.userId}</p>
      <p>제목: {todoData.title}</p>
    </div>
  );
}

function B() {
  return (
    <div>
      <h2>B 컴포넌트</h2>
    </div>
  );
}
