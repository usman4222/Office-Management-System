import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './Sidebar.css'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getCurrentMonthExpenses } from '../actions/financeController'
import { enqueueSnackbar, useSnackbar } from 'notistack'

const Home = () => {

  const { error, success, currentMonthTotal } = useSelector((state) => state.currentMonthTotal)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      if (error) {
        enqueueSnackbar(error, { variant: 'error' });
        dispatch(clearErrors());
      }
      dispatch(getCurrentMonthExpenses())
    }, [dispatch, enqueueSnackbar, error])

  console.log("this is curent month expenes", currentMonthTotal)


  return (
    <div>
      <div className='home'>
        <Sidebar />
      </div>
      <div className='box'>
        <div className='inner-box'>
          December Expenses{currentMonthTotal}
        </div>
      </div>
    </div>
  )
}

export default Home
