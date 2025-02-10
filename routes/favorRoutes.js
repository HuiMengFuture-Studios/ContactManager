const express = require('express');
const router = express.Router();
const db = require('../models');
const Favor = db.favor;

// 创建新人情往来
router.post('/', async (req, res) => {
  try {
    const favor = await Favor.create(req.body);
    res.status(201).json(favor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有人情往来
router.get('/', async (req, res) => {
  try {
    const favors = await Favor.findAll();
    res.status(200).json(favors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个人情往来
router.get('/:id', async (req, res) => {
  try {
    const favor = await Favor.findByPk(req.params.id);
    if (!favor) return res.status(404).json({ message: 'Favor not found' });
    res.status(200).json(favor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新人情往来
router.put('/:id', async (req, res) => {
  try {
    const favor = await Favor.findByPk(req.params.id);
    if (!favor) return res.status(404).json({ message: 'Favor not found' });
    await favor.update(req.body);
    res.status(200).json(favor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除人情往来
router.delete('/:id', async (req, res) => {
  try {
    const favor = await Favor.findByPk(req.params.id);
    if (!favor) return res.status(404).json({ message: 'Favor not found' });
    await favor.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;