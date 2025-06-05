import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Box,
//   MenuItem,
// } from "@mui/material";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

import styles from "./Expenses.module.css";
import { useWallet } from "../../Contexts/WalletContext";
import { useExpenses } from "../../Contexts/ExpenseContext";

export default function Expenses() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const { expenses, setExpenses } = useExpenses();

  const { walletBalance, setWalletBalance } = useWallet();

  // no need to do this now because we are using useContext and it is doing everything
  //   useEffect(() => {
  //     const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  //     setExpenses(storedExpenses);
  //   }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
  };

  const handleAddExpense = (newExpense) => {
    const amount = parseFloat(newExpense.price);
    if (amount > walletBalance) {
      alert("Expenses are exceeding your wallet balance!");
      return;
    }

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    // localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    setWalletBalance(walletBalance - amount);
    handleClose();
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.price, 0);

//   const commonSx = {
//     width: "180px",
//     backgroundColor: "var(--input-bg-color)",
//     borderRadius: "15px",
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "15px",
//       "& fieldset": {
//         border: "none",
//       },
//       "& input": {
//         color: "var(--input-text-color)",
//       },
//       "& select": {
//         color: category ? "var(--input-text-color)" : "#999",
//       },
//     },
//     "& .MuiInputBase-input": {
//       color: "var(--input-text-color)",
//     },
//     "& .MuiInputLabel-root": {
//       color: "var(--input-text-color)",
//     },
//   };

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
        initialData={{
          title,
          price,
          category,
          date,
        }}
        isEdit={false}
      />
    </div>
  );
}



{/* <Dialog
  open={open}
  onClose={handleClose}
  slotProps={{
    paper: {
      sx: {
        backgroundColor: "var(--modal-bg-color)",
        padding: "20px",
        borderRadius: "15px",
      },
    },
  }}
>
  <DialogTitle className={styles.dialogTitle}>Add Expenses</DialogTitle>
  <DialogContent>
    <Box className={styles.line}>
      <TextField
        sx={commonSx}
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        size="small"
      />
      <TextField
        sx={commonSx}
        name="price"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        variant="outlined"
        size="small"
      />
    </Box>

    <Box className={styles.line} style={{ marginTop: "10px" }}>
      <TextField
        sx={commonSx}
        name="category"
        select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        displayEmpty
        variant="outlined"
        size="small"
        SelectProps={{
          displayEmpty: true,
          renderValue: (selected) =>
            selected ? selected : <span style={{ color: "#999" }}>Select Category</span>,
        }}
      >
        <MenuItem disabled value="" >
          Select Category
        </MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Entertainment">Entertainment</MenuItem>
        <MenuItem value="Travel">Travel</MenuItem>
      </TextField>

      <TextField
        sx={commonSx}
        name="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        size="small"
      />
    </Box>

    <Box className={styles.line} style={{ marginTop: "20px" }}>
      <button type="submit" className={styles.addButton} onClick={handleAddExpense}>
        Add Expense
      </button>
      <button type="button" className={styles.cancelButton} onClick={handleClose}>
        Cancel
      </button>
    </Box>
  </DialogContent>
</Dialog> */}
