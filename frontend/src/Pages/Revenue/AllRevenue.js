import React, { useEffect } from 'react'
import '../AllUsers/AllUser.css'
import { Fragment } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { clearErrors } from '../../actions/addUserAction'
import Sidebar from '../Sidebar'
import Header from '../../components/Header'
import { v4 as uuidv4 } from 'uuid';
import { getAllRevenue } from '../../actions/revenue'

const AllRevenue = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, success, revenues } = useSelector((state) => state.allRevenues);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getAllRevenue());
    }, [error, dispatch]);

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

    const rows = revenues.map((item, index) => ({
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
                                <h1 className='productListHeading'>All Revenues</h1>
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

export default AllRevenue;
