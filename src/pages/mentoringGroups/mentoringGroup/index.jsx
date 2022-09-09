import styled from "styled-components";

export default function MentoringGroup({ mentorName, students }) {
  return (
    <Container>
      <MentorNameHolder>{`Mentor(a): ${mentorName}`}</MentorNameHolder>

      {students.map(({ id, name }) => (
        <StudentNameHolder key={`student-${id}`}>{name}</StudentNameHolder>
      ))}
    </Container>
  );
}

const Container = styled.div`
  height: auto;
  width: 70vw;

  background-color: #525268;

  margin: 1rem 0;
  border-radius: 15px;
`;

const MentorNameHolder = styled.p`
  margin-top: 1.5rem;
  margin-left: 3rem;
  margin-bottom: 2rem;
`;

const StudentNameHolder = styled.div`
  margin-left: 3rem;
  margin-bottom: 0.5rem;
`;
