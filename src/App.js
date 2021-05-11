import { Grid } from '@material-ui/core';
import React from 'react';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import useStyles from './styles';
import { Provider } from './context/context';

function App() {
	const classes = useStyles();
	return (
		<Provider>
			<Grid
				className={classes.grid}
				container
				spacing={0}
				alignItems='center'
				justify='center'
				style={{ height: '100vh' }}
			>
				<Grid items xs={12} sm={3}>
					<Details title='Income' />
				</Grid>
				<Grid items xs={12} sm={4}>
					<Main />
				</Grid>
				<Grid items xs={12} sm={4}>
					<Details title='Expense' />
				</Grid>
			</Grid>
		</Provider>
	);
}

export default App;
