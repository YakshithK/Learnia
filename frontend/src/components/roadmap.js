import React from 'react';
import { Card } from './card';

const Roadmap = ({roadmap}) => {


  const roadmapContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  };

  const roadmapStageStyle = {
    position: 'relative',
  };

  const lineStyle = {
    width: '4px',
    height: '50px',
    backgroundColor: '#ccc',
    margin: '0 auto',
  };

  return (
    <div style={roadmapContainerStyle}>
      {roadmap.map((stage, index) => (
        <div key={index} style={roadmapStageStyle}>
          <Card title={stage.title} content={stage.content} />
          {index < roadmap.length - 1 && <div style={lineStyle}></div>}
        </div>
      ))}
    </div>
  );
};

export default Roadmap;