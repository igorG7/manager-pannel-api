export const verifyMinEntry = (data: any) => {
  const keys = Object.keys(data);

  if (!keys.length) throw new Error("Nenhuma informação foi recebida.");
};
