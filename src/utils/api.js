class Api {
  constructor() {
    this.baseURL =
      process.env.NODE_ENV === "production"
        ? "https://api.crafterhb.crabdance.com"
        : "http://localhost:3001";
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
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(new Error(`Server error: ${res.status}`));
      }
    });
  }

  likeItem(itemData, user) {
    const itemId = itemData._id;
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/items/${itemId}/likes/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(new Error(`Server error: ${res.status}`));
      }
    });
  }

  unlikeItem(itemData, user) {
    const itemId = itemData._id;
    const token = localStorage.getItem("jwt");
    return fetch(`${this.baseURL}/items/${itemId}/likes/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
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
