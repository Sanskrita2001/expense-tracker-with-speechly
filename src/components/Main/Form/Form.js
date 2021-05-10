import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React from 'react'
import useStyle from './Styles'

const Form = () => {
    const classes = useStyle();
    return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography align='center' variant='subtitle2' gutterBottom>
						...
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth>
						<InputLabel>Type</InputLabel>
						<Select>
							<MenuItem value='Income'>Income</MenuItem>
							<MenuItem value='Expense'>Expense</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth>
						<InputLabel>Category</InputLabel>
						<Select>
							<MenuItem value='Bussiness'>Bussiness</MenuItem>
							<MenuItem value='Salary'>Salary</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<TextField type='number' label='Amount' fullWidth />
				</Grid>
				<Grid item xs={6}>
					<TextField type='date' label='Date' fullWidth />
            </Grid>
            <Button className={classes.button} variant='outlined' color='primary' fullWidth>Create</Button>
			</Grid>
		);
}

export default Form
