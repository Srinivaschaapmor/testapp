import { axiosInstance } from "./logicService";
import { endPoints } from "./apiEndPoints";
import Toast from "react-native-toast-message";
export const RegisterUser = async (userDetails) => {
  try {
    console.log(userDetails);
    const response = await axiosInstance.post(
      endPoints.registerUser,
      // "http://localhost:7000/api/users/register",
      userDetails
    );
    return response;
  } catch (error) {
    console.error("Error raising request:", error);
    Toast.show({
      type: "error",
      text1: "Something Went Wrong",
    });
    throw error;
  }
};
export const Login = async (details) => {
  try {
    // console.log(userDetails);
    const response = await axiosInstance.post(
      endPoints.login,
      // "http://localhost:7000/api/users/register",
      details
    );
    return response;
  } catch (error) {
    console.error("Error raising request:", error);
    Toast.show({
      type: "error",
      text1: "Something Went Wrong",
    });
    throw error;
  }
};

export const GetAllInvestChits = async (userid) => {
  try {
    console.log(endPoints.getInvestChits);
    const response = await axiosInstance.get(
      `${endPoints.getInvestChits}/${userid}`
    );
    console.log(response);

    // await axios.get(`/api/chits/exclude-user/${profile?.userId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
