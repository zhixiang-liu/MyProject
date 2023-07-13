import { useState } from 'react'
import styles from '../static/css/login.module.css'
import '../static/css/login.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Register_lzx() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [rPassword, setRpassword] = useState('')
  function handleRegister() {
    axios
      .post('http://localhost:8080/controllers/register', {
        account: account,
        password: password,
        rPassword: rPassword,
      })
      .then((Response) => {
        console.log(Response.data.message)
        alert(Response.data.message)
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }
  return (
    <div className={styles.all}>
      <div className={styles.register}>
        <div className={styles.box}>
          <p className={styles.table}>register</p>
          <input
            id="Raccount"
            type="text"
            placeholder="账号   (1-20个字符)"
            value={account}
            onChange={(e) => setAccount(e.target.value)}></input>
          <input
            id="Rpassword"
            type="password"
            placeholder="密码   (6-20个字符)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
          <input
            id="Rrpassword"
            type="password"
            placeholder="重复密码"
            value={rPassword}
            onChange={(e) => setRpassword(e.target.value)}></input>
          <button className={styles.go} onClick={handleRegister}>
            register
          </button>
          <Link to="/login" className={styles.go1}>
            to login
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Register_lzx
