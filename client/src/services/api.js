import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const postLoginAPI = async (url, json) => {
  try {
    const { data } = await axios.post(BASE_URL + url, json, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true,
    });
    return data;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
    console.log(err.config);
    return err;
  }
};

// export const getAPI = async (url) => {
//   const router = useRouter();
//   try {
//     const token = Cookies.get("authToken");
//     const { data } = await axios.get(BASE_URL + url, {
//       headers: {
//         'x-access-token': token,
//       },
//       withCredentials: true,
//     });
//     if (data.message === false) {
//       Cookies.remove("authToken")
//       router.push('/login');
//     } else if (data.message === true) {
//       return data;
//     }
//   } catch (err) {
//     Cookies.remove("authToken")
//     router.push('/login');
//   }
// };


// export const deleteAPI = async (url) => {
//   try {
//     const token = Cookies.getItem("authToken");
//     const { data } = await axios.delete(BASE_URL + url, {
//       headers: {
//         'x-access-token': token,
//       }
//     }, {
//       withCredentials: true,
//     });
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const postAPI = async (url, json) => {
//   try {
//     const token = Cookies.getItem("authToken");
//     const { data } = await axios.post(BASE_URL + url, {
//       headers: {
//         'x-access-token': token,
//       }
//     }, json, {
//       withCredentials: true,
//     });
//     return data;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// export const putAPI = async (url, json) => {
//   try {
//     const token = Cookies.getItem("authToken");
//     const { data } = await axios.put(BASE_URL + url, {
//       headers: {
//         'x-access-token': token,
//       }
//     }, json, {
//       withCredentials: true,
//     });
//     return data;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };
