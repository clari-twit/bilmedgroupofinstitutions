import axios from 'axios';
import { AuthenticationRouteOfEndpoint } from 'constant/routesEndPoint';
import "datatables.net";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';
import CourceData from 'views/adminPannel/cource/CourceData';

function Cource() {
  const [costomersData, setCostomersData] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = getCurrentUser()?.token;
  const navigate = useNavigate();

  const getAllReworkData = async () => {
    try {
      if (!token) {
        navigate(AuthenticationRouteOfEndpoint?.UNAUTHORIZE_ROUTE);
        return;
      }
      const response = await axios.get(`${BASE_URL}api/course`, {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
      setCostomersData(response?.data);
    } catch (error) {
      console.error('Error fetching rework data:', error);
    }
  };

  useEffect(() => {
    getAllReworkData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CourceData data={costomersData} getAllReworkData={getAllReworkData} />
  )
}

export default Cource;
