import { Table } from 'antd'
import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import moment from 'moment'
import axios from 'axios'
import AddTest_lzx from './addTest'
import Modify_lzx from './modify'
import CryptoJS from 'crypto-js'
import Web3 from 'web3'
//试题管理组件
function Testmanage_lzx(props) {
  const { account, contract } = props

  //定义data用以接受后端返回数据
  const [data, setData] = useState([])
  //表格表头设置
  const columns = [
    {
      title: '序号',
      dataIndex: 'ID',
      align: 'center',
      width: 40,
    },
    {
      title: '题目',
      dataIndex: 'topic',
      align: 'center',
      width: 60,
    },
    {
      title: '班级',
      dataIndex: 'class',
      align: 'center',
      width: 40,
    },
    {
      title: '分值',
      dataIndex: 'score',
      align: 'center',
      width: 40,
    },
    {
      title: '题目类型',
      dataIndex: 'questiontype',
      align: 'center',
      width: 60,
    },
    {
      title: '难度系数',
      dataIndex: 'difficulty',
      align: 'center',
      width: 60,
    },
    {
      title: '出题人',
      dataIndex: 'author',
      align: 'center',
      width: 40,
    },
    {
      title: '答案',
      dataIndex: 'answer',
      align: 'center',
      width: 50,
    },
    {
      title: '时间',
      dataIndex: 'updated_at',
      align: 'center',
      width: 120,
      sorter: (a, b) => moment(a.updated_at).diff(moment(b.updated_at)),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      width: 100,
      //render:(text,record) 其中text是当前单元格的数据 record是当前的数据
      render: (_, record) => (
        <>
          <Button type="primary" onClick={(e) => handleModifynClick(e, record)}>
            编辑
          </Button>
          <Button type="danger" onClick={() => handleDelete(record)}>
            删除
          </Button>
        </>
      ),
    },
  ]
  //删除
  const handleDelete = (record) => {
    axios
      .post('http://localhost:8080/controllers/delete', { id: record.ID })
      .then((response) => {
        alert(response.data.message)
        fetchData()
        const op = '删除'
        oprecords(op, timestamp)
        return
      })
      .catch((error) => {
        alert(error.data.message)
        return
      })
    console.log('删除:', record)
  }
  //批量删除
  const batchDelete = (selectedRowKeys) => {
    selectedRowKeys = Object.values(selectedRowKeys)
    axios
      .post('http://localhost:8080/controllers/batchDelete', {
        ids: selectedRowKeys,
      })
      .then((response) => {
        alert(response.data.message)
        fetchData()
        const op = '批量删除'
        oprecords(op, timestamp)
        return
      })
      .catch((error) => {
        alert(error.data.message)
        return
      })
  }
  //控制Aab(新增)组件是否显示
  const [showAab, setShowAab] = useState(false)
  const handleButtonClick = () => {
    setShowAab(true)
  }
  const handleDialogClose = () => {
    setShowAab(false)
  }
  //控制Modify(修改)组件是否显示
  const [showModify, setShowModify] = useState(false)
  //获取当行数据
  const [modifyRecord, setModifyRecord] = useState(null)
  const handleModifynClick = (e, record) => {
    e.stopPropagation() //阻止重复调用
    setModifyRecord(record)
    setShowModify(true)
  }
  const handleModifyClose = () => {
    setShowModify(false)
  }
  //搜索
  const [searchstr, setSearchstr] = useState('')
  const handleSearchClick = () => {
    axios
      .post('http://localhost:8080/controllers/Search', { keyWord: searchstr })
      .then((response) => {
        setData(response.data)
        if (response.data.length > 0) {
          alert('搜索成功')
        } else {
          alert('没有找到匹配的记录')
        }
        const op = '搜索'
        oprecords(op, timestamp)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  //操作记录
  const [hashedStr, sethashedStr] = useState('')
  const timestamp = Date.now()
  const oprecords = (op, timestamp) => {
    const str = op + account + timestamp
    const hashedStr = CryptoJS.SHA256(str).toString()
    sethashedStr(hashedStr)

    axios
      .post('http://localhost:8080/controllers/OpRecord', {
        opName: op,
        opUser: account,
        opHash: hashedStr,
      })
      .then((response) => {})
      .catch((error) => {})
  }
  //将操作哈希记录在合约中
  // const [metamaskAccount, setMetamaskAccount] = useState()
  //获取当前账号
  // useEffect(() => {
  //   async function loadMetamaskAccount() {
  //     if (window.ethereum) {
  //       try {
  //         const web3 = new Web3(window.ethereum)
  //         const accounts = await web3.eth.getAccounts()
  //         setMetamaskAccount(accounts[0])

  //         window.ethereum.on('accountsChanged', handleAccountsChanged)
  //       } catch (error) {
  //         console.error('Failed to load Metamask account', error)
  //       }
  //     } else {
  //       console.error('Please install Metamask')
  //     }
  //   }
  //   function handleAccountsChanged(accounts) {
  //     setMetamaskAccount(accounts[0])
  //   }
  //   loadMetamaskAccount()
  //   return () => {
  //     // window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
  //   }
  // }, [])
  //向区块链发送操作哈希值
  // useEffect(() => {
  //   async function addHash() {
  //     if (hashedStr !== '') {
  //       await contract.methods
  //         .addHash(hashedStr)
  //         .send({
  //           from: metamaskAccount,
  //           gasPrice: '200000000000',
  //           gas: '5000000',
  //         })
  //         .then((require) => {
  //           console.log('ssssss', require)
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //         })
  //     }
  //   }
  //   addHash()
  // }, [hashedStr])

  //刷新组件
  const fetchData = () => {
    // 发送 post 请求，并将响应数据存储在 data 中
    axios
      .post('http://localhost:8080/controllers/testManageMsg')
      .then((response) => {
        // 将响应数据转换成数组并存储到 data 中
        setData(response.data, () => {
          console.log('数据已更新')
        })
      })
      .catch((error) => console.error(error))
  }
  //渲染组件时请求表格数据
  useEffect(() => {
    fetchData()
  }, [setData]) // 注意：第二个参数若不是空数组，容易出现数据更新后重复调用

  //选中状态管理
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const onSelectChange = (newSelectedRowKeys) => {
    // 在控制台输出选中行变化的信息
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    // 更新 selectedRowKeys 状态值
    setSelectedRowKeys(newSelectedRowKeys)
  }
  //全选类型实现
  const rowSelection = {
    // 记录选中的行 key
    selectedRowKeys,
    // 选中行变化的回调函数
    onChange: onSelectChange,
    // 选择器数组，包括内置和自定义的选择器
    selections: [
      Table.SELECTION_ALL, // 全选选择器
      Table.SELECTION_INVERT, // 反选选择器
      Table.SELECTION_NONE, // 全不选选择器
      {
        // 自定义选择器：选择奇数行
        key: 'odd',
        text: 'Select Odd Row', // 选择器文本
        onSelect: (changeableRowKeys) => {
          // 点击该选择器时触发的回调函数
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              // 过滤出奇数行
              return false
            }
            return true
          })
          setSelectedRowKeys(newSelectedRowKeys) // 更新选中的行 key 值
        },
      },
      {
        // 自定义选择器：选择偶数行
        key: 'even',
        text: 'Select Even Row', // 选择器文本
        onSelect: (changeableRowKeys) => {
          // 点击该选择器时触发的回调函数
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              // 过滤出偶数行
              return true
            }
            return false
          })
          setSelectedRowKeys(newSelectedRowKeys) // 更新选中的行 key 值
        },
      },
    ],
  }

  return (
    <>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div
          style={{
            position: 'relative',
            left: '-26%',
            display: 'inline-block',
          }}>
          <Button type="primary" onClick={() => batchDelete(selectedRowKeys)}>
            批量删除
          </Button>
        </div>
        <Input
          placeholder=""
          value={searchstr}
          onChange={(e) => setSearchstr(e.target.value)}
          style={{
            width: '300px',
          }}
        />

        <Button
          type="primary"
          onClick={() => handleSearchClick({ searchstr: searchstr })}>
          查询
        </Button>
        <Button type="primary" onClick={handleButtonClick}>
          新增
        </Button>
        {showAab && (
          <AddTest_lzx
            onClose={handleDialogClose}
            fetchData={fetchData}
            account={account}
            oprecords={oprecords}
            timestamp={timestamp}
          />
        )}
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowKey="ID"
          pagination={{
            pageSize: 8, // 每页显示8 条数据
            style: {
              display: 'flex',
              justifyContent: 'center',
            },
            showSizeChanger: true, // 显示每页显示多少条数据的选项
            total: data.length, // 数据总条数
          }}
        />
      </div>

      {/* 修改组件 */}
      {showModify && (
        <Modify_lzx
          onClose={handleModifyClose}
          fetchData={fetchData}
          record={modifyRecord}
          oprecords={oprecords}
          timestamp={timestamp}
        />
      )}
    </>
  )
}

export default Testmanage_lzx
