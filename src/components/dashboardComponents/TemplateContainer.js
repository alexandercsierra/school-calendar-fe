import React, {useContext} from 'react';
import {DashboardContext} from '../../contexts/DesktopContexts'
import {Flex, Heading, Button} from '@chakra-ui/core';
import ChooseDateForm from './ChooseDateForm.js';
import CreateTemplateForm from './CreateTemplateForm'
import NewEventForm from '../mobile/eventComponents/NewEventForm';




const TemplateContainer = () => {

    const {
    formOpen,
    setFormOpen,
    templateList} = useContext(DashboardContext);


  return (
          <Flex
            className="templateArea"
            direction="column"
            align="center"
            justify="center"
            w="100%"
            p={8}
            mb={4}
            backgroundColor="white"
            borderRadius="10px"
          >
            <Heading as="h2">Events</Heading>
            {templateList &&
              templateList.map(t => (
                <ChooseDateForm
                  key={t.id}
                  id={t.id}
                  starttime={t.starttime}
                  endtime={t.endtime}
                  summary={t.summary}
                  description={t.description}
                />
                
              ))}
            <Button
              id="createEventChain"
              my={4}
              variantColor="teal"
              onClick={() => setFormOpen(!formOpen)}
            >
              Create Event Chain
            </Button>
            {formOpen && <CreateTemplateForm/>}
          </Flex>
  );
};

export default TemplateContainer;
