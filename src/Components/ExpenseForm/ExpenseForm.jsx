import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
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

  // reset every time the form opens
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
      id: isEdit ? Date.now() : Date.now(), 
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
      "& select": {
        color: category ? "var(--input-text-color)" : "#999",
      },
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
            <MenuItem disabled value="">
              Select Category
            </MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
          </TextField>
          <TextField
            sx={commonSx}
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="small"
          />
        </Box>
        <Box className={styles.line} style={{ marginTop: "20px" }}>
          <button
            type="submit"
            className={styles.addButton}
            onClick={handleSubmit}
          >
            Add Expense
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
