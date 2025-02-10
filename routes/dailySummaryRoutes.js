const express = require('express');
const router = express.Router();
const db = require('../models');
const DailySummary = db.dailySummary;

// 创建新每日总结
router.post('/', async (req, res) => {
  try {
    const dailySummary = await DailySummary.create(req.body);
    res.status(201).json(dailySummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有每日总结
router.get('/', async (req, res) => {
  try {
    const dailySummaries = await DailySummary.findAll();
    res.status(200).json(dailySummaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个每日总结
router.get('/:id', async (req, res) => {
  try {
    const dailySummary = await DailySummary.findByPk(req.params.id);
    if (!dailySummary) return res.status(404).json({ message: 'DailySummary not found' });
    res.status(200).json(dailySummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新每日总结
router.put('/:id', async (req, res) => {
  try {
    const dailySummary = await DailySummary.findByPk(req.params.id);
    if (!dailySummary) return res.status(404).json({ message: 'DailySummary not found' });
    await dailySummary.update(req.body);
    res.status(200).json(dailySummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除每日总结
router.delete('/:id', async (req, res) => {
  try {
    const dailySummary = await DailySummary.findByPk(req.params.id);
    if (!dailySummary) return res.status(404).json({ message: 'DailySummary not found' });
    await dailySummary.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;