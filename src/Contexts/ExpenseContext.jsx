import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({children}) => {
    const [expenses, setExpenses] = useState([]);

    // load expenses from localStorage
    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
        setExpenses(storedExpenses);
    }, []);

    // update ls when expenses change
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    return(
        <ExpenseContext.Provider value={{expenses, setExpenses}}>
            {children}
        </ExpenseContext.Provider>
    );
}

export const useExpenses = () => useContext(ExpenseContext);
