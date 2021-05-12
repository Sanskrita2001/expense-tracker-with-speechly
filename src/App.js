import { Grid } from '@material-ui/core';
import React from 'react';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import useStyles from './styles';
import { Provider } from './context/context';
import { SpeechProvider } from '@speechly/react-client';
import {
	ErrorPanel,
	PushToTalkButton,
	PushToTalkButtonContainer,
} from '@speechly/react-ui';

function App() {
	const classes = useStyles();
	return (
		<SpeechProvider
			appId='2886469d-798d-46de-844f-720ae4749b9e'
			language='en-US'
		>
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
					<Grid items xs={12} sm={3}>
						<Details title='Expense' />
					</Grid>
				</Grid>
				<PushToTalkButtonContainer>
					<PushToTalkButton />
					<ErrorPanel />
				</PushToTalkButtonContainer>
			</Provider>
		</SpeechProvider>
	);
}

export default App;
