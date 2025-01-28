import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
            <SkillName>{skill.name}</SkillName>
            <SkillBar>
              <SkillLevel
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </SkillBar>
          </SkillItem>
        ))}
      </SkillsContainer>
    </Section>
  );
};

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const SkillsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SkillItem = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillName = styled.span`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const SkillBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
`;

const SkillLevel = styled(motion.div)`
  height: 100%;
  background: #007bff;
  border-radius: 5px;
`;

export default SkillsSection;