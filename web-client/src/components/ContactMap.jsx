import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';


function ContactMap(props) {
    const styles = makeStyles({
        maps:
        {
            padding: '2%',
            paddingRight: '5%',
            float: 'right',
            marginTop: '5%',
            width: 480,
        },
        map:
        {
            float: 'right',
            display: 'block',
            width: "100%",
            height: 480,
        }

    });

    const style = styles();

    return(
        <div className={style.maps}>
            <iframe className={style.map} src={props.path} title="Google Maps address Kaszubska 23"></iframe>
        </div>
    )
}

export default ContactMap; 