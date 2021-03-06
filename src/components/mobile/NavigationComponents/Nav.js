import React from "react";
import styled from 'styled-components'


const Nav = ({setNavState, colors, setFormOpen, setSelected, setToggleNav, setTemplateFormOpen}) => {


    //closes date selection more when a navigation to a new page, and empties date selection
    const handleChange = (num) => {
        setNavState(num)
        setFormOpen(false)
        setTemplateFormOpen(false)
        setSelected([])
        setToggleNav(true)
    }
            //icon and label colors change based on navState
           return( <div>
                <Container>
                    <IconDiv onClick={()=>{
                        setToggleNav(true);
                        handleChange(0)
                    }}>
                        <i className="far fa-calendar-alt" style={{ fontSize: '2rem', color: colors[0] }}></i>
                        <Label style={{color: colors[0]}}>Calendar</Label>
                    </IconDiv>

    
                    <IconDiv onClick={()=>handleChange(1)}>
                        <i className="fas fa-bars" style={{ fontSize: '2rem', color: colors[1]  }}></i>
                        <Label style={{color: colors[1]}}>Events</Label>
                    </IconDiv>
    
                    <IconDiv onClick={()=>handleChange(2)}>
                        <i className="fas fa-users" style={{ fontSize: '2rem', color: colors[2]  }}></i>
                        <Label style={{color: colors[2]}}>Groups</Label>
                    </IconDiv>
                </Container>
            </div>)

          
}

const Container = styled.div`

    width: 100%; 
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    padding: 3% 2.5%;
    border-top: 1px solid #F2F2F2;
    background: white;

`;

const IconDiv = styled.div`
    width: 61px;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Label = styled.p`
    font-size: 12px;
    font-family: Open Sans;
`;

export default Nav;