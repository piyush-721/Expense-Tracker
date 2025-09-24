import React, { useState } from "react";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

import styles from "./Expenses.module.css";
import { useWallet } from "../../Contexts/WalletContext";
import { useExpenses } from "../../Contexts/ExpenseContext";
import { useToast } from "../../Contexts/ToastContext";

export default function Expenses() {
  const [open, setOpen] = useState(false);
  const { expenses, setExpenses } = useExpenses();
  const { walletBalance, setWalletBalance } = useWallet();
  const { showToast } = useToast();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddExpense = (newExpense) => {
    const amount = parseFloat(newExpense.price);
    
    if (amount > walletBalance) {
      showToast("Expenses are exceeding your wallet balance!", "error");
      return;
    }

    try {
      const expenseWithId = {
        ...newExpense,
        id: Date.now(),
      };
      
      const updatedExpenses = [...expenses, expenseWithId];
      setExpenses(updatedExpenses);
      setWalletBalance(walletBalance - amount);
      
      showToast("Expense added successfully!", "success");
      handleClose();
    } catch (error) {
      showToast("Failed to add expense. Please try again.", "error");
    }
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.price || 0), 0);

  return (
    <div className={styles.card}>
      <div className={styles.expense}>
        Expenses: <span className={styles.amount}>${totalExpense.toFixed(2)}</span>
      </div>
      <button type="button" className={styles.button} onClick={handleOpen}>
        + Add Expense
      </button>

      <ExpenseForm
        open={open}
        handleClose={handleClose}
        onSave={handleAddExpense}
        initialData={null}
        isEdit={false}
      />
    </div>
  );
}
