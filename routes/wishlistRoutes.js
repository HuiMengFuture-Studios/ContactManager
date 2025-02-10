const express = require('express');
const router = express.Router();
const db = require('../models');
const Wishlist = db.wishlist;

// 创建新愿望清单
router.post('/', async (req, res) => {
  try {
    const wishlist = await Wishlist.create(req.body);
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有愿望清单
router.get('/', async (req, res) => {
  try {
    const wishlists = await Wishlist.findAll();
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个愿望清单
router.get('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新愿望清单
router.put('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    await wishlist.update(req.body);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除愿望清单
router.delete('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    await wishlist.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;