import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import uploadIcon from '../images/upload.png';
import pdfIcon from '../images/pdf-icon.png';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function DropZone({SET_FILE}) {
    const styles = makeStyles({
        container: {
            width: '600px',
        },
        dropContainer: {
            margin: '0px',
            height: '350px',
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
        message: {
            color: 'red',
            padding: '2%',
            fontSize: '15px',
        },
        inputInfo: {
            height: '10%',
            width: '100%',
            textAlign: 'left',
            paddingLeft: '5%',
            color: '#aaaaaa',
        },
        btn: {
            textTransform: 'none',
        },
        logo: {
            height: '30px',
            margin: '2%',
            float: 'left',
        },
        fileName: {
            height: '30px',
            width: '60%',
            margin: '3%',
            float: 'left',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        fileSize: {
            height: '30px',
            margin: '3%',
            float: 'left',
        },
        exit: {
            height: '30px',
            margin: '3%',
            float: 'right',
        },
        dialog: {
            display: 'none',
        },
    });

    const style = styles();

    const _fileInputRef = useRef();

    const _maxFileSize = 20971520; // 1024 * 1024 * 20 = 20 MB

    let _file = null;
    const [_message, SetMessage] = useState(null);
    const [_fileName, SetFileName] = useState(null);
    const [_fileSize, SetFileSize] = useState(null);
    const [_divStyle, SetDivStyle] = useState({display: 'none', textAlign: 'left'});

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
         AddFile(file);
    }

    const AddFile = (file) => {
        const isFileValid = ValidateFile(file);
        const isSizeValid = ValidateSize(file);

        if (!isSizeValid && !isFileValid) {
            ShowMessage("Too large file and invalid format. Only PDF file not greather than 20 MB can be uploaded.");
        }
        else if(!isFileValid) {
            ShowMessage("Invalid file format. Only PDF file format can be uploaded.");
        }
        else if (!isSizeValid) {
            ShowMessage("Too large file. Only file not greather than 20 MB can be uploaded.");
        }
        else{
            _file = file;
            SetFileName(file.name);
            SetFileSize(FileSize(file.size));
            SetDivStyle({display: 'block', textAlign: 'left'})
            SET_FILE(_file);
        }
    }

    const ShowMessage = (message) => {
        SetMessage(message);
        setTimeout(() => {
            SetMessage(null);
		}, 4000);
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

    const FileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const Delete = () => {
        SetDivStyle({display: 'none', textAlign: 'left'});
        SetFileName(null);
        SetFileSize(null);
        _file = null;
        SET_FILE(_file);
    }

    const OpenDialog = () => {
        _fileInputRef.current.click();
    }

    const FileSelected = () => {
        if (_fileInputRef.current.files[0]) {
            AddFile(_fileInputRef.current.files[0]);
        }
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
                    
                        <input ref={_fileInputRef} className={style.dialog}
                        type="file" onChange={FileSelected}/>

                        <div className={style.uploadIcon}></div>

                        <Box lineHeight={2} m={1}>
                            Drag & Drop file here
                            <br/>
                            or
                            <br/>
                            <Button variant='outlined' color="primary" 
                            className={style.btn} onClick={OpenDialog}>Browse file</Button>
                        </Box>
                        <span className={style.message}>{_message}</span>
                    </div>
                </div>
                <div className={style.inputInfo}>Accepted file types: .pdf, max file size: 20MB</div>
            </div>
            <div style={_divStyle}>
                <img className={style.logo} src={pdfIcon} alt="Logo"/>
                <span className={style.fileName}>{_fileName}</span>
                <span className={style.fileSize}>{_fileSize}</span>
                <span className={style.exit} onClick={Delete}>x</span>
            </div>
        </div>
    )
}
export default DropZone;