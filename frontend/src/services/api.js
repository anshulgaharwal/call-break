const API_URL = "http://localhost:5000/api";

// login
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

//create room
export const create = async (password) => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Room cannot be created try again later");
  }
  return data;
};

// join ROOM
export const join = async (roomId) => {
  const res = await fetch(`${API_URL}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomId,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.message || "Unable to join Room please try again later",
    );
  }
  return data;
};

// register
export const register = async (name, username, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      username,
      email,
      password,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Register failed");
  }
  return data;
};

// get user
export const getUser = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Get user failed");
  }
  return data;
};
