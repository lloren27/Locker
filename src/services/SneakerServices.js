const SneakerServices = {
  getSneackers: async () => {
    // introduccir en el fetch la url de la api
    const response = await fetch('http://localhost:8082/sneakers');
    const json = await response.json();
    return json;
  },
  createSneaker: async (data) => {
    // introduccir en el fetch la url de la api
    const response = await fetch('http://localhost:8082/sneaker', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json;
  },
};

export default SneakerServices;
