import { get, post, put, del } from '@/config/http.config'

import { ArticleCategory } from '@/types/models'

export function deleteArticleCategoryById(id: number) {
	return del('/category/delete', { data: { id } })
}

export function queryArticleCategoryList(data: any = {}) {
	return get('/category/list', { params: data })
}

export function queryArticleCategoryById(data: any) {
	return get('/category/single', data)
}

export function queryArticleCategoryByRoleId(data: any) {
	return get('/category/listByRoleId', data)
}

export function addArticleCategory(data: ArticleCategory) {
	return post('/category/add', data)
}

export function updateArticleCategory(data: ArticleCategory) {
	return put('/category/update', data)
}
