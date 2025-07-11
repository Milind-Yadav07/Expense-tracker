import { useState } from 'react';
import { Typography, Box, TextField, Button, styled, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    & > h5, & > div, & > button {
        margin-top: 30px
    }
`;

const StyledButton = styled(Button)`
    background:rgb(0, 132, 255);
    color: #fff;
`;

const NewTransaction = ({ addTransaction }) => {
    // State for transaction type (income or expense)
    const [text, setText] = useState('');
    // State for transaction category
    const [category, setCategory] = useState('');
    // State for transaction amount
    const [amount, setAmount] = useState();
    // State for transaction date
    const [date, setDate] = useState('');

    // Categories for income and expense transactions
    const incomeCategories = ['salary', 'bonus', 'extra income', 'rental income', 'other'];
    const expenseCategories = ['Food', 'Clothing', 'travelling', 'party', 'billing', 'other'];

    // Function to create a new transaction object and pass it to addTransaction
    const newTransaction = e => {
        const transaction = {
            id: Math.floor(Math.random() * 100000000),
            text: text,
            category: category,
            amount: text === 'expense' ? -Math.abs(amount) : Math.abs(amount),
            date: date
        }
        addTransaction(transaction);
    }

    return (
        <Container>
            <Typography variant="h5">New Transaction</Typography>
            <FormControl fullWidth>
                <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
                <Select
                    labelId="transaction-type-label"
                    value={text}
                    label="Transaction Type"
                    onChange={(e) => {
                        setText(e.target.value);
                        setCategory(''); // reset category when transaction type changes
                    }}
                >
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 20 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={!text}
                >
                    {(text === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                type="date"
                value={date}
                label="Date"
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                style={{ marginTop: 20 }}
                fullWidth
            />
            <TextField value={amount} label="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
            <StyledButton variant="contained" onClick={newTransaction}>Add Transaction</StyledButton>
        </Container>
    )
}

export default NewTransaction;
