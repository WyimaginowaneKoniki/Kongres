import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

function AddingWork(props) {
    const styles = makeStyles({
        main: {
            width: '80%',
            margin: 'auto',
        },
        left: {
            width: '50%',
            height: '50vh',
            float: 'left',
        },
        right: {
            width: '50%',
            height: '50vh',
            float: 'left',
        },
    });
  
    const style = styles();
  
      return (
        <div className={style.main}>
            <h1>Adding scientific work</h1>
            <div className={style.left}></div>
            <div className={style.right}></div>
        </div>  
      );
  }
  export default AddingWork;