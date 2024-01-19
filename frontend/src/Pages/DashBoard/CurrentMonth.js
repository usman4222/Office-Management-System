import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentMonthExpenses } from '../../actions/financeController';

const CurrentMonth = () => {
    const dispatch = useDispatch();
    const { totalCurrentMonthExpenses } = useSelector((state) => state.currentMonthTotal);

    useEffect(() => {
        dispatch(getCurrentMonthExpenses());
    }, [dispatch]);

    console.log("expense", totalCurrentMonthExpenses);

    return (
        <div>
            <h2>This is current month expenses</h2>
            {totalCurrentMonthExpenses}
        </div>
    );
};

export default CurrentMonth;
