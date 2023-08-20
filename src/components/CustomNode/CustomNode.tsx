import { Handle, Position, Node, NodeProps } from 'reactflow';
import styled from 'styled-components';

type NodeData = {
	label: string;
	value: number;
  id: string,
};

type CustomNode = Node<NodeData>;

const NodeWrapper = styled.div`
	padding: 10px;
	border: 1px solid #e8e9e6;
	border-radius: 10px;
	background-color: #fff;
`;

const CustomNode = ({ data }: NodeProps<NodeData>) => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Left}
        id={`${data.id}-left`}
				style={{ backgroundColor: '#66CB92' }}
			/>
			<NodeWrapper onClick={(e) => data.onClick(e, {label: data.label, id: data.id})}>{data.label}</NodeWrapper>
			<Handle
				type="source"
				position={Position.Right}
				id={`${data.id}-right`}
				style={{ backgroundColor: '#66CB92' }}
			/>
		</>
	);
};

export default CustomNode;
