import React, { Fragment, useState } from 'react'
import { addNewExpense, clearErrors } from '../../actions/financeController'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

const Finance = () => {


    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [expense, setExpense] = useState("")
    const [date, setDate] = useState("")
    const { enqueueSnackbar } = useSnackbar();

    const { error, success } = useSelector((state) => state.finance)


    const addExpenseHandler = async (e) => {
        e.preventDefault();

        try {
            if (!name || !expense || !date) {
                throw new Error('Missing required fields');
            }

            const expenseData = {
                text: name,
                name: name,
                date: date
            };

            await dispatch(addNewExpense(expenseData));
            enqueueSnackbar('Expense added Successfully', { variant: 'success' });
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <Fragment>
            <div className='main-form'>
                <div className='addUser'>
                    <div className='addUser'>
                        <form
                            className='createProductForm'
                            encType='multipart/form-data'
                            onSubmit={addExpenseHandler}
                        >
                            <h2 >Add Expenses</h2>
                            <input
                                type='text'
                                placeholder='Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Expense'
                                required
                                value={expense}
                                onChange={(e) => setExpense(e.target.value)}
                            />
                            <input
                                type='date'
                                placeholder='Date'
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <div className='submitBtn'>
                                <button type='submit'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Finance
