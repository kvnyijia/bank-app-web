import { useEffect, useState } from 'react';
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { userServices } from '../utils/userServices';

const Index = () => {
  const [accounts, setAccounts] = useState(null);
  useEffect(() => {
    userServices.getAccounts().then((accountsData) => {
      setAccounts(accountsData);
    });
  }, []);

  let body: any = "helloooooooooo";
  if (accounts) {
    body = JSON.stringify(accounts);
  }

  return (
    <>
      <div>{body}</div>
      <DarkModeSwitch/>
    </>
  );
};

export default Index
