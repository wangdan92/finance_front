import { request } from "@/utils/service"
export const baseURL="https://localhost:44311/"



/**
 * foundationReliable
 */
export interface foundationProcedure {
  /**
   * 工装名称
   */
  installationName: string
  /**
   * 名称
   */
  processName: string

  /**
   * 工序名称
   */
  installationSupplier: string
  /**
   * 工装单价
   */
  installationPrice: number
  /**
   * 工序单价
   */
  processNumber: number
  /**
   * 测试线名称
   */
  testName: string

  /**
   * 测试单价
   */
  TestPrice: number
}

/**
 * UserDto
 */
export interface foundationProcedureDto {
  /**
   * 工装名称
   */
  installationName?: String
}

/**
 * ResetPasswordDto
 */

export interface QueryParams {
  InstallationName?: string
}
/** 新增 */
export function createFoundationProcedure(data:any) {
  return request({
    url: "/api/services/app/FoundationProcedure/Create",
    method: "post",
    data: data
  })
}

// 查询岗位详细
export function getFoundationProcedureById(id: number) {
  return request({
    url: "api/services/app/FoundationProcedure/GetAsyncById",
    method: "get",
    data: {
      id
    }
  })
}

/** 修改 */
export function updateFoundationProcedure(data:any) {
  return request({
    url: "/api/services/app/FoundationProcedure/Update",
    method: "put",
    data
  })
}

/** 列表 */
export function getListAll(data: QueryParams) {
  return request({
    url: "api/services/app/FoundationProcedure/GetListAll",
    method: "get",
    data
  })
}
export function deleteFoundationProcedure(id: number | undefined) {
  return request({
    url: "/api/services/app/FoundationProcedure/Delete",
    method: "delete",
    data: {
      id
    }
  })
}

//获取日志
export function getLog(data:any){
  return request({
    url: "/api/services/app/FoundationLogs/GetListAll",
    method: "get",
    data
  })
}

//保存日志
export function saveOptionLog(data:any){
  return request({
    url: "/api/services/app/FoundationLogs/update",
    method: "put",
    data
  })
}


/** 导出 */
export function exportWorkClothes(data:any) {
  return request({
    url: "/api/services/app/FoundationProcedure/FoundationProcedureDownloadStream",
    method: "post",
    responseType:'blob',
    data: data
  })
}
