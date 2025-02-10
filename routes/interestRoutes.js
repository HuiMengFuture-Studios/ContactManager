const express = require('express');
const router = express.Router();
const db = require('../models');
const Interest = db.interest;

// 创建新个人喜好
router.post('/', async (req, res) => {
  try {
    const interest = await Interest.create(req.body);
    res.status(201).json(interest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有个人喜好
router.get('/', async (req, res) => {
  try {
    const interests = await Interest.findAll();
    res.status(200).json(interests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个个人喜好
router.get('/:id', async (req, res) => {
  try {
    const interest = await Interest.findByPk(req.params.id);
    if (!interest) return res.status(404).json({ message: 'Interest not found' });
    res.status(200).json(interest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新个人喜好
router.put('/:id', async (req, res) => {
  try {
    const interest = await Interest.findByPk(req.params.id);
    if (!interest) return res.status(404).json({ message: 'Interest not found' });
    await interest.update(req.body);
    res.status(200).json(interest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除个人喜好
router.delete('/:id', async (req, res) => {
  try {
    const interest = await Interest.findByPk(req.params.id);
    if (!interest) return res.status(404).json({ message: 'Interest not found' });
    await interest.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;