// import { MdOutlineCancel } from "react-icons/md";
// import { MdOutlineModeEdit } from "react-icons/md";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { HiArrowSmallRight } from "react-icons/hi2";
import { PiPizza } from "react-icons/pi";
import { LuGift } from "react-icons/lu";
import { MdOutlineLuggage } from "react-icons/md";
import cancelButton from "../../assets/cancel-button.png";
import editButton from "../../assets/edit-button.png";

import styles from "./ExpenseList.module.css";
import { useEffect, useState } from "react";
import { useExpenses } from "../../Contexts/ExpenseContext";
import ExpenseForm from "../ExpenseForm/ExpenseForm"; 

import ReactPaginate from "react-paginate";

export default function ExpenseList() {
  const { expenses, setExpenses } = useExpenses();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(expenses.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(expenses.length / itemsPerPage));
  },[itemOffset, expenses]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % expenses.length;
    setItemOffset(newOffset);
  }

  const handleEditClick = (item) => {
    setEditData(null);  
    setEditDialogOpen(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
    setEditData(null);
  };

  const handleSave = (newExpense) => {
    // new expense with unique id
    const expenseWithId = {
      ...newExpense,
      id: Date.now(),
    };
    const updatedExpenses = [...expenses, expenseWithId];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    handleClose();
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div>
      <h1 className={styles.transactionHeading}><em>Recent Transactions</em></h1>
    <div className={styles.list}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          {currentItems.map((item) => (
            <tr className={styles.row} key={item.id}>
              <td>
                <div className={styles.itemDetails}>
                  {item.category === "Food" ? (
                    <PiPizza className={styles.iconStyle}/>
                  ) : item.category === "Entertainment" ? (
                    <LuGift className={styles.iconStyle} />
                  ) : item.category === "Travel" ? (
                    <MdOutlineLuggage className={styles.iconStyle} />
                  ) : null}
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
                  <p className={styles.price}>${item.price}</p>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => handleDelete(item.id)}
                  >
                    <img src={cancelButton} alt="cancel" className={styles.iconImage} />
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => handleEditClick(item)}
                  >
                    <img src={editButton} alt="edit" className={styles.iconImage} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
        />
      </div>

      <ExpenseForm
        open={editDialogOpen}
        handleClose={handleClose}
        onSave={handleSave}
        isEdit={true} 
      />
    </div>
    </div>
  );
}
