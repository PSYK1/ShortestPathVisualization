import React, { useEffect, useState } from "react";
import Astar from "../Algorithms/Astar";
import "./Grid.css";

const cols = 20;
const rows = 10;

let chooseStart = false;
let chooseEnd = false;

let startNode = null;
let endNode = null;
let walls = [];

let startCoords = "";
let endCoords = "";

function Grid() {
  const [Grid, setGrid] = useState([]);

  useEffect(() => {
    initializeGrid();
  }, []);

  let initializeGrid = () => {
    let grid = new Array(rows);

    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = new Unit(i, j);
      }
    }

    setGrid(grid);
  };

  function Unit(x, y) {
    this.x = x;
    this.y = y;
  }

  const changeNode = (x, y) => {
    if (chooseStart) {
      // remove previous start node if exists
      if (startNode != null) {
        let node = document.getElementById(startNode.id);
        node.className = "node";
      }
      // make chosen square green
      startNode = document.getElementById(`node ${y}-${x}`);
      startNode.className = "node start";
      startNode.isStart = true;
      startNode.isEnd = false;
      // end
      chooseStart = false;
    } else if (chooseEnd) {
      // remove previous endnode if exists
      if (endNode != null) {
        let node = document.getElementById(endNode.id);
        node.className = "node";
      }
      // make chosen square red
      endNode = document.getElementById(`node ${y}-${x}`);
      endNode.className = "node end";
      endNode.isEnd = true;
      endNode.isStart = false;
      // end
      chooseEnd = false;
    } else {
      let node = document.getElementById(`node ${y}-${x}`);
      if (startNode !== null && node.id !== startNode.id) {
        if (endNode !== null && node.id !== endNode.id) {
          node.className = "node wall";
          walls.push(node);
        } else {
          node.className = "node wall";
          walls.push(node);
        }
      } else {
        node.className = "node wall";
        let len = node.id.length;
        walls.push(node.id.substring(len - 3, len));
      }
    }
  };

  let visualize = () => {
    if (startNode == null || endNode == null) {
      // implement popup window
      console.log("You have not chosen a start node or end node");
    } else {
      let length = startNode.id.length;
      startCoords = startNode.id.substring(length - 3, length);

      length = endNode.id.length;
      endCoords = endNode.id.substring(length - 3, length);

      Astar(startCoords, endCoords, walls, Grid);
    }
  };

  const Node = ({ x, y }) => {
    let isStart = false;
    let isEnd = false;

    return (
      <div
        id={`node ${y}-${x}`}
        className="node"
        onClick={() => changeNode(x, y)}
      ></div>
    );
  };

  const displayGrid = (
    <div className="grid">
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rows">
            {row.map((col, colIndex) => {
              return (
                <Node
                  key={colIndex}
                  x={rowIndex}
                  y={colIndex}
                  chooseStart={chooseStart}
                  chooseEnd={chooseEnd}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const handleStart = () => {
    chooseStart = true;
    chooseEnd = false;
    console.log("choose start = " + chooseStart);
  };

  const handleEnd = () => {
    chooseEnd = true;
    chooseStart = false;
  };

  return (
    <div>
      <h1>Path Visualization</h1>
      <h2>Directions</h2>
      <h3>
        To choose the starting point first click on the "Choose a starting
        point" button and click on any square"
      </h3>
      <h3>
        To choose the ending point first click on the "Choose a end point"
        button and click on any square"
      </h3>
      <div>
        <button onClick={handleStart}>Choose a starting point</button>
        <button onClick={handleEnd}>Choose an end point</button>
        <button onClick={visualize}>Visualize</button>
      </div>
      {displayGrid}
    </div>
  );
}

export default Grid;
