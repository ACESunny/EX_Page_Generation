import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1); // หน้าปัจจุบัน
  const [totalPages, setTotalPages] = useState(0); // จำนวนหน้าทั้งหมด

  // ดึงข้อมูลจาก API เมื่อค่า page เปลี่ยนแปลง
  useEffect(() => {
    fetch(`http://localhost:7000/api/items?page=${page}&limit=10`)
      .then(response => response.json())
      .then(data => {
        setItems(data.items);
        setTotalPages(data.totalPages);
      });
  }, [page]);

  return (
    <div className="App">
      <h1>Pagination</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <div>
        {/* BTN Previous */}
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        {/* BTN Next */}
        <button onClick={() => setPage(prev => prev + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>

    </div>
  );
}

export default App;