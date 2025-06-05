import React, { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(5000);

  useEffect(() => {
    const stored = parseFloat(localStorage.getItem("walletBalance")); // agar balance hai storage mai toh ye state mai add kar dega
    if (!isNaN(stored)) {
      setWalletBalance(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance.toString());
  }, [walletBalance]);

  return (
    <WalletContext.Provider value={{ walletBalance, setWalletBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
