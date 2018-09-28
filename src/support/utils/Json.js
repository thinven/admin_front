const Json = {
  parse: json => {
    try {
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }
};

export default Json;
