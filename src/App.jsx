import { useState, useEffect } from 'react';
import { getTransactions, setTransactions } from './storage/LocalStorage';
import { Typography, Box, styled } from '@mui/material';
import './App.css';
import Balance from './components/Balance';
import ExpenseCard from './components/ExpenseCard';
import Transactions from './components/Transactions';
import NewTransaction from './components/NewTransaction';

const Header = styled(Typography)`
  margin: 10px 0;
  color: blue;
  font-size: 36px;
  text-transform: uppercase;
`;

const Component = styled(Box)`
  background: #FFF;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  width: 1000px;
  & > div {
    padding: 10px;
    width: 50%;
    height: 85vh;
  }
}
`;

function App() {

  // State to hold the list of transactions, initialized from local storage
  const [transactions, setTransactionsState] = useState(getTransactions());

  // Effect to update local storage whenever transactions state changes
  useEffect(() => {
    setTransactions(transactions);
  }, [transactions]);

  // Function to delete a transaction by id
  const deleteTransaction = (id) => {
    console.log(id);
    setTransactionsState(transactions.filter(transaction => transaction.id !== id));
    console.log(transactions);
  }

  // Function to add a new transaction to the state
  const addTransaction = (transaction) => {
    setTransactionsState(transactions => [transaction, ...transactions]);
    console.log(transaction);
    console.log(transactions);
  }


  return (
    <div className="App">
      <Header>Expense Tracker</Header>
      <Component>
        <Box>
          <Balance transactions={transactions} />
          <ExpenseCard transactions={transactions} />
          <NewTransaction addTransaction={addTransaction} />
        </Box>
        <Box>
          <Transactions transactions={transactions} deleteTransaction={deleteTransaction} />
        </Box>
      </Component>
    </div>
  );
}

export default App;
