/**
 * sys_menu
 */
export interface SysMenu {
    createBy?: string;
    createTime?: string;
    icon: string;
    isRefresh?: string;
    menuId?: number | string;
    menuName: string;
    menuType: string;
    orderNum: number | string;
    parentId: number | string;
    perms: number | string;
    remark?: string;
    target?: number | string;
    updateBy?: number | string;
    updateTime?: number | string;
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
    update_by?: string;
    update_time?: null;
}


/**
 * sys_user
 */
export interface SysUser {
    avatar?: string;
    createBy?: string;
    createTime?: Date | string;
    delFlag: string;
    deptId?: number | string;
    email?: string;
    lastLoginDate?: Date | string;
    lastLoginIp?: string;
    loginName: string;
    password: string;
    phoneNumber: string;
    pwdLastUpdateDate?: Date | string;
    remark?: string;
    salt: string;
    sex: string;
    status: string;
    updateBy?: string;
    updateTime?: Date | string;
    userId?: number | string;
    userName: string;
    userType: string;
}

