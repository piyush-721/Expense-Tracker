import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
} from "@mui/material";

import styles from "../Expenses/Expenses.module.css";

export default function ExpenseForm({
  open,
  handleClose,
  onSave,
  isEdit = false,
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setPrice("");
      setCategory("");
      setDate("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!title || !price || !category || !date) {
      alert("Please fill in all fields");
      return;
    }

    const expense = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      category,
      date,
    };

    onSave(expense);
    handleClose();
  };

  const commonSx = {
    width: "180px",
    backgroundColor: "var(--input-bg-color)",
    borderRadius: "15px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      "& fieldset": { border: "none" },
      "& input": { color: "var(--input-text-color)" },
    },
    "& .MuiInputBase-input": { color: "var(--input-text-color)" },
    "& .MuiInputLabel-root": { color: "var(--input-text-color)" },
  };

  return (
    <Dialog
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
      <DialogTitle className={styles.dialogTitle}>
        {isEdit ? "Edit Expense" : "Add Expense"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
            {/* Native select with same look */}
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.nativeSelect}
            >
              <option value="" disabled>Select Category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
            </select>

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
            <button type="submit" className={styles.addButton}>
              Add Expense
            </button>
            <button type="button" className={styles.cancelButton} onClick={handleClose}>
              Cancel
            </button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
