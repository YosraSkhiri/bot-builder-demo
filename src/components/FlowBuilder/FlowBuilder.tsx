import 'reactflow/dist/style.css'
import { useMemo, forwardRef } from 'react'
import ReactFlow, { 
  Controls, 
  Background, 
  Node,
	Edge,
} from 'reactflow'
import CustomNode from '../CustomNode'

interface FlowBuilderProps {
  nodes: Node[],
  edges: Edge[],
}

const FlowBuilder = forwardRef<HTMLDivElement, FlowBuilderProps>(({
  nodes,
  edges,
  ...other
}, ref) => {
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

	return (
		<div style={{ width: '100%', height: '100%' }} ref={ref}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
        nodeTypes={nodeTypes}
        fitView
        {...other}
      >
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
});

FlowBuilder.displayName = 'FlowBuilder'
export default FlowBuilder;
