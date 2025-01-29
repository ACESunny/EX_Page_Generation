'use client';

import React, { useState, useEffect } from "react";

export default function Home() {
  const [display_name, setDisplayName] = useState("");
  const [product_name, setProductName] = useState("");
  const [responseMessage, setresponseMessage] = useState("");
  const [products, setproducts] = useState([]);

  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:7000/api/data");
      const data = await response.json();
      setproducts(data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:7000/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        display_name: display_name, 
        product_name: product_name 
      }),
    });

    const data = await response.json();
    setresponseMessage(data.message || 'Data sent to server successfully');

    const updatedResponse = await fetch("http://localhost:7000/api/data");
    const updatedData = await updatedResponse.json();
    setproducts(updatedData);
  };

  
  return (
    <div>
      <main>
        <h1>Marketplace</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            value={display_name}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Name"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />
          <button type="submit">ส่งข้อมูล</button>
        </form>

        {responseMessage && <p>{responseMessage}</p>}

        <h2>Products List</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <strong>{product.display_name}</strong>: {product.product_name}
            </li>
          ))}
        </ul>

      </main>

    </div>
  );
}
