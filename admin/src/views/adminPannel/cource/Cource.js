import axios from 'axios';
import "datatables.net";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CourceData from 'views/adminPannel/cource/CourceData';

function Cource() {
  const [costomersData, setCostomersData] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getAllReworkData = async () => {
    try {
      const token = Cookies.get('authToken');
      const data = await axios.get(BASE_URL + '/api/course', {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
      setCostomersData(data?.data);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getAllReworkData();
  }, []);
  return (
    <CourceData data={costomersData} getAllReworkData={getAllReworkData} />
  )
}

export default Cource;
