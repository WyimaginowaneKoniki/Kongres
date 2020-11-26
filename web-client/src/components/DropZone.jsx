import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import uploadIcon from '../images/upload.png';
import pdfIcon from '../images/pdf-icon.png';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function DropZone() {
    const styles = makeStyles({
        container: {
            width: '600px',
        },
        dropContainer: {
            margin: '0px',
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
            margin: '3%',
            float: 'left',
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

    const fileInputRef = useRef();

    const _maxFileSize = 10485760; // 1024 * 1024 * 10 = 10 MB

    let _file = null;
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
        // console.log(file);
         AddFile(file);
    }

    const AddFile = (file) => {
        const isFileValid = ValidateFile(file);
        const isSizeValid = ValidateSize(file);
        
        if(isFileValid && isSizeValid) {
            _file = file;
            SetFileName(file.name);
            SetFileSize(FileSize(file.size));
            SetDivStyle({display: 'block', textAlign: 'left'})
            console.log(_file);
        }
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
    }

    const OpenDialog = () => {
        fileInputRef.current.click();
    }

    const FileSelected = () => {
        if (fileInputRef.current.files[0]) {
            AddFile(fileInputRef.current.files[0]);
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
                    
                        <input ref={fileInputRef} className={style.dialog}
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
                    </div>
                </div>
                <div className={style.inputInfo}>Accepted file types: .pdf, max file size: 10MB</div>
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