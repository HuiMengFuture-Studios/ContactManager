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
      const now = new Date();
      if (favor.status === 'pending' && now < favor.dueDate) {
        creditScore -= 5; // 进行中的借款
      } else if (favor.status === 'pending' && now >= favor.dueDate) {
        creditScore -= 20; // 逾期未还
      } else if (favor.status === 'completed' && favor.repaymentAttitude === 'good') {
        creditScore -= 8; // 逾期已还，还款态度良好
      } else if (favor.status === 'completed' && favor.repaymentAttitude === 'bad') {
        creditScore -= 16; // 逾期已还，还款态度不佳
      }
    });

    await contact.update({ creditScore });
    res.status(200).json(contact);
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
        const now = new Date();
        if (favor.status === 'pending' && now < favor.dueDate) {
          creditScore -= 5; // 进行中的借款
        } else if (favor.status === 'pending' && now >= favor.dueDate) {
          creditScore -= 20; // 逾期未还
        } else if (favor.status === 'completed' && favor.repaymentAttitude === 'good') {
          creditScore -= 8; // 逾期已还，还款态度良好
        } else if (favor.status === 'completed' && favor.repaymentAttitude === 'bad') {
          creditScore -= 16; // 逾期已还，还款态度不佳
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
