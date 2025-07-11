import { Typography, List, Divider, styled, Box, TextField } from '@mui/material';
import { useState } from 'react';
import Transaction from './Transaction';

const Component = styled(Box)`
    & > h5 {
        margin-bottom: 10px;
    }
    & > .date-inputs {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }
`;

const Transactions = ({ transactions, deleteTransaction }) => {
    // State for "from" date filter
    const [fromDate, setFromDate] = useState('');
    // State for "to" date filter
    const [toDate, setToDate] = useState('');

    // Handlers to update date filters
    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    // Filter transactions based on date range (inclusive)
    const filteredTransactions = transactions.filter(transaction => {
        if (!transaction.date) return true; // if no date, include by default
        const transactionDate = new Date(transaction.date);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        if (from && to) {
            return transactionDate >= from && transactionDate <= to;
        } else if (from) {
            return transactionDate >= from;
        } else if (to) {
            return transactionDate <= to;
        } else {
            return true;
        }
    });

    return (
        <Component>
            <Typography variant="h5">Transaction History</Typography>
            <div className="date-inputs">
                <TextField
                    label="From"
                    type="date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
                <TextField
                    label="To"
                    type="date"
                    value={toDate}
                    onChange={handleToDateChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </div>
            <Divider style={{ width: '100%' }} />
            <List>
                {
                    filteredTransactions.map(transaction => {
                        return <Transaction transaction={transaction} deleteTransaction={deleteTransaction} key={transaction.id} />
                    })
                }
            </List>
        </Component>
    )
}

export default Transactions;
