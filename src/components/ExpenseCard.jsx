import { Card, CardContent, styled, Typography, Box } from '@mui/material';

const Container = styled(Box)`
    display: flex;
    & > div {
        flex: 1;
        padding: 10px;
    }
`;

const ExpenseCard = ({ transactions }) => {

    // Extract amounts from transactions
    const amount = transactions.map(transaction => transaction.amount);
    // Calculate total income by summing positive amounts
    const income = amount.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    // Calculate total expense by summing negative amounts and converting to positive
    const expense = (amount.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography>Income</Typography>
                    <Typography style={{ color: 'green' }}>+₹{income}</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography>Expense</Typography>
                    <Typography style={{ color: 'red' }}>-₹{expense}</Typography>
                </CardContent>
            </Card>
        </Container>
    )
}

export default ExpenseCard;
