import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

interface NodeFormProps {
  title: string,
}

const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
	overflow: auto;
	height: 100%;
`;

const NodeForm = ({ title }: NodeFormProps) => {
	return (
		<div>
      <Typography variant="h5" >{title}</Typography>
			<FormWrapper>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Age</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						//value={age}
						label="Age"
						//</FormControl>onChange={handleChange}
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Age</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						//value={age}
						label="Age"
						//</FormControl>onChange={handleChange}
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id="outlined-basic"
					label="Outlined"
					variant="outlined"
					fullWidth
				/>
				<Button variant="contained">Save</Button>
				<Button variant="outlined">Close</Button>
			</FormWrapper>
		</div>
	);
};

export default NodeForm;
