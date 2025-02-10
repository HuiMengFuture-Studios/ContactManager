const express = require('express');
const router = express.Router();
const db = require('../models');
const Finance = db.finance; // 假设存在Finance模型

// 创建新财务记录
router.post('/', async (req, res) => {
  try {
    const finance = await Finance.create(req.body);
    res.status(201).json(finance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有财务记录
router.get('/', async (req, res) => {
  try {
    const finances = await Finance.findAll();
    res.status(200).json(finances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个财务记录
router.get('/:id', async (req, res) => {
  try {
    const finance = await Finance.findByPk(req.params.id);
    if (!finance) return res.status(404).json({ message: 'Finance record not found' });
    res.status(200).json(finance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新财务记录
router.put('/:id', async (req, res) => {
  try {
    const finance = await Finance.findByPk(req.params.id);
    if (!finance) return res.status(404).json({ message: 'Finance record not found' });
    await finance.update(req.body);
    res.status(200).json(finance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除财务记录
router.delete('/:id', async (req, res) => {
  try {
    const finance = await Finance.findByPk(req.params.id);
    if (!finance) return res.status(404).json({ message: 'Finance record not found' });
    await finance.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;