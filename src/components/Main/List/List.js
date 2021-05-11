import React,{useContext} from 'react';
import {
	List as MUIList,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Slide,
} from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';
import useStyles from './Styles';
import {ExpenseTrackerContext} from '../../../context/context'

const List = () => {
	const classes = useStyles();
	const {deleteTransaction} = useContext(ExpenseTrackerContext);

	const transactions = [
		{
			id: 1,
			type: 'Income',
			category: 'Salary',
			amount: 50,
			date: 'Wed 16 2021',
		},
		{
			id: 2,
			type: 'Expense',
			category: 'Pets',
			amount: 100,
			date: 'Fri 18 2021',
		},
		{
			id: 1,
			type: 'Income',
			category: 'Business',
			amount: 150,
			date: 'Sun 20 2021',
		},
	];
	return (
		<MUIList dense={false} className={classes.list}>
			{transactions.map((transaction) => (
				<Slide
					direction='down'
					in
					mountOnEnter
					unmountOnExit
					key={transaction.id}
				>
					<ListItem>
						<ListItemAvatar>
							<Avatar
								className={
									transaction.type === 'Income'
										? classes.avatarIncome
										: classes.avatarExpense
								}
							>
								<MoneyOff />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={transaction.category}
							secondary={`$${transaction.amount} - ${transaction.date}`}
						/>
						<ListItemSecondaryAction>
							<IconButton edge='end' aria-label='delete' onClick={deleteTransaction}>
								<Delete />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</Slide>
			))}
		</MUIList>
	);
};

export default List;
