import { Grid } from '@material-ui/core';
import React,{useEffect,useRef} from 'react';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import useStyles from './styles';
import { Provider } from './context/context';
import { SpeechState,SpeechProvider, useSpeechContext } from '@speechly/react-client';
import {
	ErrorPanel,
	PushToTalkButton,
	PushToTalkButtonContainer,
} from '@speechly/react-ui';

function App() {
	const classes = useStyles();
	const { speechState } = useSpeechContext();
	const main = useRef(null)
	const executeScroll = () => main.current.scrollIntoView();
	useEffect(() => {
		if (speechState === SpeechState.Recording) {
			executeScroll();
		}
	}, [speechState])
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
					<Grid items xs={12} sm={3} className={classes.mobile}>
						<Details title='Income' />
					</Grid>
					<Grid ref={main} items xs={12} sm={4} className={classes.main}>
						<Main />
					</Grid>
					<Grid items xs={12} sm={3} className={classes.desktop}>
						<Details title='Income' />
					</Grid>
					<Grid items xs={12} sm={3} className={classes.last}>
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
