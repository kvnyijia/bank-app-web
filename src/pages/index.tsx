import { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';
import { userServices } from '../utils/userServices'

const Index = () => {
  const [accounts, setAccounts] = useState(null);
  useEffect(() => {
    userServices.getAccounts().then(async ({resJson, ok, status}) => {
      if (status === 200) {
        setAccounts(resJson);
      } else {
        console.log(status);
        console.log(resJson);
      }
    });
  }, []);

  let body: any = "Login to see your bank accounts";
  if (accounts) {
    body = JSON.stringify(accounts);
  }

  return (
    <>
      <NavBar />
      <Wrapper variant={"regular"}>
        <div>{body}</div>
      </Wrapper>
    </>
  );
};

export default Index;
