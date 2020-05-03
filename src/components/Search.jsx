import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
	container: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	textField: {
	  marginLeft: theme.spacing.unit,
	  marginRight: theme.spacing.unit,
	  width: 200,
	},
	dense: {
	  marginTop: 10,
	},
	menu: {
	  width: 300,
	}
})

class Search extends Component {
	constructor() {
		super()
		this.state = {
			tournamentName: ''
		}
	}

	handleNameChange = (e) => {
		this.setState({tournamentName: e.target.value}, () => {
			if(this.state.tournamentName === '') {
				this.props.clearReducer()
			}
			this.props.getData(this.state.tournamentName)
		})
	}

	render() {
		const { classes } = this.props
		return(
			<TextField
				id="standard-dense"
				label="Search tournaments"
				className={classes.textField + classes.dense}
				value={this.state.tournamentName}
				onChange={(e) => this.handleNameChange(e)}
			/>
		)
	}
}

Search.propTypes  = {
	getData: PropTypes.func,
	classes: PropTypes.object
}

export default withStyles(styles)(Search)
