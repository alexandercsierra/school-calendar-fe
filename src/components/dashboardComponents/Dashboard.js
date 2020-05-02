import React, { useState, useEffect } from 'react';
import { Flex, Box, Grid } from '@chakra-ui/core';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';
import Calendar from './calendarComponents/Calendar.js';
import ProfileInfo from './ProfileInfo'
import TemplateContainer from './TemplateContainer'
import {DashboardContext} from '../../contexts/DesktopContexts'


const getTemplateList = async ({ googleId }) => {
  try {
    const response = await axios.get(
      `https://d8pickerlabs22.herokuapp.com/api/template/${googleId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


const Dashboard = () => {
  const { googleApi, api } = useAuth();

  const [templateList, setTemplateList] = useState([]);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [shadow, setShadow] = useState("");
  const { currentUser, handleSignOut } = googleApi;


  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
      setTemplateList(templates);
    })();
  }, [currentUser, formOpen]);

  //highlights calendar based on whether choose dates button is active or not
  useEffect(() => {
    if (templateFormOpen) {
      setShadow("0px 0px 19px 7px rgba(99,179,237,1)")
    } else {
      setShadow("");
    }
  }, [templateFormOpen])



  // state to show users events
  const [events, setEvents] = useState(null);

  // get events from api and set to state
  useEffect(() => {
    (async () => {
      try {
        const data = await api.listEvents();
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [api]);




  return (
    <DashboardContext.Provider value={{formOpen, setFormOpen, templateList, selected, setSelected, templateFormOpen, setTemplateFormOpen, setTemplateList, currentUser, events}}>
    <Box
      pos="relative"
      backgroundColor="brand.lightgray"
      p={[4, 16]}
      minHeight="100vh"
    >
      <Grid
        width="100%"
        gap={4}
        templateColumns={['1fr', '250px 1fr']}
        gridTemplateAreas={["'sidebar' 'main'", "'sidebar main'"]}
      >
        <Flex
          className="sidebar"
          gridArea="sidebar"
          direction="column"
          align="center"
        >
          <ProfileInfo currentUser={currentUser} handleSignOut={handleSignOut} />
          <TemplateContainer/>
        </Flex>
        <Box className="calendarArea" gridArea="main" style={{ boxShadow: shadow }}>
          <Calendar
            api={api}
            selected={selected}
            setSelected={setSelected}
            templateFormOpen={templateFormOpen}
            setTemplateFormOpen={setTemplateFormOpen}
            events={events}
          />
        </Box>
      </Grid>
    </Box>
    </DashboardContext.Provider>
  );
};

export default Dashboard;

