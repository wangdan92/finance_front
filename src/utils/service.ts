import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { useUserStoreHook } from "@/store/modules/user"
import { ElMessage } from "element-plus"
import { get } from "lodash-es"
import { getToken } from "@/utils/cookies"
import { ElLoading } from "element-plus"
export const baseDomain=import.meta.env.VITE_BASE_API
/** 创建请求实例 */
function createService() {
  // 创建一个 axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 api 返回的数据
      const apiData = response.data as any
      // 这个 code 是和后端约定的业务 code
      // const code = apiData.code
      // 如果没有 code, 代表这不是项目后端开发的 api
      // if (code === undefined) {
      //   ElMessage.error("非本系统的接口")
      //   return Promise.reject(new Error("非本系统的接口"))
      // } else {
      //   switch (code) {
      //     case 0:
      //       // code === 0 代表没有错误
      //       return apiData
      //     case 20000:
      //       // code === 20000 代表没有错误
      //       return apiData
      //     default:
      //       // 不是正确的 code
      //       ElMessage.error(apiData.msg || "Error")
      //       return Promise.reject(new Error("Error"))
      //   }
      // }
      const { result } = apiData
      // 默认格式先加上
      const error = apiData.error
      if (result?.isSuccess === false && result?.message) {
        // 后端定制错误格式
        ElMessage.error(result.message)
        return Promise.reject(new Error(error))
      }

      if (error && !apiData.success) {
        console.log(error, "responseError")
        ElMessage.error(error)
        return Promise.reject(new Error(error))
      }
      return apiData
    },
    (error) => {
      // status 是 HTTP 状态码
      const status = get(error, "response.status")
      console.log(status, error, "error@@@@")
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          error.message = "未授权，请登录"
          useUserStoreHook().logout()
          // location.reload()
          break
        case 403:
          // token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
          useUserStoreHook().logout()
          location.reload()
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP版本不受支持"
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
  let loadingInstance: any = null
  return function (config: AxiosRequestConfig) {
    const configDefault = {
      headers: {
        // 携带 token
        Authorization: "Bearer " + getToken(),
        "Content-Type": get(config, "headers.Content-Type", "application/json")
      },
      timeout: 300000,
      baseURL: import.meta.env.VITE_BASE_API,   //import.meta.env.VITE_BASE_API,
      data: {},
      onDownloadProgress: function (progressEvent: any) {
        // 对原生进度事件的处理
        if (config.responseType === "blob") {
          if (!loadingInstance) {
            loadingInstance = ElLoading.service({
              fullscreen: true,
              text: "下载中"
            })
          }
          console.log(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2) + "%")
          if (((progressEvent.loaded / progressEvent.total) * 100).toFixed(2) === "100.00") {
            loadingInstance.close()
            loadingInstance = null
          }
        }
      }
      // onUploadProgress: function (progressEvent: any) {
      //   const loadingInstance = ElLoading.service({
      //     fullscreen: true,
      //     text: "加载中"
      //   })
      //   console.log(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2) + "%")
      //   if (((progressEvent.loaded / progressEvent.total) * 100).toFixed(2) === "100.00") {
      //     loadingInstance.close()
      //   }
      // }
    }
    if (config.method === "get" || config.method === "delete") {
      config.params = Object.assign({}, config.data)
      delete config.data
    }
    return service(Object.assign(configDefault, config))
  }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)
