import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useState, useContext, useEffect } from 'react';
import useStyle from './Styles';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import {
	expenseCategories,
	incomeCategories,
} from '../../../constants/category';
import FormatDate from '../../../utils/FormatDate';
import { useSpeechContext } from '@speechly/react-client';
import CustomizedSnackbar from '../../Snackbar/Snackbar';

const initialState = {
	amount: '',
	category: '',
	type: 'Income',
	date: FormatDate(new Date()),
};

const Form = () => {
	const classes = useStyle();
	const [formData, setFormData] = useState(initialState);
	const { addTransaction } = useContext(ExpenseTrackerContext);
	const { segment } = useSpeechContext();
	const [open, setOpen] = useState(false);

	const selectedCategories =
		formData.type === 'Income' ? incomeCategories : expenseCategories;

	const createTransaction = () => {
		if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
		const transaction = {
			...formData,
			amount: Number(formData.amount),
			id: uuidv4(),
		};
		setOpen(true);
		addTransaction(transaction);
		setFormData(initialState);
	};

	useEffect(() => {
		if (segment) {
			if (segment.intent.intent === 'add_expense') {
				setFormData({ ...formData, type: 'Expense' });
			} else if (segment.intent.intent === 'add_income') {
				setFormData({ ...formData, type: 'Income' });
			} else if (
				segment.isFinal &&
				segment.intent.intent === 'create_transaction'
			)
				return createTransaction();
			else if (
				segment.isFinal &&
				segment.intent.intent === 'cancel_transaction'
			)
				return setFormData(initialState);

			segment.entities.forEach((e) => {
				console.log(e.value);
				const category = `${e.value.charAt(0)}${e.value
					.slice(1)
					.toLowerCase()}`;
				switch (e.type) {
					case 'amount':
						setFormData({ ...formData, amount: e.value });
						break;
					case 'category':
						if (incomeCategories.map((iC) => iC.type).includes(category)) {
							setFormData({ ...formData, type: 'Income', category });
						} else if (
							expenseCategories.map((iC) => iC.type).includes(category)
						) {
							setFormData({ ...formData, type: 'Expense', category });
						}
						break;
					case 'date':
						setFormData({ ...formData, date: e.value });
						break;
					default:
						break;
				}
			});

			if (
				segment.isFinal &&
				formData.amount &&
				formData.category &&
				formData.date &&
				formData.type
			)
				createTransaction();
		}
	}, [segment]);
	return (
		<Grid container spacing={2}>
			<CustomizedSnackbar open={open} setOpen={ setOpen}/>
			<Grid item xs={12}>
				<Typography align='center' variant='subtitle2' gutterBottom>
					{segment && segment.words.map((w) => w.value).join(' ')}
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel>Type</InputLabel>
					<Select
						value={formData.type}
						onChange={(e) => setFormData({ ...formData, type: e.target.value })}
					>
						<MenuItem value='Income'>Income</MenuItem>
						<MenuItem value='Expense'>Expense</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel>Category</InputLabel>
					<Select
						value={formData.category}
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
					>
						{selectedCategories.map((c) => (
							<MenuItem key={c.type} value={c.type}>
								{c.type}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<TextField
					type='number'
					label='Amount'
					fullWidth
					value={formData.amount}
					onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					type='date'
					label='Date'
					fullWidth
					value={formData.date}
					onChange={(e) =>
						setFormData({ ...formData, date: FormatDate(e.target.value) })
					}
				/>
			</Grid>
			<Button
				className={classes.button}
				variant='outlined'
				color='primary'
				onClick={createTransaction}
				fullWidth
			>
				Create
			</Button>
		</Grid>
	);
};

export default Form;
