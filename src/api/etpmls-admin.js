import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v3/user/login',
    method: 'post',
    data
  })
}

export function UserGetCurrent(token) {
  return request({
    url: '/api/v3/user/getCurrent',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/v3/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/api/v3/user/register',
    method: 'post',
    data
  })
}

export function RoleCreate(data) {
  return request({
    url: '/api/v3/role/create',
    method: 'post',
    data
  })
}

export function RoleEdit(data) {
  return request({
    url: '/api/v3/role/edit',
    method: 'put',
    data
  })
}

export function RoleGetAll(param) {
  return request({
    url: '/api/v3/role/getAll',
    method: 'get',
    params: param
  })
}

export function RoleDelete(data) {
  return request({
    url: '/api/v3/role/delete',
    method: 'delete',
    data
  })
}

export function UserCreate(data) {
  return request({
    url: '/api/v3/user/create',
    method: 'post',
    data
  })
}

export function UserEdit(data) {
  return request({
    url: '/api/v3/user/edit',
    method: 'put',
    data
  })
}

export function UserGetAll(param) {
  return request({
    url: '/api/v3/user/getAll',
    method: 'get',
    params: param
  })
}

export function UserDelete(data) {
  return request({
    url: '/api/v3/user/delete',
    method: 'delete',
    data
  })
}

export function UserUpdateInformation(data) {
  return request({
    url: '/api/v3/user/updateInformation',
    method: 'put',
    data
  })
}

export function MenuGetAll() {
  return request({
    url: '/api/v3/menu/getAll',
    method: 'get'
  })
}

export function MenuCreate(data) {
  return request({
    url: '/api/v3/menu/create',
    method: 'post',
    data
  })
}

export function PermissionCreate(data) {
  return request({
    url: '/api/v3/permission/create',
    method: 'post',
    data
  })
}

export function PermissionEdit(data) {
  return request({
    url: '/api/v3/permission/edit',
    method: 'put',
    data
  })
}

export function PermissionGetAll(param) {
  return request({
    url: '/api/v3/permission/getAll',
    method: 'get',
    params: param
  })
}

export function PermissionDelete(data) {
  return request({
    url: '/api/v3/permission/delete',
    method: 'delete',
    data
  })
}

export function CaptchaGetOne() {
  return request({
    url: '/api/v3/captcha/getOne',
    method: 'get'
  })
}

/**
 * @return {string}
 */
export function CaptchaGetPicture(data) {
  return '/api/v3/captcha/getPicture/' + data + '.png'
}

/**
 * @return {string}
 */
export function AttachmentUploadImage() {
  return '/api/v3/attachment/uploadImage'
}

