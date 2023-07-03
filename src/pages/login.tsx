import React from "react";
import { Form, Formik } from "formik"
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField"
import { useRouter } from "next/router"
import NextLink from "next/link";

function loginPOST(jsonData) {
  fetch('http://localhost:8080/users/login', {
    method: 'POST', 
    mode: 'cors', 
    body: JSON.stringify(jsonData) 
  }).then((res) => {
    console.log(res);
    console.log('login POST succeed!');
  }).catch((err) => {
    console.log(err)
    console.log('login POST failed!');
  });
}

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  return (
    <Wrapper variant="small">
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, {setErrors}) => {
        loginPOST(values);
      }}
    >
      {({isSubmitting}) => (
        <Form>
          <InputField
            name="username"
            placeholder="Username"
            label="Username"
            type="text"
          />
          <Box mt={4}>
            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
          </Box>
          <Flex mt={2}>
            <NextLink href="/forget-password">
              <Link ml="auto">Forget password?</Link>
            </NextLink>
          </Flex>
          <Button 
            mt={4} 
            type="submit" 
            isLoading={isSubmitting} 
            colorScheme='teal'
          >
            LOGIN
          </Button>
        </Form>
      )}
    </Formik>
    </Wrapper>
  );
}

export default Login;
