import React from 'react';
import MobileChooseDateForm from './MobileChooseDateForm';
import styled from 'styled-components'



const MobileTemplateContainer = ({templateList}) => {


  return (
          <>
          <Container>
            <Title as="h2">Events</Title>
            </Container>
            <EventDiv>
            {templateList &&
              templateList.map(t => {
                return (
                
                  <MobileChooseDateForm
                    key={t.id}
                    id={t.id}
                    starttime={t.starttime}
                    endtime={t.endtime}
                    summary={t.summary}
                    description={t.description}
                    templateList={templateList}/>
                  
                )
              })}
              </EventDiv>
          </>
  );
};

export default MobileTemplateContainer;



const Container = styled.div`
    width: 100%;
    display: flex; 
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
    padding: 5% 2.5% 2.5% 2.5%;
    position: fixed;
    top: 0;
    background: white; 
`;

const Title = styled.h1`
    width: 60%;
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 27px;
`;

const EventDiv = styled.div`
  margin-top: 20%;
`
