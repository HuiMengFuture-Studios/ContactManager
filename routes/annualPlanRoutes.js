const express = require('express');
const router = express.Router();
const db = require('../models');
const AnnualPlan = db.annualPlan;

// 创建新年度计划
router.post('/', async (req, res) => {
  try {
    const annualPlan = await AnnualPlan.create(req.body);
    res.status(201).json(annualPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有年度计划
router.get('/', async (req, res) => {
  try {
    const annualPlans = await AnnualPlan.findAll();
    res.status(200).json(annualPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个年度计划
router.get('/:id', async (req, res) => {
  try {
    const annualPlan = await AnnualPlan.findByPk(req.params.id);
    if (!annualPlan) return res.status(404).json({ message: 'Annual Plan not found' });
    res.status(200).json(annualPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新年度计划
router.put('/:id', async (req, res) => {
  try {
    const annualPlan = await AnnualPlan.findByPk(req.params.id);
    if (!annualPlan) return res.status(404).json({ message: 'Annual Plan not found' });
    await annualPlan.update(req.body);
    res.status(200).json(annualPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除年度计划
router.delete('/:id', async (req, res) => {
  try {
    const annualPlan = await AnnualPlan.findByPk(req.params.id);
    if (!annualPlan) return res.status(404).json({ message: 'Annual Plan not found' });
    await annualPlan.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;