export const registerUser = async (body) => {
  try {
    const response = await axios.post("/users/register", body);
    return response.data;
  } catch (error) {
    const data = error.response.data;
    return data;
  }
};
