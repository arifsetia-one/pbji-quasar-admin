import { api } from "src/boot/axios";

export async function login(data) {
  try {
    const response = await api.post("/v1/admin/auth/login", data);
    return response?.data;
  } catch (err) {
    return err?.response;
  }
}

export async function getProfile() {
  try {
    const response = await api.get("/v1/admin/auth/profile");
    return response?.data;
  } catch (err) {
    return err?.response;
  }
}

export async function getPresence() {
  try {
    const response = await api.get("/v1/admin/atlet");
    return response?.data;
  } catch (err) {
    return err?.response;
  }
}

export async function getListUser() {
  try {
    const response = await api.get("/v1/admin/user");
    return response?.data;
  } catch (err) {
    return err?.response;
  }
}

export async function presence(data) {
  try {
    const response = await api.post("/v1/admin/atlet/presence", data);
    return response?.data;
  } catch (err) {
    return err?.response;
  }
}

export async function addUser(data) {
  try {
    const response = await api.post("v1/admin/user", data);
    return response?.data;
  } catch (err) {
    return err?.response;
  }
}
