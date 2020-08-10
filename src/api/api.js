import request from "@/utils/request";
import { encryptedData } from "@/utils/encrypt";
import { loginRSA } from "@/config/settings";

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: "/api/v2/user/login",
    method: "post",
    data,
  });
}

export function getUserInfo(accessToken) {
  return request({
    url: "/api/v2/user/getCurrent",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/api/v2/user/logout",
    method: "post",
  });
}

export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}

export function RoleCreate(data) {
  return request({
    url: "/api/v2/role/create",
    method: "post",
    data,
  });
}

export function RoleEdit(data) {
  return request({
    url: "/api/v2/role/edit",
    method: "put",
    data,
  });
}

export function RoleGetAll(params) {
  return request({
    url: "/api/v2/role/getAll",
    method: "get",
    params,
  });
}

export function RoleDelete(data) {
  return request({
    url: "/api/v2/role/delete",
    method: "delete",
    data,
  });
}

export function UserCreate(data) {
  return request({
    url: "/api/v2/user/create",
    method: "post",
    data,
  });
}

export function UserGetAll(params) {
  return request({
    url: "/api/v2/user/getAll",
    method: "get",
    params,
  });
}

export function UserEdit(data) {
  return request({
    url: "/api/v2/user/edit",
    method: "put",
    data,
  });
}

export function UserDelete(data) {
  return request({
    url: "/api/v2/user/delete",
    method: "delete",
    data,
  });
}

export function MenuCreate(data) {
  return request({
    url: "/api/v2/menu/create",
    method: "post",
    data,
  });
}

export function PermissionCreate(data) {
  return request({
    url: "/api/v2/permission/create",
    method: "post",
    data,
  });
}

export function PermissionGetAll(params) {
  return request({
    url: "/api/v2/permission/getAll",
    method: "get",
    params,
  });
}

export function PermissionEdit(data) {
  return request({
    url: "/api/v2/permission/edit",
    method: "put",
    data,
  });
}

export function PermissionDelete(data) {
  return request({
    url: "/api/v2/permission/delete",
    method: "delete",
    data,
  });
}

export function CaptchaGetOne() {
  return request({
    url: "/api/v2/captcha/getOne",
    method: "get",
  });
}
