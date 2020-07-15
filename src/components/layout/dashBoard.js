import React from 'react';
import Client from '../clients/clients';
import Sidebar from '../layout/sideBar';

export default () => {
  return (
    <div className='row'>
      <div className='col-md-10'>
        <Client />
      </div>
      <div className='col-md-2'>
        <Sidebar />
      </div>
    </div>
  );
};
