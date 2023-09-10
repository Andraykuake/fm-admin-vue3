/**
 * sys_menu
 */
export interface SysMenu {
    create_by?: string;
    create_time?: string;
    icon: string;
    is_refresh?: string;
    menu_id?: number | string;
    menu_name: string;
    menu_type: string;
    order_num: number | string;
    parent_id: number | string;
    perms: number | string;
    remark?: string;
    target?: number | string;
    update_by?: number | string;
    update_time?: number | string;
    url: string;
    visible: string;
    children?: Array<SysMenu>
}

/**
 * sys_role
 */
export interface SysRole {
    create_by: string;
    create_time: string;
    data_scope: string;
    del_flag: string;
    remark: string;
    role_id: number;
    role_key: string;
    role_name: string;
    role_sort?: number;
    status?: string;
    update_by: string;
    update_time?: null;
}


/**
 * sys_user
 */
export interface SysUser {
    /**
     * 头像
     */
    avatar: string;
    /**
     * 创建人
     */
    create_by: string;
    /**
     * 创建时间
     */
    create_time: string;
    /**
     * 删除状态
     */
    del_flag: string;
    /**
     * 部门id
     */
    dept_id: number;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 最后登录日期
     */
    last_login_date: string;
    /**
     * 最后登录IP
     */
    last_login_ip: string;
    /**
     * 登录名
     */
    login_name: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 手机号码
     */
    phone_number: string;
    /**
     * 密码最后更新日期
     */
    pwd_last_update_date: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 盐
     */
    salt: string;
    /**
     * 性别
     */
    sex: string;
    /**
     * 状态
     */
    status: string;
    /**
     * 更新人
     */
    update_by: string;
    /**
     * 更新时间
     */
    update_time: null;
    /**
     * 用户id
     */
    user_id: number;
    /**
     * 用户名
     */
    user_name: string;
    /**
     * 用户类型
     */
    user_type: string;
}

