import styles from '../static/css/login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login_lzx() {
  const [account, setAccount] = useState('') // 设置用户账号状态
  const [password, setPassword] = useState('') // 设置用户密码状态
  let navigate = useNavigate()

  function handleLogin() {
    axios
      .post('http://localhost:8080/controllers/login', {
        account: account,
        password: password,
      })
      .then((Response) => {
        alert(Response.data.message)
        if (Response.data.state === '200') {
          navigate(`/index?account=${account}`)
        }
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  return (
    <div className={styles.all}>
      <div className={styles.login}>
        <div className={styles.box}>
          <p className={styles.table}>Login</p>
          {/* 账号输入框 */}
          <input
            id="Laccount"
            type="text"
            placeholder="账号"
            value={account}
            onChange={(e) => setAccount(e.target.value)}></input>
          {/* 密码输入框 */}
          <input
            id="Lpassword"
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
          <button className={styles.go} onClick={handleLogin}>
            login
          </button>
          {/* 前往注册页面 */}
          <Link to="/register" className={styles.go1} id="toRegister">
            to register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login_lzx
