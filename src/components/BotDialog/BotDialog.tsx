import { useState, useCallback, useRef } from 'react';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogHeading,
	DialogClose,
} from './Dialog';
import { Node, Edge, useNodesState, useEdgesState, addEdge } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { Button, Typography } from '@mui/material';
import FlowBuilder from '../FlowBuilder';
import NodeForm from '../NodeForm';

import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import NodeBtn from '../NodeBtn';

const DialogHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	background-color: #f0f0f2;
`;

const DialogLayout = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: calc(100vh - 100px - 70px - 58px); // 70px is the height of DialogHead

	& > div:nth-child(1) {
		flex-basis: 380px;
		padding: 20px;
		border-right: 2px solid #e8e9e6;
	}

	& > div:nth-child(2) {
		flex-basis: 100%;
		height: 100%;
	}
`;

const FlowBuilderWrapper = styled.div`
	flex-basis: calc(100% - 320px);
`;

const NodesList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const FormContainer = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	overflow: hidden;
	padding: 20px;
	width: 320px;
	height: 100%;
	position: relative;

	background-color: #ffffff;

	border-left: 2px solid #e8e9e6;
`;

const BotMainActions = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	justify-content: space-between;
	width: 100%;
	padding: 10px 20px;
	//padding-right: 340px;
	border-bottom: 2px solid #e8e9e6;
`;

const BotDialog = () => {
	const reactFlowWrapper = useRef(null);

	const [open, setOpen] = useState(true);
	const [botName, setBotName] = useState('Bot Name');
	const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
	const [openForm, setOpenForm] = useState({
		open: false,
		title: '',
	});
	const [reactFlowInstance, setReactFlowInstance] = useState(null);

	const onDragStart = (event: any, label: string) => {
		event.dataTransfer.setData('application/reactflow', label);
		event.dataTransfer.effectAllowed = 'move';
	};

	const onConnect = useCallback(
		(params: any) => setEdges((eds) => addEdge(params, eds)),
		[]
	);

	const onDragOver = useCallback((event: any) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const onDrop = useCallback(
		(event: any) => {
			event.preventDefault();

			if (reactFlowWrapper.current && reactFlowInstance) {
				const reactFlowBounds =
					reactFlowWrapper.current.getBoundingClientRect();
				const label = event.dataTransfer.getData('application/reactflow');

				const position = reactFlowInstance.project({
					x: event.clientX - reactFlowBounds.left,
					y: event.clientY - reactFlowBounds.top,
				});
				const newNode = {
					id: uuidv4(),
					type: 'customNode',
					position,
					data: {
						label,
						onClick: (e: any, { label, id }: { label: string; id: string }) =>
							setOpenForm({
								open: true,
								title: label,
							}),
					},
				};

				setNodes((nds) => nds.concat(newNode));
			}
		},
		[reactFlowInstance]
	);

	return (
		<div>
			<Dialog
				open={open}
				onOpenChange={setOpen}>
				<DialogContent className="Dialog">
					<DialogHead>
						<DialogHeading>
							<Typography
								variant="subtitle1"
								component="p"
								style={{ fontWeight: 600 }}>
								Bot Builder
							</Typography>
						</DialogHeading>
						<DialogClose>
							<CloseIcon />
						</DialogClose>
					</DialogHead>
					<DialogLayout>
						<div>
							<NodesList>
								<Typography
									variant="h6"
									component="p"
									style={{ fontWeight: 600 }}>
									Triggers
								</Typography>
								<NodeBtn
									label="On message"
									onDragStart={(event: any) => onDragStart(event, 'On message')}
									draggable
								/>
								<Typography
									variant="h6"
									component="p"
									style={{ fontWeight: 600 }}>
									Actions
								</Typography>

								<NodeBtn
									label="Send message"
									onDragStart={(event: any) =>
										onDragStart(event, 'Send message')
									}
									draggable
								/>
								<NodeBtn
									label="Send interactive message"
									onDragStart={(event: any) =>
										onDragStart(event, 'Send interactive message')
									}
									draggable
								/>
								<NodeBtn
									label="Send template"
									onDragStart={(event: any) =>
										onDragStart(event, 'Send template')
									}
									draggable
								/>
							</NodesList>
						</div>
						<FlowBuilderWrapper>
							<BotMainActions>
								<div>New Bot</div>
								<Button variant="outlined">Save</Button>
							</BotMainActions>
							<FlowBuilder
								nodes={nodes}
								edges={edges}
								onEdgesChange={onEdgesChange}
								onNodesChange={onNodesChange}
								ref={reactFlowWrapper}
								onDrop={onDrop}
								onDragOver={onDragOver}
								onConnect={onConnect}
								onInit={setReactFlowInstance}
							/>
						</FlowBuilderWrapper>
						{openForm.open && (
							<FormContainer>
								<NodeForm title={openForm.title} />
							</FormContainer>
						)}
					</DialogLayout>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default BotDialog;
