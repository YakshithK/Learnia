import React from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';
import Roadmap from '../components/roadmap';

export const Learn = () => {
  const location = useLocation();
  const receivedData = location.state; // this is the data passed from HomePage

  const parseRoadmap = (input) => {
    console.log(input)
    const stages = input.split('\n');  // Splitting the input into lines
    const titles = [];
    const titleIdx = [];
    const content = [];

    for (let i = 0; i < stages.length; i++) {
      if (stages[i].includes('Stage')) {
        titleIdx.push(i);  // Store index of stage titles
        titles.push(stages[i].split('### ')[1]);  // Store title after '###'
      }
    }

    const roadmap = [];

    titles.forEach((title, idx) => {
      const startIdx = titleIdx[idx];
      const endIdx = titleIdx[idx + 1] || stages.length;

      const stageLines = stages.slice(startIdx, endIdx);

      const stageContent = {
        title,
        content: []
      };

      let currentSection = null;
      let currentDetails = {
        subheading: '',
        details: []
      };

      stageLines.forEach((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('#### Objectives')) {
          if (currentSection !== null && currentDetails.details.length > 0) {
            stageContent.content.push({ ...currentDetails });
          }
          currentSection = 'Objectives';
          currentDetails = {
            subheading: 'Objectives',
            details: []
          };
        } else if (trimmedLine.startsWith('#### Topics')) {
          if (currentSection !== null && currentDetails.details.length > 0) {
            stageContent.content.push({ ...currentDetails });
          }
          currentSection = 'Topics';
          currentDetails = {
            subheading: 'Key Topics',
            details: []
          };
        } else if (trimmedLine.startsWith('#### Resources')) {
          if (currentSection !== null && currentDetails.details.length > 0) {
            stageContent.content.push({ ...currentDetails });
          }
          currentSection = 'Resources';
          currentDetails = {
            subheading: 'Resources',
            details: []
          };
        } else if (trimmedLine.startsWith('-')) {
          currentDetails.details.push(trimmedLine.slice(2).trim());
        }
      });

      if (currentSection !== null && currentDetails.details.length > 0) {
        stageContent.content.push({ ...currentDetails });
      }

      roadmap.push(stageContent);
    });

    return roadmap;
  };

  const roadmap = parseRoadmap(receivedData?.message);
  console.log('roadmap', JSON.stringify(roadmap, null, 2));  // For debugging

  return (
    <div>
      <h1>New Page</h1>
      <Roadmap roadmap={roadmap}/>
    </div>
  );
};
