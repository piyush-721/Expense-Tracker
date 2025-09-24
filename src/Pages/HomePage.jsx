import React from "react";
import WalletBalance from "../Components/WalletBalance/WalletBalance";
import Expenses from "../Components/Expenses/Expenses";
import styles from "./HomePage.module.css"
import ExpenseList from "../Components/ExpensesList/ExpenseList";
import CircularPiChart from "../Components/PieChart/CircularPiChart";
import CategoryBarChart from "../Components/BarChart/CategoryBarChart";

export default function HomePage() {
    return(
        <div className={styles.container}>
            <div className={styles.hero}>
                <WalletBalance />
                <Expenses />
                <CircularPiChart />
            </div>
            <div className={styles.barChart}>
                <ExpenseList />
                <CategoryBarChart />
            </div>
        </div>
    );
}
