import React, {useState, useEffect, useContext} from 'react'
import {MobileContext} from '../../contexts/MobileContexts'
import styled from 'styled-components'
import {useAuth} from '../../contexts/auth'
import {convertTime, convertEvents} from '../../utils/helperFunctions'


const ConfirmDatesBtn = () => {

  const {setFormOpen, setTemplateFormOpen, conStart, conEnd, summ, selected, setSelected} = useContext(MobileContext);

    const { api } = useAuth();

    //takes input from date selection and add template form and sends to google calendar api
    const applyTemplate = (summary, description, starttime, endtime) => {
        //creates new date and isolates timezone offset
        let date = new Date().toString().split("GMT");
        //takes the first few characters of offset with + or - to be slotted in the start and end times
        let zone = date[1].split(' ')[0].slice(0, 3);
        //converts events to user's timezone
        const eventList = convertEvents(selected, starttime, endtime, zone, summary, description);
        
        //add events to google calendar, clear currently selected dates, ends date selection mode (formOpen and templateFormOpen)
        eventList.forEach(event => {
          api.addEvent(event)
        });
        setSelected([]);
        setFormOpen(false);
        setTemplateFormOpen(false)

        //necessary so that event is sent to api before the page reloads. As of now, page must reload to show new event list that contains the added events
        setTimeout(()=>{window.location.reload(false)}, 500);
      };

    const handleClick = (e) =>{
        e.preventDefault();
        
        //no state setup yet for the description, so it is set to be blank
        applyTemplate(summ, "", conStart, conEnd);
    }

    const[shortSumm, setShortSumm] = useState(summ)

    //truncates the name of an event to fit on the confrim dates button based on a percentage of the inner width of the window
    useEffect(()=>{
      if(summ.length > (window.innerWidth*.04)){
        setShortSumm(`${summ.substring(0,Math.floor((window.innerWidth*.04))-3)}...`)
      }
    
    },[summ])

    //shows shortened event name and time converted into 12-hour format on the button. Time should NOT be sent to calendar api in 12-hour format, it should only be shown as such in the UI.
    return(
        <ButtonContainer>
            <EventDiv>
                <Title>{shortSumm}</Title>
                <Time>{convertTime(conStart)}-{convertTime(conEnd)}</Time>
            </EventDiv>
            <Button onClick={handleClick}>Confirm Dates</Button>
        </ButtonContainer>
    )
}

export default ConfirmDatesBtn


  const ButtonContainer = styled.div`
  position: fixed;
  top: 80%;
  left: 20%;
  width: 60%;
  margin: 0 auto;
  height: 60px;
  border-radius: 30px;
  background: #d6d9db;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  @media(max-width: 768px){
    width: 80%;
    left: 10%;
  }
`;

const EventDiv = styled.div`
    line-height: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
`;

const Title = styled.h1`
    font-size: 1.4rem;
    
    @media(max-width: 768px){
      font-size: 1rem;
    }
`;

const Time = styled.p`
    font-size: .9rem;
`;

const Button = styled.button`
    width: 141px;
    height: 42px;
    border-radius: 20px;
    background: #28807D;
    color: white;
    font-weight: bold;
    margin-right: 3%;
    cursor: pointer;
`;

