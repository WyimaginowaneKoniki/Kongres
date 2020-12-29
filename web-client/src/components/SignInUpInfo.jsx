import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

function SignInUpInfo(props) {
    const styles = makeStyles({
        main: {
            padding: '2%',
            display: 'flex',
            justifyContent: 'center',
        },
        content: {
            display: 'block',
            justifyContent: 'center',
            textAlign: 'left',
            margin: '0 20%',
            width: '30%',
        },
      });

    const style = styles();

    return (
        <div className={style.main}>
            <p className={style.content}>{props.content}</p>
        </div>
    )
}

export default SignInUpInfo;