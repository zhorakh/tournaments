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

const styles = {
    card: {
	  maxWidth: 1000,
	  marginTop: 15
    },
    media: {
      objectFit: 'cover',
    },
}

class Tournament extends Component {

	getSavedItems = () => {
		return JSON.parse(localStorage.getItem('savedItems'))
	}

	saveItem = (e, item) => {
		this.props.saveItem(item.id)
		const newValue = (JSON.parse(localStorage.getItem('savedItems')) || []).concat(item)
		localStorage.setItem('savedItems', JSON.stringify(newValue))
	}

	fetchedData = () => {
		const { tournaments, classes } = this.props
		if(!tournaments) return
		let savedItems = this.getSavedItems()
		let tournamentData = tournaments && tournaments.filter(item => savedItems && savedItems.indexOf(item.id) == -1)
		const fetchedData = (tournamentData.length > 0 ? tournamentData : tournaments && tournaments).map(item => {
			return (
				<Card className={classes.card} key={item.id}>
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
					<CardActions>]
						<Button variant="contained" color="primary" className={classes.button} onClick={(e) => this.saveItem(e, item)}>
							Save
						</Button>
					</CardActions>
				</Card>
			)
		})
		return fetchedData
	}

	render() {
		return (
			<div>
				{this.fetchedData()}
			</div>
		)
	}
}

Tournament.propTypes  = {
	tournaments: PropTypes.array,
	classes: PropTypes.object
}

export default withStyles(styles)(Tournament)