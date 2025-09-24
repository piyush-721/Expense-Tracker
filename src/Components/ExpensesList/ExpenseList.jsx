import { HiArrowSmallLeft } from "react-icons/hi2";
import { HiArrowSmallRight } from "react-icons/hi2";
import { PiPizza } from "react-icons/pi";
import { LuGift } from "react-icons/lu";
import { MdOutlineLuggage } from "react-icons/md";
import cancelButton from "../../assets/cancel-button.png";
import editButton from "../../assets/edit-button.png";

import styles from "./ExpenseList.module.css";
import { useEffect, useState, useMemo } from "react";
import { useExpenses } from "../../Contexts/ExpenseContext";
import { useToast } from "../../Contexts/ToastContext";
import ExpenseForm from "../ExpenseForm/ExpenseForm"; 
import EmptyState from "../EmptyState/EmptyState";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

import ReactPaginate from "react-paginate";

export default function ExpenseList() {
  const { expenses, setExpenses } = useExpenses();
  const { showToast } = useToast();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  // Memoize sorted expenses for better performance
  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(sortedExpenses.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortedExpenses.length / itemsPerPage));
  }, [itemOffset, sortedExpenses]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % sortedExpenses.length;
    setItemOffset(newOffset);
  };

  const handleEditClick = (item) => {
    setEditData(item); // ✅ Fixed: Pass the actual item data
    setEditDialogOpen(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
    setEditData(null);
  };

  const handleSave = (updatedExpense) => {
    try {
      let updatedExpenses;
      
      if (editData) {
        // Editing existing expense
        updatedExpenses = expenses.map(exp => 
          exp.id === editData.id ? { ...updatedExpense, id: editData.id } : exp
        );
        showToast("Expense updated successfully!", "success");
      } else {
        // Adding new expense (shouldn't happen here, but just in case)
        const expenseWithId = {
          ...updatedExpense,
          id: Date.now(),
        };
        updatedExpenses = [...expenses, expenseWithId];
        showToast("Expense added successfully!", "success");
      }
      
      setExpenses(updatedExpenses);
      handleClose();
    } catch (error) {
      showToast("Failed to save expense. Please try again.", "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    try {
      const updatedExpenses = expenses.filter((exp) => exp.id !== deleteId);
      setExpenses(updatedExpenses);
      showToast("Expense deleted successfully!", "success");
      
      // Reset pagination if current page becomes empty
      const newPageCount = Math.ceil(updatedExpenses.length / itemsPerPage);
      if (itemOffset >= updatedExpenses.length && itemOffset > 0) {
        setItemOffset(Math.max(0, (newPageCount - 1) * itemsPerPage));
      }
    } catch (error) {
      showToast("Failed to delete expense. Please try again.", "error");
    }
    
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

const getCategoryIcon = (category) => {
  const iconProps = { className: styles.iconStyle };
  switch (category) {
    case "Food":
      return <PiPizza {...iconProps} />;
    case "Entertainment":
      return <LuGift {...iconProps} />;
    case "Travel":
      return <MdOutlineLuggage {...iconProps} />;
    default:
      return <PiPizza {...iconProps} />; // Default to pizza for unknown categories
  }
};


  if (expenses.length === 0) {
    return <EmptyState message="No expenses found. Add your first expense!" />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.transactionHeading}><em>Recent Transactions</em></h2>
      <div className={styles.list}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            {currentItems.map((item) => (
              <tr className={styles.row} key={item.id}>
                <td>
                  <div className={styles.itemDetails}>
                    {getCategoryIcon(item.category)}
                    <div className={styles.textGroup}>
                      <span className={styles.title}>{item.title}</span>
                      <span className={styles.date}>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </span>
                    </div>
                  </div>
                </td>
                <td className={styles.actionCell}>
                  <div className={styles.actions}>
                    <p className={styles.price}>${parseFloat(item.price).toFixed(2)}</p>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => handleDeleteClick(item.id)}
                      aria-label="Delete expense"
                    >
                      <img src={cancelButton} alt="Delete" className={styles.iconImage} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => handleEditClick(item)}
                      aria-label="Edit expense"
                    >
                      <img src={editButton} alt="Edit" className={styles.iconImage} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {pageCount > 1 && (
          <div className={styles.paginationWrapper}>
            <ReactPaginate
              nextLabel={<HiArrowSmallRight />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              previousLabel={<HiArrowSmallLeft />}
              containerClassName={styles.pagination}
              pageClassName={styles.pageItem}
              pageLinkClassName={styles.pageLink}
              previousClassName={`${styles.pageItem} previous`}
              previousLinkClassName={styles.pageLink}
              nextClassName={`${styles.pageItem} next`}
              nextLinkClassName={styles.pageLink}
              activeClassName={styles.active}
              forcePage={Math.floor(itemOffset / itemsPerPage)}
            />
          </div>
        )}
      </div>

      <ExpenseForm
        open={editDialogOpen}
        handleClose={handleClose}
        onSave={handleSave}
        initialData={editData}
        isEdit={!!editData}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
      />
    </div>
  );
}
