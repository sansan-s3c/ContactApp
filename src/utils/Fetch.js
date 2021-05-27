import {BASE_URL} from '../config/Constans';

const get = async endpoint => {
  const URL = BASE_URL + endpoint;
  console.log(URL);
  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status == 200) {
          const data = res.json();
          resolve(data);
        } else {
          reject(res.status);
        }
      })
      .catch(err => {
        alert(err.message);
        reject(err.message);
      });
  });
};

const post = async (endpoint, payload) => {
  const URL = BASE_URL + endpoint;
  console.log(URL);
  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    })
      .then(res => {
        if (res.status == 201) {
          resolve('Success!');
        } else {
          reject(res.status);
        }
      })
      .catch(err => {
        reject(err.message);
      });
  });
};

const put = async (endpoint, payload) => {
  const URL = BASE_URL + endpoint;
  console.log(URL);
  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    })
      .then(res => {
        if (res.status == 201) {
          resolve('Success!');
        } else {
          reject(res.status);
        }
      })
      .catch(err => {
        reject(err.message);
      });
  });
};

const del = async endpoint => {
  const URL = BASE_URL + endpoint;
  console.log(URL);
  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        // if (res.status == 200) {
        //   const data = res.json();
        //   resolve(data);
        // } else {
        //   reject(res.status);
        // }
        console.log(res)
      })
      .catch(err => {
        alert(err.message);
        reject(err.message);
      });
  });
};

export default {
  get,
  post,
  put,
  del,
};
