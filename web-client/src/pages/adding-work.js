import React from 'react';
import '../App.css';
import DropZone from '../components/DropZone'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const { useState } = React;

function AddingWork(props) {
    const styles = makeStyles({
        main: {
            width: '80%',
            margin: 'auto',
        },
        left: {
            // backgroundColor: 'red',
            width: '50%',
            height: '50vh',
            float: 'left',
        },
        right: {
            // backgroundColor: 'green',
            width: '50%',
            height: '50vh',
            float: 'left',
        },
        addButton:
        {
            // float: 'left',
            // marginRight: '5%',
            textTransform: 'none',
        },
    });
  
    const style = styles();

    const [_file, SetFile] = useState(null);
    const passFile = (f) => {
        SetFile(f)
    }
  
    const buttonClick = () => {
        console.log(_file)
    }

      return (
        <div className={style.main}>
            <h1>Adding scientific work</h1>
            <div className={style.left}>
                <Button variant='contained' color="primary" 
                className={style.addButton} onClick={buttonClick}>Add work</Button>
            </div>
            <div className={style.right}>
                <DropZone SET_FILE={passFile} />
            </div>
        </div>  
      );
  }
  export default AddingWork;