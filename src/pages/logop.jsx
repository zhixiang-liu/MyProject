import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import Web3 from 'web3'
import CryptoJS from 'crypto-js'
const LogInfo_lzx = (props) => {
  const { contract } = props
  //表格头
  const columns = [
    {
      title: '序号',
      dataIndex: 'ID',
      align: 'center',
    },
    {
      title: '操作名',
      dataIndex: 'opname',
      align: 'center',
    },
    {
      title: '操作用户',
      dataIndex: 'opuser',
      align: 'center',
    },
    {
      title: '操作时间',
      dataIndex: 'optime',
      align: 'center',
    },
    {
      title: 'hash值',
      dataIndex: 'hash',
      align: 'center',
    },
    {
      title: '操作真实性',
      dataIndex: 'hashvalue',
      align: 'center',
      render: (_, record) => (
        <HashValue id={record.ID - 1} localhash={record.hash} />
      ),
    },
  ]
  const [data, setData] = useState([])

  // 从智能合约中获取指定 ID 的哈希值
  async function getHashToContract(id) {
    const hash = await contract.methods.hashArray(id).call()
    return hash
  }

  // HashValue 组件用于渲染操作真实性列
  function HashValue({ id, localhash }) {
    const [hashValue, setHashValue] = useState(null)

    useEffect(() => {
      async function fetchData() {
        const hash = await getHashToContract(id)
        console.log(hash)
        console.log(localhash)
        // 使用恒定时间字符串比较方法
        const isHashMatched =
          CryptoJS.SHA256(hash).toString() ===
          CryptoJS.SHA256(localhash).toString()
        setHashValue(isHashMatched ? 'true' : 'false')
      }
      fetchData()
    }, [id, localhash])

    return <span>{hashValue ?? '-'}</span>
  }

  //刷新组件
  const fetchData = () => {
    // 发送 post 请求，并将响应数据存储在 data 中
    axios
      .post('http://localhost:8080/controllers/LogInfo', {})
      .then((response) => {
        setData(response.data)
        console.log('数据已更新')
      })
      .catch((error) => console.error(error))
  }

  // 组件挂载时触发以刷新组件
  useEffect(() => {
    fetchData()
  }, [])
  //
  const [metamaskAccount, setMetamaskAccount] = useState()
  console.log('metamaskAccount:', metamaskAccount)
  //获取当前账号
  useEffect(() => {
    async function loadMetamaskAccount() {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum)
          const accounts = await web3.eth.getAccounts()
          setMetamaskAccount(accounts[0])

          window.ethereum.on('accountsChanged', handleAccountsChanged)
        } catch (error) {
          console.error('Failed to load Metamask account', error)
        }
      } else {
        console.error('Please install Metamask')
      }
    }
    function handleAccountsChanged(accounts) {
      setMetamaskAccount(accounts[0])
    }
    loadMetamaskAccount()
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])
  return (
    <>
      <br />
      <Table
        columns={columns}
        dataSource={data}
        rowKey="ID"
        pagination={{
          pageSize: 7, // 每页显示 10 条数据
          style: {
            display: 'flex',
            justifyContent: 'center',
          },
        }}
      />
    </>
  )
}

export default LogInfo_lzx
