import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { userServices } from "../utils/userServices";

interface NavBarProps {

}

interface loginUserProps {
  username: string;
  full_name: string; 
  email: string;
  password_changed_at: string; 
  created_at: string;
}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  let body = null;
  const [loginUser, setLoginUser] = useState<loginUserProps>({} as loginUserProps);
  useEffect(() => {
    const loginUserItem = localStorage.getItem("loginUser");
    const jsonLoginUserItem = JSON.parse(loginUserItem);
    setLoginUser(jsonLoginUserItem);
  }, []);
  
  const [authTokenIsValid, setAuthTokenIsValid] = useState(false);
  useEffect(() => {
    userServices.getAccounts().then(async ({resJson, ok, status}) => {
      if (status === 200) {
        setAuthTokenIsValid(true)
      }
    });
  }, []);

  if (!loginUser || !authTokenIsValid) {
    body = (
      <Flex align="center">
        <Box mr={2}>
          <NextLink href="/login">
            LOGIN
          </NextLink>
        </Box>
        <Box>
          <NextLink href="/register">
            REGISTER
          </NextLink>
        </Box>
      </Flex>
    )
  } else {
    body = (
      <Flex align="center">
        <Box mr={2}>
          <NextLink href="/" >
            Create Account
          </NextLink>
        </Box>
        <Box mr={2}>{loginUser.username}</Box>
        <Button 
          onClick={async () => { 
            // await logout("" as any); 
            localStorage.removeItem("loginUser");
            localStorage.removeItem("authtoken");
            setLoginUser({} as loginUserProps);
            router.reload();
          }}
          // isLoading={logoutFetching}
          variant="link"
        >
          LOGOUT
        </Button>
      </Flex>
    )
  }
  return (
    <Flex
      bg="#00a2c7"
      p={4}
      zIndex={1}
      position="sticky"
      top={0}
    >
      <Flex
        maxW={800}
        align="center"
        m="auto"
        flex={1}
      >
        <NextLink href="/">
          <Heading>Simple Bank</Heading>
        </NextLink>
        <Box ml={'auto'}>
          {body}
        </Box>
        <DarkModeSwitch/>
      </Flex>
    </Flex>
  );
}
