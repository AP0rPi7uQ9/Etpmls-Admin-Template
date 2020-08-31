import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function UserGetCurrent(token) {
  return request({
    url: '/user/getCurrent',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function RoleCreate(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
  })
}

export function RoleEdit(data) {
  return request({
    url: '/role/edit',
    method: 'put',
    data
  })
}

export function RoleGetAll(param) {
  return request({
    url: '/role/getAll',
    method: 'get',
    params: param
  })
}

export function RoleDelete(data) {
  return request({
    url: '/role/delete',
    method: 'delete',
    data
  })
}

export function UserCreate(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function UserEdit(data) {
  return request({
    url: '/user/edit',
    method: 'put',
    data
  })
}

export function UserGetAll(param) {
  return request({
    url: '/user/getAll',
    method: 'get',
    params: param
  })
}

export function UserDelete(data) {
  return request({
    url: '/user/delete',
    method: 'delete',
    data
  })
}

export function UserUpdateInformation(data) {
  return request({
    url: '/user/updateInformation',
    method: 'put',
    data
  })
}

export function MenuGetAll() {
  return request({
    url: '/menu/getAll',
    method: 'get'
  })
}

export function MenuCreate(data) {
  return request({
    url: '/menu/create',
    method: 'post',
    data
  })
}

export function PermissionCreate(data) {
  return request({
    url: '/permission/create',
    method: 'post',
    data
  })
}

export function PermissionEdit(data) {
  return request({
    url: '/permission/edit',
    method: 'put',
    data
  })
}

export function PermissionGetAll(param) {
  return request({
    url: '/permission/getAll',
    method: 'get',
    params: param
  })
}

export function PermissionDelete(data) {
  return request({
    url: '/permission/delete',
    method: 'delete',
    data
  })
}

export function CaptchaGetOne() {
  return request({
    url: '/captcha/getOne',
    method: 'get'
  })
}
