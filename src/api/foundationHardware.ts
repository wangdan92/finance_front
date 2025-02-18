import {baseDomain, request} from "@/utils/service"
const uploadAction=baseDomain+"api/services/app/FoundationHardware/UploadFoundationHardware"
export {uploadAction}

/**
 * ResetPasswordDto
 */

export interface QueryParams {
  DeviceName?: string
  softwareName?: string
}
/** 新增 */
export function createFoundationHardware(data:any) {
  return request({
    url: "/api/services/app/FoundationHardware/Create",
    method: "post",
    data: data
  })
}

export function getFoundationHardwareById(id: number) {
  return request({
    url: "api/services/app/FoundationHardware/GetAsyncById",
    method: "get",
    data: {
      id
    }
  })
}

/** 修改 */
export function updateFoundationHardware(data:any) {
  return request({
    url: "/api/services/app/FoundationHardware/Update",
    method: "put",
    data
  })
}

/** 列表 */
export function getListAll(data: QueryParams) {
  return request({
    url: "api/services/app/FoundationHardware/GetListAll",
    method: "get",
    data
  })
}
export function deleteFoundationHardware(id: number | undefined) {
  return request({
    url: "/api/services/app/FoundationHardware/Delete",
    method: "delete",
    data: {
      id
    }
  })
}
/** 导出 */
export function exportFoundationFixture(data:any) {
  return request({
    url: "/api/services/app/FoundationHardware/FoundationHardwareDownloadStream",
    method: "post",
    responseType:'blob',
    data: data
  })
}
