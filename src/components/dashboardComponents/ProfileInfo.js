import React from 'react';
import {Flex, Heading, Image, Button} from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';



const ProfileInfo = () => {
    const { googleApi} = useAuth();
    const { currentUser, handleSignOut } = googleApi;



  return (
          <Flex
            className="profileInfo"
            direction="column"
            align="center"
            justify="center"
            w="100%"
            p={8}
            mb={4}
            backgroundColor="white"
            borderRadius="10px"
          >
            <Image
              rounded="full"
              size="150px"
              src={currentUser.photoUrl}
              alt="avatar"
              mb={2}
            />
            <Heading as="h4" fontSize="xl" fontWeight="medium" mb={2}>
              {currentUser.email}
            </Heading>
            <Button variantColor="red" onClick={()=>{
              handleSignOut();
            }} mb={2}>
              Sign out
            </Button>
          </Flex>
          
  );
};

export default ProfileInfo;
