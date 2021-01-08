import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import PersonalInformation from '../components/PersonalInformation';
import ChangePassword from '../components/ChangePassword';
import {NavLink} from 'react-router-dom';

function MyProfile()
{
    const styles = makeStyles({
        main:
        {
            width: '80%',
            margin: 'auto',
        },
        h1:
        {
            float: 'center',
        },
        left:
        {
            float: 'left',
            width: '400px',
            margin: 'auto',
            border: '1px solid black',
        },
        right:
        {
            float: 'right',
            width: '50%',
        },
        h2:
        {
            textAlign: 'left',
            marginTop: '10%',
            marginBottom: '15%',
            marginLeft: '10%',
            '&:hover':
            {
                cursor: 'pointer',
            }
        },
        link: {
            color: 'black',
            textDecoration: 'none',
            '&:active':
            {
                color: 'blue',
            }
        },
    })

    const style = styles();

    const myProfile = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.doe@gmail.com',
        academicTitle: '',
        university: '',
        specialization: 'Biology',
        participant: true,
    }

    const [panel, SetPanel] = React.useState(true);
    const [info, SetInfo] = React.useState('blue');
    const [password, SetPassword] = React.useState('black');

    const moveToWork = () => {
    }

    const moveToPersonalInformation = () => {
        SetPanel(true);
        SetInfo('blue');
        SetPassword('black');
    }

    const moveToChangePassword = () => {
        SetPanel(false);
        SetPassword('blue');
        SetInfo('black');
    }

    const moveToLogOut = () => {
    }

    const moveToRules = () => {
    }

    return(
        <div className={style.main}>
            <h1 className={style.h1}> My Profile</h1>
            <div className={style.left}>
                <h2 className={style.h2} onClick={moveToWork}>Add work / My work</h2>
                <h2 className={style.h2} onClick={moveToPersonalInformation} style={{color : info}}>Personal Information</h2>
                <h2 className={style.h2} onClick={moveToChangePassword} style={{color : password}}>Change password</h2>
                <h2 className={style.h2} onClick={moveToLogOut}>Log out</h2>
                <NavLink exact to = '/regulations' className={style.link}>
                    <h2 className={style.h2}>Rules</h2>
                </NavLink>
            </div>
            <div className={style.right}>
                {panel ?
                    <PersonalInformation
                    firstName = {myProfile.firstName}
                    lastName = {myProfile.lastName}
                    email = {myProfile.email}
                    academicTitle = {myProfile.academicTitle}
                    university = {myProfile.university}
                    specialization = {myProfile.specialization}
                    participant = {myProfile.participant}
                    /> :
                    <ChangePassword/>
                }
            </div>
        </div>
    )
}

export default MyProfile