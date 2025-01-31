const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 7000;

app.use(cors());

// exsample data
const data = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
// [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }, ...]

app.get('/api/items', (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      // ดึงเอาข้อมูลเฉพาะหน้านั้นๆ
      const results = data.slice(startIndex, endIndex); 
  
      // response กลับเป็น JSON
      res.json({
        totalItems: data.length,
        totalPages: Math.ceil(data.length / limit),
        currentPage: page,
        items: results
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
