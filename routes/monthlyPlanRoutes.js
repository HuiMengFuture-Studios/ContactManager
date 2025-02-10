const express = require('express');
const router = express.Router();
const db = require('../models');
const MonthlyPlan = db.monthlyPlan;

// 创建新月度计划
router.post('/', async (req, res) => {
  try {
    const monthlyPlan = await MonthlyPlan.create(req.body);
    res.status(201).json(monthlyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有月度计划
router.get('/', async (req, res) => {
  try {
    const monthlyPlans = await MonthlyPlan.findAll();
    res.status(200).json(monthlyPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个月度计划
router.get('/:id', async (req, res) => {
  try {
    const monthlyPlan = await MonthlyPlan.findByPk(req.params.id);
    if (!monthlyPlan) return res.status(404).json({ message: 'MonthlyPlan not found' });
    res.status(200).json(monthlyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新月度计划
router.put('/:id', async (req, res) => {
  try {
    const monthlyPlan = await MonthlyPlan.findByPk(req.params.id);
    if (!monthlyPlan) return res.status(404).json({ message: 'MonthlyPlan not found' });
    await monthlyPlan.update(req.body);
    res.status(200).json(monthlyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除月度计划
router.delete('/:id', async (req, res) => {
  try {
    const monthlyPlan = await MonthlyPlan.findByPk(req.params.id);
    if (!monthlyPlan) return res.status(404).json({ message: 'MonthlyPlan not found' });
    await monthlyPlan.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;