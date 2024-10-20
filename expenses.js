const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');


router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new expense
router.post('/', async (req, res) => {
  const { name, amount, category } = req.body;
  const expense = new Expense({ name, amount, category });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an existing expense by ID
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // Update fields
    expense.name = req.body.name || expense.name;
    expense.amount = req.body.amount || expense.amount;
    expense.category = req.body.category || expense.category;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    await expense.remove();
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;