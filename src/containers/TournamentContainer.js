import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import PropTypes from 'prop-types'

import { getData, saveItem, clearReducer } from '../actions'
import Search from '../components/Search'
import Tournaments from '../components/Tournament'
import SavedTournamets from '../components/SavedTournamets'
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
    }
})

class TournamentContainer extends Component {

	render() {
        const { tournaments, actions, classes } = this.props
		return(
			<div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                        <Search 
                            getData={actions.getData}
                            clearReducer={actions.clearReducer}
                        />
                        <Tournaments 
                            getData={actions.getData}
                            saveItem={actions.saveItem}
                            tournaments={tournaments}
                        />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <SavedTournamets/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
		)
	}
}

const mapStateToProps = (store) => {
    return {
        tournaments: store.main.tournaments,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
        {
            ...getData,
            ...saveItem,
            ...clearReducer
        }, dispatch)
    }
}

TournamentContainer.propTypes  = {
    tournaments: PropTypes.array,
    actions: PropTypes.object,
    classes: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TournamentContainer))