import { Link, useParams } from 'react-router-dom'
import EditIcon from "@material-ui/icons/Edit"
import Sidebar from '../Sidebar'
import { getUserDetails } from '../../actions/updateUser';
import Header from '../../components/Header'
import { v4 as uuidv4 } from 'uuid';
import { DataGrid } from '@material-ui/data-grid';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AttendanceList = () => {

    const dispatch = useDispatch();
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [showAttendance, setShowAttendance] = useState(false);
    const { user } = useSelector((state) => state.getUser);
    const { id } = useParams();

    useEffect(() => {
        const isUserDataIncomplete = !user || user._id !== id;

        if (isUserDataIncomplete) {
            dispatch(getUserDetails(id));
        }
    }, [dispatch, id, user]);

    useEffect(() => {
        if (user && user.attendance && user.attendance.length > 0) {
            const attendanceData = user.attendance.map((item, index) => {
                const id = uuidv4();
                const date = new Date(item.date).toLocaleDateString();
                const status = item.status;

                return { id, date, status };
            });

            setAttendanceDetails(attendanceData);
            setShowAttendance(true);
        }
    }, [user]);

    const userId = id;

    const CustomCountCell = ({ value }) => (
        <div style={{ textAlign: 'center' }}>{String(value)}</div>
    );

    const columns = [
        {
            field: 'count',
            headerName: 'Number',
            minWidth: 10,
            flex: 0.5,
            renderCell: (params) => (
                <CustomCountCell value={user.attendance ? params.rowIndex + 1 : ''} />
            ),
        },
        {
            field: 'date',
            headerName: 'Date',
            minWidth: 10,
            flex: 0.5,
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 10,
            flex: 0.5,
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 100,
            type: "number",
            sortable: false,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/updateattendance/${params.getValue(params.id, "id")}`} className='edit'>
                            <EditIcon />
                        </Link>
                    </Fragment>
                );
            },
        },
    ];

    const rows = attendanceDetails.map((detail, index) => ({
        id: detail.id,
        date: detail.date,
        status: detail.status,
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
                                <h1 className='productListHeading'>{user.name} Attendance List</h1>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={100}
                                    disableSelectionOnClick
                                    className='productsListTable'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


export default AttendanceList


