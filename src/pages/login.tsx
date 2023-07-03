import React from "react";
import { Form, Formik } from "formik"
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField"
import { useRouter } from "next/router"
import NextLink from "next/link";

function loginPOST(jsonData, setErrors, router) {
  fetch('http://localhost:8080/users/login', {
    method: 'POST', 
    mode: 'cors', 
    body: JSON.stringify(jsonData) 
  }).then((res) => {
    if (res.status === 200) {
      router.push("/");
    } else {
      setErrors({password: "Invalid username or password"});
    }
  }).catch(() => {
    setErrors({password: "Error happens when login"});
  });
}

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  return (
    <Wrapper variant="small">
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, actions) => {
        loginPOST(values, actions.setErrors, router);
      }}
    >
      {(props) => (
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
            isLoading={props.isSubmitting} 
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
