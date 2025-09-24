import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure?" 
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "var(--modal-bg-color)",
            borderRadius: "15px",
            padding: "10px",
            margin: { xs: "16px", sm: "32px" },
          },
        },
      }}
    >
      <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
      <DialogContent>
        <p className={styles.dialogMessage}>{message}</p>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <button 
          className={styles.cancelButton} 
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          className={styles.confirmButton} 
          onClick={onConfirm}
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
}
