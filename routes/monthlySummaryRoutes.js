const express = require('express');
const router = express.Router();
const db = require('../models');
const MonthlySummary = db.monthlySummary;

// 创建新月度总结
router.post('/', async (req, res) => {
  try {
    const monthlySummary = await MonthlySummary.create(req.body);
    res.status(201).json(monthlySummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有月度总结
router.get('/', async (req, res) => {
  try {
    const monthlySummaries = await MonthlySummary.findAll();
    res.status(200).json(monthlySummaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个月度总结
router.get('/:id', async (req, res) => {
  try {
    const monthlySummary = await MonthlySummary.findByPk(req.params.id);
    if (!monthlySummary) return res.status(404).json({ message: 'MonthlySummary not found' });
    res.status(200).json(monthlySummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新月度总结
router.put('/:id', async (req, res) => {
  try {
    const monthlySummary = await MonthlySummary.findByPk(req.params.id);
    if (!monthlySummary) return res.status(404).json({ message: 'MonthlySummary not found' });
    await monthlySummary.update(req.body);
    res.status(200).json(monthlySummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除月度总结
router.delete('/:id', async (req, res) => {
  try {
    const monthlySummary = await MonthlySummary.findByPk(req.params.id);
    if (!monthlySummary) return res.status(404).json({ message: 'MonthlySummary not found' });
    await monthlySummary.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;