import React, { Component } from 'react';
import picture from '../images/blank-profile-picture.png'
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
    main:
    {
        width: '100%',
        marginBottom: '5%',
    },
    btn:
    {
        marginLeft: '5%',
        marginTop: '8%',
        float: 'left',
        textTransform: 'none',
    },
    photo:
    {
       width: 100,
       height: 100,
       margin: 'auto',
       borderRadius: '50px',
    },
    img:
    {
        float: 'right',
    }
});


class Avatar extends Component {
  state={
    profileImg: picture
  }

  imageHandler = (e) => {
    const reader = new FileReader();
    var file = e.target.files[0];
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({profileImg: reader.result})
      }
    }
    if (file &&  file.type.match('image.*'))
        reader.readAsDataURL(file)
  };

  delete = () => {
    this.setState({profileImg: picture})
  };

	render() {
    const { profileImg} = this.state
    const {classes} = this.props;
		return (
			<div className={classes.main}>
                    <Button variant='outlined' color="primary" component="label" className={classes.btn}>
					    Add photo
                        <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} hidden/>
                    </Button>
                    <Button variant='outlined' color="primary" onClick={this.delete} className={classes.btn}>Delete photo</Button>
                    <div className={classes.img}>
						<img src={profileImg} alt="" id="img" className={classes.photo} />
					</div> 
			</div>
        );   
    }
}

export default withStyles(useStyles)(Avatar);