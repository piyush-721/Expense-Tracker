import React, { useState, useEffect } from "react";
import styles from "./WalletBalance.module.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
} from "@mui/material";

export default function WalletBalance() {
  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  // Load balance from localStorage when component mounts
  useEffect(() => {
    const storedBalance = parseFloat(localStorage.getItem("walletBalance"));
    if (!isNaN(storedBalance)) {
      setWalletBalance(storedBalance);
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIncome("");
  };

  const handleAddBalance = () => {
    const amount = parseFloat(income);
    if (!isNaN(amount) && amount > 0) {
      const newBalance = walletBalance + amount;
      setWalletBalance(newBalance);
      localStorage.setItem("walletBalance", newBalance.toString());
    }
    handleClose();
  };

  return (
    <div className={styles.card}>
      <div className={styles.balance}>
        Wallet Balance:{" "}
        <span className={styles.amount}>${walletBalance.toFixed(2)}</span>
      </div>
      <button type="button" className={styles.button} onClick={handleOpen}>
        + Add Income
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "var(--modal-bg-color)",
              borderRadius: "15px",
              padding: 2,
            },
          },
        }}
      >
        <DialogTitle className={styles.dialogTitle}>Add Balance</DialogTitle>
        <DialogContent>
          <Box className={styles.dialogContent}>
            <TextField
              placeholder="Income Amount"
              variant="outlined"
              size="small"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className={styles.input}
              InputLabelProps={{ shrink: false }}
              InputProps={{
                classes: {
                  notchedOutline: styles.noOutline,
                },
              }}
            />
            <button
              className={styles.addButton}
              onClick={handleAddBalance}
              type="submit"
            >
              Add Balance
            </button>
            <button
              className={styles.cancelButton}
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
