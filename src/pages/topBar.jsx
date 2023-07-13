import '../static/css/topbar.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// 定义 TopBar_lzx 组件
function TopBar_lzx(props) {
  // 从 props 中获取传入的 account 值
  const { account } = props

  // 定义一个 state 值 integral 和 useEffect 钩子函数，用于在接收到数据变化时重新渲染组件
  const [integral, setintegral] = useState()
  useEffect(() => {
    // 发送 POST 请求，获取用户积分信息
    axios
      .post('http://localhost:8080/controllers/PointsAcquistiom', {
        account: account,
      })
      .then((response) => {
        // 从响应中获取积分信息
        const msg = response.data.integral
        // 更新 integral 的值
        setintegral(msg)
      })
      .catch((error) => {
        alert(error.data.message)
      })
  }, [])

  // 返回包含 logo、账户和积分信息的 JSX 元素
  return (
    <div className="shell">
      <div className="shell-main">
        <div className="shell-main-nav">
          <div className="logo">
            <span>考试管理系统</span>
          </div>
          <div style={{ textAlign: 'right' }} className="account">
            <span>
              用户：{account} 积分：{integral}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 将 TopBar_lzx 组件导出
export default TopBar_lzx
