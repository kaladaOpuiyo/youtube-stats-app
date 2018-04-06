
class youtube {

  static request(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((json) => resolve(json.json()))
        .catch((xhr, status, err) => reject(status + err.message));
    });
  }
}

export default youtube;
