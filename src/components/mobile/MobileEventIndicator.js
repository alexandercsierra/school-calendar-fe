import React, {useState, useEffect} from 'react';
import styled from 'styled-components';



// Displays blue box with name of event
const EventIndicator = ({ event, eventSummary}) => {
 
  const [summ, setSumm] = useState("")

  //if name of event is greater than 5 characters, shorten it to fit within a day box at mobile size
  useEffect(()=>{
      eventSummary.length > 5 ? setSumm(eventSummary.substring(0,5)) : setSumm(eventSummary)
  },[])
  
  return event ? (
    <EventContainer>
      <Event>{summ}</Event>
    </EventContainer>
  ) : null;
};

export default EventIndicator;

const EventContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // width: 100%;
  margin: 2% 0
`;


const Event = styled.div`
  font-size: 90%;
  background: #1E85C4;
  color: white;
  border-radius: 5px;
`



