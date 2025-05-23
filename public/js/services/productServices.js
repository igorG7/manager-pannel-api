export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/products/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    const data = error.response.data;
    return data;
  }
};
