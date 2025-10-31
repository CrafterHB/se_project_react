class Api {
  constructor() {
    this.baseURL = "http://localhost:3001";
  }

  setClothingItems() {
    return fetch(`${this.baseURL}/items`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch((error) => console.log(error));
  }

  addItem(itemData) {
    return fetch(`${this.baseURL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(`Server error: ${res.status}`));
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  deleteItem(itemData) {
    const itemId = itemData._id;
    return fetch(`${this.baseURL}/items/${itemId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(new Error(`Server error: ${res.status}`));
      }
    });
  }
}

export default Api;
