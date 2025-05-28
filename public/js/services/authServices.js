export const registerUser = async (body) => {
  try {
    const response = await axios.post("/users/register", body);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
