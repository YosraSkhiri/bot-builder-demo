import styled from 'styled-components';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

interface NodeBtnProps {
	label: string;
  onDragStart: (e: any) => void,
}

const Button = styled.button`
	display: flex;
	gap: 10px;
	align-items: center;
  padding: 10px;
	border-radius: 20px;

  &:hover {
    background-color: #f3fff9;
  }
`;

const IconWrapper = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 10px;
	background-color: #f3fff9;
	border: 2px solid #66cb92;
	display: flex;

	& > * {
		margin: auto;
		color: #66cb92;
	}
`;

const Label = styled.div`
  text-align: left;
`

const NodeBtn = ({ label, onDragStart }: NodeBtnProps) => {
	return (
		<Button onDragStart={onDragStart} draggable>
			<IconWrapper>
				<MailOutlineOutlinedIcon />
			</IconWrapper>
			<Label>{label}</Label>
		</Button>
	);
};

export default NodeBtn;
