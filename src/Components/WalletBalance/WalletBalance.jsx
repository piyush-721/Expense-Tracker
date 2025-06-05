import React, { useState } from "react";
import styles from "./WalletBalance.module.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
} from "@mui/material";
// import { useWallet } from "../../WalletContext";
import { useWallet } from "../../Contexts/WalletContext";

export default function WalletBalance() {
    const [income, setIncome] = useState("");
    const [open, setOpen] = useState(false);
    const { walletBalance, setWalletBalance } = useWallet();

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
            <button type="submit" className={styles.addButton} onClick={handleAddBalance}>
              Add Balance
            </button>
            <button type="button" className={styles.cancelButton} onClick={handleClose}>
              Cancel
            </button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
