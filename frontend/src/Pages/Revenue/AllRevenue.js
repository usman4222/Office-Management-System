import React, { useEffect, useState } from 'react'
import '../AllUsers/AllUser.css'
import './All.css'
import { Fragment } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { clearErrors } from '../../actions/addUserAction'
import Sidebar from '../Sidebar'
import Header from '../../components/Header'
import { v4 as uuidv4 } from 'uuid';
import { getAllRevenue } from '../../actions/revenue'
import { Link, useNavigate, useParams } from 'react-router-dom';

const AllRevenue = ({ match }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, success, revenues, totalAmount } = useSelector((state) => state.allRevenues);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const handleSearch = () => {
        if (startDate && endDate) {
            dispatch(getAllRevenue({ startDate, endDate }));
        } else {
            enqueueSnackbar('Please Enter Both Start and End Dates for the Search.', { variant: 'warning' });
        }
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (startDate && endDate) {
            dispatch(getAllRevenue({ startDate, endDate }));
        }
    }, [error, dispatch, startDate, endDate]);



    const columns = [
        {
            field: "index",
            headerName: "Index",
            minWidth: 10,
            flex: 0.5,
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


    const rows = revenues && revenues.map((item, index) => ({
        id: uuidv4(),
        index: index + 1,
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
                                <h1 className='productListHeading'>Search Revenues by Date</h1>
                                <div className='search-area'>
                                    <div className='search-box'>
                                        <input
                                            type="date"
                                            placeholder="Start Date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                        <input
                                            type="date"
                                            placeholder="End Date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                        <div className='search-btn'>
                                            <input type='submit' value='Search' onClick={handleSearch} />
                                        </div>
                                    </div>
                                </div>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={100}
                                    disableSelectionOnClick
                                    className='productsListTable'
                                    autoHeight
                                />
                                <div className='total'>
                                    <div className='total-box'>
                                        <div className='amount-heading'>
                                            <p>Total Amount = </p>
                                        </div>
                                        <div className='amount'>
                                            <p>{totalAmount}</p>
                                        </div>
                                    </div>
                                    <div className='list'>
                                        <Link to="/revenuelist">Revenue List</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AllRevenue;

{/* <div className='total'>
<div className='total-box'>
    <div className='amount-heading'>
        <p>Total Amount = </p>
    </div>
    <div className='amount'>
        <p>{totalAmount}</p>
    </div>
</div>
</div> */}