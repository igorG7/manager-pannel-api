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

export const createProduct = async (body) => {
  try {
    const response = await axios.post("/products", body);
    const data = response.data;
    return data;
  } catch (error) {
    const data = error.response.data;
    return data;
  }
};

export const updateProduct = async (id, body) => {
  try {
    const response = await axios.put(`/products/${id}`, body);
    const data = response.data;
    return data;
  } catch (error) {
    const data = error.response.data;
    return data;
  }
};

export const getById = async (id) => {
  try {
    const res = await axios.get(`/product-id/${id}`);
    const data = res.data;

    return data.product;
  } catch (error) {
    console.log(error);
  }
};
