import React, { useEffect, useState } from "react";
import dot1 from "../data/dot1.json";

const DotMatching = () => {
  const [data, setData] = useState([]);
  const [scale, setScale] = useState(1);
  const [selectedDots, setSelectedDots] = useState([]);
  const [currentDotIndex, setCurrentDotIndex] = useState(0)
  const svgRef = React.createRef();

  useEffect(() => {
    setData(dot1);
  }, []);

  const handleZoomIn = () => {
    setScale(scale * 1.2); // Increase the scale by 20%
  };

  const handleZoomOut = () => {
    setScale(scale / 1.2); // Decrease the scale by 20%
  };

  const handleDotClick = (dot) => {
    console.log('click' , dot)
   
    // Check if the selected dot is the next one in the sequence
    if (dot.id === selectedDots.length + 1) {
      setSelectedDots([...selectedDots, dot]);
    }else{
        console.log('wrong dot')
    }
  };
  const navigateToLastSelectedDot = () => {
    // Check if there are selected dots
    if (selectedDots.length > 0) {
      const lastSelectedDot = selectedDots[selectedDots.length - 1];

      // Calculate the zoom scale and translate coordinates to center the view on the last selected dot
      const newScale = 2; // Set the desired scale here
      const newX = -(lastSelectedDot.x * newScale - svgRef.current.clientWidth / 2);
      const newY = -(lastSelectedDot.y * newScale - svgRef.current.clientHeight / 2);

      setScale(newScale);
      svgRef.current.setAttribute("transform", `translate(${newX}, ${newY}) scale(${newScale})`);
    } else {
      // If no dot is selected, target the first dot (index 0)
      if (data.length > 0) {
        const firstDot = data[0];

        // Calculate the zoom scale and translate coordinates to center the view on the first dot
        const newScale = 2; // Set the desired scale here
        const newX = -(firstDot.x * newScale - svgRef.current.clientWidth / 2);
        const newY = -(firstDot.y * newScale - svgRef.current.clientHeight / 2);

        setScale(newScale);
        svgRef.current.setAttribute("transform", `translate(${newX}, ${newY}) scale(${newScale})`);
      }
    }
  };

  const renderLines = () => {
      console.log('remdering')
      if (selectedDots.length < 2) {
          return null; // No lines to draw if less than two dots are selected
        }
        console.log('remdering22')
    const lines = [];
    for (let i = 0; i < selectedDots.length - 1; i++) {
      const dot1 = selectedDots[i];
      const dot2 = selectedDots[i + 1];
      console.log(`Line ${i}: (${dot1.x},${dot1.y}) to (${dot2.x},${dot2.y})`);

      lines.push(
        <line
          key={`line-${i}`}
          x1={dot1.x}
          y1={dot1.y}
          x2={dot2.x}
          y2={dot2.y}
          stroke="blue" // Customize the line color as needed
          strokeWidth="2" // Customize the line width as needed
        />
      );
    }
    return lines;
  };

  const renderNumbers = () => {
    return data.map((dot) => {
      if (dot.type === "circle") {
        return (
          <text
            key={`text-${dot.id}`}
            x={dot.x + 5}
            y={dot.y + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="4" // Customize the font size as needed
            fill="black" // Customize the text color as needed
            style={{ pointerEvents: "none" , zIndex: 10}} // Prevent text from blocking click events
          >
            {dot.id}
          </text>
        );
      }
      return null; // Handle other dot types if needed
    });
  };

  return (
    <>
      <div className="mb-6 z-10 fixed bg-slate-400 rounded-lg m-4 top-0 left-1/2">
        
        <button className="m-4" onClick={navigateToLastSelectedDot}>Navigate</button>
        {/* <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button> */}
      </div>
      {data.length > 0 && (
        <svg
          ref={svgRef}
          width={1920}
          height={1080}
          fontSize={data[0].fontSize}
        >
          <g transform={`scale(${scale})`}>
            {renderNumbers()}
            {renderLines()}
            {data.map((dot) => {
              if (dot.type === "circle") {
                return (
                  <circle
                    key={dot.id}
                    cx={dot.x}
                    cy={dot.y}
                    r={dot.textD}
                    fill="blue" // Change the fill color as needed
                    onClick={() => handleDotClick(dot)}
                    style={{ cursor: "pointer" }}
                  />
                );
              }
              return null; // Handle other dot types if needed
            })}
          </g>
        </svg>
      )}
    </>
  );
};

export default DotMatching;
