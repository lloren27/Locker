const SneakerServices = {
  getSneackers: async () => {
    const response = await fetch('http://localhost:8082/sneakers');
    const json = await response.json();
    return json;
  },
  createSneaker: async (data) => {
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
  deleteSneaker: async (sneakerId) => {
    const response = await fetch(
      `http://localhost:8082/deleteSneaker/${sneakerId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await response.json();
    return json;
  },
};

export default SneakerServices;
