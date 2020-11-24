import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import uploadIcon from '../images/upload.png';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function DropZone() {
    const styles = makeStyles({
        container: {
            // display: 'block',
            // justifyContent: 'center',
        },
        dropContainer: {
            margin: '0px',
            width: '600px',
            height: '300px',
            border: '3px dashed #aaaaaa',
        },
        top: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90%',
        },
        dropMessage: {
            textAlign: 'center',
            color: '#aaaaaa',
            fontFamily: 'Arial',
            fontSize: '20px',
        },
        uploadIcon: {
            width: '50px',
            height: '50px',
            background:  `url(${uploadIcon}) no-repeat center center`, 
            backgroundSize: '100%',
            textAlign: 'center',
            margin: '0 auto',
            paddingTop: '30px',
        },
        inputInfo: {
            height: '10%',
            width: '100%',
            textAlign: 'left',
            paddingLeft: '5%',
            color: '#aaaaaa',
        },
    });

    const style = styles();

    const _maxFileSize = 10485760; // 1024 * 1024 * 10 = 10 MB

    const DragOver = (e) => {
        e.preventDefault();
    }
    
    const DragEnter = (e) => {
        e.preventDefault();
    }
    
    const DragLeave = (e) => {
        e.preventDefault();
    }
    
    const FileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        console.log(file);

        console.log(`The fileType is PDF:  ${ValidateFile(file)}`);
        console.log(`The fileSize <= 10MB: ${ValidateSize(file)}`);
    }

    const ValidateFile = (file) => {
        const validTypes = ['application/pdf'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    const ValidateSize = (file) => {
        const size = file.size;
        return (_maxFileSize >= size);
    }

    return (
        <div className={style.container}>
            <div className={style.dropContainer}
                onDragOver={DragOver}
                onDragEnter={DragEnter}
                onDragLeave={DragLeave}
                onDrop={FileDrop}>
                <div className={style.top}>
                    <div className={style.dropMessage}>
                        <div className={style.uploadIcon}></div>
                            <Box lineHeight={2} m={1}>
                            Drag & Drop file here
                            <br/>
                            or
                            <br/>
                            <Button variant='outlined' color="primary">Browse file</Button>
                        </Box>
                    </div>
                </div>
                <div className={style.inputInfo}>Accepted file types: .pdf, max file size: 10MB</div>
            </div>
        </div>
    )
}
export default DropZone;