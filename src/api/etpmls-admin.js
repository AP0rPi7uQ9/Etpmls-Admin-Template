import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v2/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/v2/user/getCurrent',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/v2/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/api/v2/user/register',
    method: 'post',
    data
  })
}

export function RoleCreate(data) {
  return request({
    url: '/api/v2/role/create',
    method: 'post',
    data
  })
}

export function RoleEdit(data) {
  return request({
    url: '/api/v2/role/edit',
    method: 'put',
    data
  })
}

export function RoleGetAll() {
  return request({
    url: '/api/v2/role/getAll',
    method: 'get'
  })
}

export function RoleDelete(data) {
  return request({
    url: '/api/v2/role/delete',
    method: 'delete',
    data
  })
}

export function UserCreate(data) {
  return request({
    url: '/api/v2/user/create',
    method: 'post',
    data
  })
}

export function UserEdit(data) {
  return request({
    url: '/api/v2/user/edit',
    method: 'put',
    data
  })
}

export function UserGetAll() {
  return request({
    url: '/api/v2/user/getAll',
    method: 'get'
  })
}

export function UserDelete(data) {
  return request({
    url: '/api/v2/user/delete',
    method: 'delete',
    data
  })
}

export function MenuCreate(data) {
  return request({
    url: '/api/v2/menu/create',
    method: 'post',
    data
  })
}

export function PermissionCreate(data) {
  return request({
    url: '/api/v2/permission/create',
    method: 'post',
    data
  })
}

export function PermissionEdit(data) {
  return request({
    url: '/api/v2/permission/edit',
    method: 'put',
    data
  })
}

export function PermissionGetAll() {
  return request({
    url: '/api/v2/permission/getAll',
    method: 'get'
  })
}

export function PermissionDelete(data) {
  return request({
    url: '/api/v2/permission/delete',
    method: 'delete',
    data
  })
}

export function CaptchaGetOne() {
  return request({
    url: '/api/v2/captcha/getOne',
    method: 'get'
  })
}
