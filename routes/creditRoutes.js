const express = require('express');
const router = express.Router();
const db = require('../models');
const Contact = db.contact;
const Favor = db.favor;

// 计算并更新个人信用评分
router.post('/calculate', async (req, res) => {
  try {
    const contactId = req.body.contactId;
    const contact = await Contact.findByPk(contactId);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    const favors = await Favor.findAll({ where: { contactId } });
    let creditScore = 100;

    favors.forEach(favor => {
      if (!favor.isReturned) {
        creditScore -= 10; // 根据实际情况调整扣分规则
      }
    });

    await contact.update({ creditScore });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取个人信用评分
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ creditScore: contact.creditScore });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 批量计算所有人信用分
router.post('/calculateAll', async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    const updatedContacts = [];

    for (const contact of contacts) {
      const favors = await Favor.findAll({ where: { contactId: contact.id } });
      let creditScore = 100;

      favors.forEach(favor => {
        if (!favor.isReturned) {
          creditScore -= 10; // 根据实际情况调整扣分规则
        }
      });

      await contact.update({ creditScore });
      updatedContacts.push(contact);
    }

    res.status(200).json(updatedContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
