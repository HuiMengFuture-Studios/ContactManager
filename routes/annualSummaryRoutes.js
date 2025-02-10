const express = require('express');
const router = express.Router();
const db = require('../models');
const AnnualSummary = db.annualSummary;

// 创建新年度总结
router.post('/', async (req, res) => {
  try {
    const annualSummary = await AnnualSummary.create(req.body);
    res.status(201).json(annualSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有年度总结
router.get('/', async (req, res) => {
  try {
    const annualSummaries = await AnnualSummary.findAll();
    res.status(200).json(annualSummaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个年度总结
router.get('/:id', async (req, res) => {
  try {
    const annualSummary = await AnnualSummary.findByPk(req.params.id);
    if (!annualSummary) return res.status(404).json({ message: 'AnnualSummary not found' });
    res.status(200).json(annualSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新年度总结
router.put('/:id', async (req, res) => {
  try {
    const annualSummary = await AnnualSummary.findByPk(req.params.id);
    if (!annualSummary) return res.status(404).json({ message: 'AnnualSummary not found' });
    await annualSummary.update(req.body);
    res.status(200).json(annualSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除年度总结
router.delete('/:id', async (req, res) => {
  try {
    const annualSummary = await AnnualSummary.findByPk(req.params.id);
    if (!annualSummary) return res.status(404).json({ message: 'AnnualSummary not found' });
    await annualSummary.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;