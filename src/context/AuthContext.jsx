import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://api.crafterhb.crabdance.com"
      : "http://localhost:3001";

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("jwt");
      if (storedToken) {
        try {
          const response = await fetch(`${API_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setToken(storedToken);
          } else {
            localStorage.removeItem("jwt");
            setToken(null);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("jwt");
          setToken(null);
        }
      }
    };

    verifyToken();
  }, [token]);

  const register = async (username, email, password, avatar) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password, avatar }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem("jwt", token);
        return { success: true, data, token };
      }

      return { success: false, message: data.message || "Registration failed" };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Network error occurred" };
    }
  };

  const login = async (identifier, password) => {
    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, password }),
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token || (data.data && data.data.token);
        if (token) {
          localStorage.setItem("jwt", token);
          setToken(token);
        }
        return { success: true, data };
      }

      return { success: false, message: data.message || "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error occurred" };
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");

    setToken(null);
    setUser(null);

    navigate("/");
  };

  const edit = async (username, email, avatar) => {
    if (user != null) {
      try {
        const response = await fetch(`${API_URL}/${user._id}/me`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: username, email, avatar }),
        });

        const data = await response.json();
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error("User edit error:", error);
      }
    }
  };

  const value = { user, token, register, login, logout, edit };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
