import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';
import CostomersData from './CostomersData';

function CustomerAdmin() {
  const [loading, setLoading] = useState(false);
  const [costomersData, setCostomersData] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getAllReworkData = async () => {
    setLoading(true);
    try {
      const token = getCurrentUser()?.token;
      const data = await axios.get(BASE_URL + 'api/customer', {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
      setCostomersData(data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err)
    }
  };

  useEffect(() => {
    getAllReworkData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="table_component">
      <div className="pending_table">
        <CostomersData data={costomersData} getAllReworkData={getAllReworkData} />
        {loading ? <div className="loader_table"> <div className="loader table_loader_change"></div></div> : null}
      </div>
    </div>
  )
}

export default CustomerAdmin;
