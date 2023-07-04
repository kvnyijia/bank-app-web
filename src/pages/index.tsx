import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { userServices } from '../utils/userServices'

const Index = () => {
  const [accounts, setAccounts] = useState(null);
  useEffect(() => {
    userServices.getAccounts().then(({resJson, ok}) => {
      if (ok) {
        setAccounts(resJson);
      }
    });
  }, []);

  let body: any = "helloooooooooo";
  if (accounts) {
    body = JSON.stringify(accounts);
  }

  return (
    <Layout>
      <div>{body}</div>
    </Layout>
  );
};

export default Index
