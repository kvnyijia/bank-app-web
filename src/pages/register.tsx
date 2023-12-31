import React from "react";
import { Form, Formik } from "formik"
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField"
import { useRouter } from "next/router"
import { userServices } from "../utils/userServices";

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  return (
    <Wrapper variant="small">
    <Formik
      initialValues={{ username: '', full_name: '', email: '',  password: '' }}
      onSubmit={async (values, actions) => {
        let {resJson, ok} = await userServices.createUser(values);
        if (ok) {
          router.push("/login");
        } else {
          actions.setErrors({password: resJson.error});
        }
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
              name="full_name"
              placeholder="Fullname"
              label="Fullname"
              type="text"
            />
          </Box>
          <Box mt={4}>
            <InputField
              name="email"
              placeholder="Email"
              label="Email"
              type="text"
            />
          </Box>
          <Box mt={4}>
            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
          </Box>
          <Button 
            mt={4} 
            type="submit" 
            isLoading={props.isSubmitting} 
            colorScheme='teal'
          >
            REGISTER
          </Button>
        </Form>
      )}
    </Formik>
    </Wrapper>
  );
}

export default Register;
