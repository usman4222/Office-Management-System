import React, { useEffect, useState } from 'react'
import '../AllUsers/AllUser.css'
import { Fragment } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { clearErrors } from '../../actions/addUserAction'
import { getAllExpenses } from '../../actions/financeController'
import Sidebar from '../Sidebar'
import Header from '../../components/Header'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom'

const AllExpenses = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, success, expenses } = useSelector((state) => state.allExpenses);
    const [keyword, setKeyword] = useState("");
    const [date, setDate] = useState(null);
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getAllExpenses(keyword));
    }, [error, dispatch, keyword]);


    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim() || date) {
            // If either keyword or date has a value, set both
            setKeyword(`/allexpenses/${keyword}`);
            // setDate(`/allrevenue/${date}`);
            // dispatch(getAllRevenue(keyword, date));
        } else {
            navigate("/allexpenses");
        }
    };

    const columns = [
        {
            field: "index",
            headerName: "Index",
            minWidth: 10,
            flex: 0.5,
        },
        {
            field: "title",
            headerName: "Title",
            minWidth: 10,
            flex: 0.8
        },
        {
            field: "ref",
            headerName: "Ref",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "amount",
            headerName: "Amount",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 10,
            flex: 0.5
        }
    ];

    const rows = expenses.map((item, index) => ({
        id: uuidv4(),
        index: index + 1,
        title: item.title,
        ref: item.ref,
        date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item.date)),
        amount: item.amount,
        description: item.description
    }));

    return (
        <Fragment>
            <div className='main'>
                <div className='row w-full main1-r1'>
                    <div className='col-lg-2 main1-r1-b1'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10 main1-r1-b2'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <Header />
                            </div>
                        </div>
                        <div className='dashboard'>
                            <div className='productsListContainer'>
                                <h1 className='productListHeading'>All Expenses</h1>
                                <div>
                                    <form className='searchBox' onSubmit={searchSubmitHandler}>
                                        <input
                                            type='text'
                                            // type='date'
                                            placeholder='Search a Expense...'
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                        <input type='submit' value='Search' />
                                    </form>
                                </div>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={100}
                                    disableSelectionOnClick
                                    className='productsListTable'
                                    autoHeight
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AllExpenses;
