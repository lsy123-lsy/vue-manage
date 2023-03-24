import fetch from '../config/fetch'

/**
 * 登录
 */
export const login = data => fetch('admin/login',data,'POST')

/* 退出 */
export const signout = () => fetch('/admin/signout')

/**
 * 获取用户信息
 */
export const getAdminInfo = () => fetch('admin/info')

/* 用户注册量 */
export const userCount = date => fetch('/statis/user'+ date +'/count')

/* 某一天订单数量 */
export const orderCount =date => fetch('/statis/order/' + date + '/count')

/* 某一天管理员注册量 */
export const adminDayCount = data => fetch('admin/all',data)

/* 管理员数量 */
export const adminCount = ()=> fetch('/admin/count')

/* 获取用户数量 */
export const getUserCount = data => fetch('/v1/users/count',data)

/* 获取订单数量 */
export const getOrederCOunt = data => fetch('/bos/orders/count',data)

/* 获取用户列表 */
export const getUserList = data => fetch('/v1/users/list',data)