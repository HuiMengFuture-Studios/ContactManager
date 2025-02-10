const express = require('express');
const router = express.Router();
const db = require('../models');
const DailyPlan = db.dailyPlan;

// 创建新每日计划
router.post('/', async (req, res) => {
  try {
    const dailyPlan = await DailyPlan.create(req.body);
    res.status(201).json(dailyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有每日计划
router.get('/', async (req, res) => {
  try {
    const dailyPlans = await DailyPlan.findAll();
    res.status(200).json(dailyPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个每日计划
router.get('/:id', async (req, res) => {
  try {
    const dailyPlan = await DailyPlan.findByPk(req.params.id);
    if (!dailyPlan) return res.status(404).json({ message: 'DailyPlan not found' });
    res.status(200).json(dailyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新每日计划
router.put('/:id', async (req, res) => {
  try {
    const dailyPlan = await DailyPlan.findByPk(req.params.id);
    if (!dailyPlan) return res.status(404).json({ message: 'DailyPlan not found' });
    await dailyPlan.update(req.body);
    res.status(200).json(dailyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除每日计划
router.delete('/:id', async (req, res) => {
  try {
    const dailyPlan = await DailyPlan.findByPk(req.params.id);
    if (!dailyPlan) return res.status(404).json({ message: 'DailyPlan not found' });
    await dailyPlan.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;