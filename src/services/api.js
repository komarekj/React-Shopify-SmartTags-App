const API_URL = process.env.REACT_APP_API_URL;

/**
 * Post Request Helper
 */
const apiCall = async (path, body) => {
  const url = `${API_URL}/${path}`;
  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const rawResponse = await fetch(url, request);
  const { status } = rawResponse;

  const content = await rawResponse.json();
  const { data } = content;

  if (status !== 200) {
    throw new Error(`${status} - ${data.msg}`);
  }

  return data;
};


/**
 * API Calls
 */
const list = async (page, tokenHash) => (
  apiCall('list', { page, tokenHash })
);

const get = async (_id, tokenHash) => (
  apiCall('get', { _id, tokenHash })
);

const create = async (data, tokenHash) => (
  apiCall('create', { ...data, tokenHash })
);

const update = async (_id, data, tokenHash) => (
  apiCall('update', { ...data, _id, tokenHash })
);

const remove = async (_id, tokenHash) => (
  apiCall('remove', { _id, tokenHash })
);

const getInstallUrl = async (storeUrl) => (
  apiCall('install-url', { storeUrl })
);

export default {
  list,
  get,
  create,
  update,
  remove,
  getInstallUrl,
};
