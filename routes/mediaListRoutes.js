const express = require('express');
const router = express.Router();
const db = require('../models');
const MediaList = db.mediaList;

// 创建新观影/读书清单
router.post('/', async (req, res) => {
  try {
    const mediaList = await MediaList.create(req.body);
    res.status(201).json(mediaList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有观影/读书清单
router.get('/', async (req, res) => {
  try {
    const mediaLists = await MediaList.findAll();
    res.status(200).json(mediaLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个观影/读书清单
router.get('/:id', async (req, res) => {
  try {
    const mediaList = await MediaList.findByPk(req.params.id);
    if (!mediaList) return res.status(404).json({ message: 'MediaList not found' });
    res.status(200).json(mediaList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新观影/读书清单
router.put('/:id', async (req, res) => {
  try {
    const mediaList = await MediaList.findByPk(req.params.id);
    if (!mediaList) return res.status(404).json({ message: 'MediaList not found' });
    await mediaList.update(req.body);
    res.status(200).json(mediaList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除观影/读书清单
router.delete('/:id', async (req, res) => {
  try {
    const mediaList = await MediaList.findByPk(req.params.id);
    if (!mediaList) return res.status(404).json({ message: 'MediaList not found' });
    await mediaList.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;