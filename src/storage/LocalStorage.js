export const getTransactions = () => {
  const transactions = localStorage.getItem('transactions');
  return transactions ? JSON.parse(transactions) : [];
};

export const setTransactions = (transactions) => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};
