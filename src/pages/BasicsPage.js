import PageContainer from '../components/UI/PageContainer';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';

const pages = ['Categories', 'Accounts', 'Currencies'];

const BasicsPage = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <PageContainer>
      <Tabs value={value} onChange={handleChange} aria-label='nav tabs example'>
        {pages.map((page) => (
          <Tab label={page} component={RouterLink} to={'/basics/' + page} key={page}/>
        ))}
      </Tabs>
      <PageContainer>
      <Outlet />
      </PageContainer>
    </PageContainer>
  );
};

export default BasicsPage;
