import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "./DarkModeSwitch";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  let body = null;
  let loginUser = null;
  try {
    const loginUserItem = localStorage.getItem("loginUser");
    loginUser = JSON.parse(loginUserItem);
  } catch {

  }
  
  if (!loginUser) {
    body = (
      <>
        <NextLink href="/login">
          <Link color='white' mr={2}>LOGIN</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color='white'>REGISTER</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/">
          <Button as={Link} ml={2} mr={2}>
            Create Account
          </Button>
        </NextLink>
        <Box mr={2}>{loginUser.username}</Box>
        <Button 
          onClick={async () => { 
            // await logout("" as any); 
            localStorage.removeItem("loginUser");
            localStorage.removeItem("authtoken");
            loginUser = null;
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
          <Link>
            <Heading>Simple Bank</Heading>
          </Link>
        </NextLink>
        <Box ml={'auto'}>
          {body} 
        </Box>
        <DarkModeSwitch/>
      </Flex>
    </Flex>
  );
}
