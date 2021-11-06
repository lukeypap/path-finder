import Node from "../Node/Node";

const Board = ({ handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter, board }) => {
  return (
    <>
      {board.map((row, index) => {
        return (
          <div key={index} style={{ display: "flex", justifyContent: "center" }}>
            {row.map((node, nodeIndex) => (
              <Node
                key={nodeIndex}
                startNode={node.startNode}
                finishNode={node.finishNode}
                row={node.row}
                col={node.col}
                hasBeenVisited={node.hasBeenVisited}
                wall={node.wall}
                onMouseDown={(row, col) => {
                  handleMouseDown(row, col);
                }}
                onMouseEnter={(row, col) => {
                  handleMouseEnter(row, col);
                }}
                onMouseUp={() => {
                  handleMouseUp();
                }}
                onMouseLeave={(row, col) => {
                  handleMouseLeave(row, col);
                }}
              />
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Board;
