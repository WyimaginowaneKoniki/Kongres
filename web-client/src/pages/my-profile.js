import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import SignUpForm from '../components/SignUpForm';
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
            width: '40%',
        },
        h2:
        {
            textAlign: 'left',
            marginTop: '10%',
            marginBottom: '15%',
            marginLeft: '10%',
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
    }

    return(
        <div className={style.main}>
            <h1 className={style.h1}> My Profile</h1>
            <div className={style.left}>
                <h2 className={style.h2}>Add work / My work</h2>
                <h2 className={style.h2}>Personal Information</h2>
                <h2 className={style.h2}>Change password</h2>
                <h2 className={style.h2}>Log out</h2>
                <h2 className={style.h2}>Rules</h2>
            </div>
            <div className={style.right}>
                {/* <SignUpForm
                  firstName = {myProfil.firstName}
                  lastName = {myProfil.lastName}
                  email = {myProfil.email}
                  academicTitle = {myProfil.academicTitle}
                  university = {myProfil.university}
                  specialization = {myProfil.specialization}
                /> */}
                <ChangePassword></ChangePassword>
            </div>
        </div>
    )
}

export default MyProfile