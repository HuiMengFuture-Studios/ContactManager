const express = require('express');
const router = express.Router();
const db = require('../models');
const Transaction = db.transaction;

// 创建新事务
router.post('/', async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有事务
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个事务
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新事务
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    await transaction.update(req.body);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除事务
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    await transaction.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;