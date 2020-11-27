import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Logo from '../images/empty-image.png'

function Navigation() {
    const styles = makeStyles({
        main: {
            width: '90%',
            height: '50px',
            display: 'block',
            margin: 'auto',
            padding: '2%',
        },
        logo: {
            height: '50px',
            width: '50px',
            float: 'left',
        },
        box: {
            width: '60%',
            float: 'right',
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end",
            height: '100%',
            '& a': {
                textDecoration: 'none',
                color: 'black',
            },
            '& a:hover': {
                color: 'gray',
            },
          },
    });

    const style = styles();

    return (
        <div className={style.main}>
            <div>
                <img className={style.logo} src={Logo} alt="Logo"/>
            </div>
            <Box className={style.box}>
                <Box>
                    <Link to = '/'>
                        Home
                    </Link>
                </Box>
                <Box>
                    <Link to = '/agenda'>
                        Agenda
                    </Link>
                </Box>
                <Box>
                    <Link to = '/speakers'>
                        Keynote Speakers
                    </Link>
                </Box>
                <Box>
                    <Link to = '/about'>
                        About
                    </Link>
                </Box>
                <Box>
                    <Link to = '/contact'>
                        Contact
                    </Link>
                </Box>
            </Box>
        </div>
    );
}

export default Navigation;