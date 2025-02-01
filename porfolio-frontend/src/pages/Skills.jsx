import React from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SkillsSection = () => {
  const skills = [
    { name: 'Java', level: 90 },
    { name: 'Golang', level: 80 },
    { name: 'Spring Framework', level: 80 },
    { name: 'Gorilla mux', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 90 },
    { name: 'Postman', level: 70 },
    { name: 'Hibernate', level: 60 },
    { name: 'MySQL', level: 50 },
    { name: 'Mongodb', level: 65 },
  ];

  return (
    <Section>
      <Title>Skills</Title>
      <SkillsContainer>
        {skills.map((skill, index) => (
          <SkillItem key={index}>
            <CircularProgressbar
              value={skill.level}
              text={`${skill.level}%`}
              styles={buildStyles({
                textColor: '#fff',
                pathColor: '#64748b',
                trailColor: '#e0e0e0',
              })}
            />
            <SkillName>{skill.name}</SkillName>
          </SkillItem>
        ))}
      </SkillsContainer>
    </Section>
  );
};

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  height: 90vh;
  width: 100vw;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SkillItem = styled.div`
  width: 100px;
  text-align: center;
`;

const SkillName = styled.span`
  display: block;
  font-size: 1rem;
  margin-top: 0.5rem;
  color: #fff;
`;

export default SkillsSection;