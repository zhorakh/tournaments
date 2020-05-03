import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'


function rand() {
    return Math.round(Math.random() * 20) - 10
  }
  
  function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    }
  }

const styles = theme => ({
    card: {
	  maxWidth: 1000,
      marginTop: 10,
    },
    media: {
      objectFit: 'cover',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
})

class SavedTournamets extends Component {

    constructor() {
		super()
		this.state = {
            data: JSON.parse(localStorage.getItem("savedItems")),
            open: false,
            deletingIndex: null
		}
    }

    deleteItem = (index) => {
        const nextState = JSON.parse(localStorage.getItem("savedItems")).filter((_, i) => i !== index)
        localStorage.setItem("savedItems", JSON.stringify(nextState))
        this.setState({ data: nextState })
        this.closeModal()
    }

    modalOpen = (i) => {
        this.setState({ open: true, deletingIndex: i })
    }

    closeModal = () => {
        this.setState({ open: false, deletingIndex: null })
    }


    getSavedItems = () => {
        const { classes } = this.props
        const data = JSON.parse(localStorage.getItem('savedItems'))
		return  data && data.map((item, index) => {
            return (<Card className={classes.card} key={index}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={item.title}
                        className={classes.media}
                        height="200"
                        image={item.image}
                        title={item.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                        {item.title}
                    </Typography>
                    <Typography component="p">
                        {item.description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.modalOpen(index)}>
                        Delete
                    </Button>
                </CardActions>
        </Card>)
        })
    }

	render() {
        const { classes } = this.props
		return(
			<div>
                <p>Saved items</p>
                {this.getSavedItems()}
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.closeModal}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            You want delete this item,are yor Sure
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            <Button variant="outlined" className={classes.button} onClick={()=> this.closeModal()}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="secondary" className={'delete-button ' + classes.button} onClick={() => this.deleteItem(this.state.deletingIndex)}>
                                Delete
                            </Button>
                        </Typography>
                    </div>
                </Modal>
			</div>
		)
	}
}

SavedTournamets.propTypes  = {
	classes: PropTypes.object
}

export default withStyles(styles)(SavedTournamets)