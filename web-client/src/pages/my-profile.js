import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import PersonalInformation from '../components/PersonalInformation';
import ChangePassword from '../components/ChangePassword';

function MyProfile(props)
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
            width: '40%',
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
    })

    const style = styles();

    const myProfil = {
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
                <h2 className={style.h2} onClick={moveToRules}>Rules</h2>
            </div>
            <div className={style.right}>
                {panel ?
                    <PersonalInformation
                    firstName = {myProfil.firstName}
                    lastName = {myProfil.lastName}
                    email = {myProfil.email}
                    academicTitle = {myProfil.academicTitle}
                    university = {myProfil.university}
                    specialization = {myProfil.specialization}
                    participant = {myProfil.participant}
                    /> :
                    <ChangePassword/>
                }
            </div>
        </div>
    )
}

export default MyProfile