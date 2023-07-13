import { Modal, Input } from 'antd'
import { useState } from 'react'
import React, { useEffect } from 'react'
import axios from 'axios'

// 定义 AddTest_lzx 组件
const AddTest_lzx = ({ onClose, fetchData, account, oprecords, timestamp }) => {
  // 使用 useState 钩子来定义组件的状态
  const [count, setCount] = useState(0) // 用于控制 useEffect 的执行

  // useEffect 钩子用于在组件渲染后进行数据请求等操作
  useEffect(() => {
    fetchData() // 执行传入的 fetchData 函数
    console.log(`The count is ${count}`) // 打印当前 count 的值
  }, [count]) // 当 count 发生改变时才会执行 useEffect 钩子

  // 使用 useState 钩子来定义组件的状态
  const [title, setTitle] = useState('') // 题目
  const [classValue, setClassValue] = useState('') // 班级
  const [score, setScore] = useState('') // 分数
  const [type, setType] = useState('') // 题目类型
  const [difficulty, setDifficulty] = useState('') // 难度系数
  const [answer, setAnswer] = useState('') // 答案

  // 处理保存按钮的点击事件
  const handleSaveClick = () => {
    // 发送 post 请求来新增题目
    axios
      .post('http://localhost:8080/controllers/addTest', {
        topic: title,
        class: classValue,
        score: score,
        questiontype: type,
        difficulty: difficulty,
        answer: answer,
        author: account,
      })
      .then((response) => {
        setCount(count + 1) // 将 count 的值加 1，以触发 useEffect 钩子的执行
        fetchData() // 执行传入的 fetchData 函数
        const op = '新增'
        oprecords(op, timestamp) // 记录操作日志
        alert('新增成功') // 弹出提示框
        return
      })
      .catch((error) => {
        alert('新增失败') // 发生错误时弹出提示框
        return
      })
    onClose() // 关闭对话框
  }

  // 处理取消按钮的点击事件
  const handleCancelClick = () => {
    onClose() // 关闭对话框
  }

  // 渲染组件
  return (
    <>
      <Modal
        title="新增"
        open={true}
        onOk={handleSaveClick}
        onCancel={handleCancelClick}>
        <div>
          题 目:
          <Input
            id="title"
            placeholder=""
            defaultValue="默认题目"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '300px',
              marginTop: '20px',
            }}
          />
          <br />
        </div>
        <div>
          班 级：
          <Input
            id="classValue"
            placeholder=""
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
            style={{
              width: '300px',
              marginTop: '20px',
            }}
          />
          <br />
        </div>
        <div>
          分 值：
          <Input
            id="score"
            placeholder=""
            value={score}
            onChange={(e) => setScore(e.target.value)}
            style={{
              width: '300px',
              marginTop: '20px',
            }}
          />
          <br />
        </div>
        <div>
          题目类型：
          <Input
            id="type"
            placeholder=""
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              width: '300px',
              marginTop: '20px',
            }}
          />
          <br />
        </div>
        <div>
          难度系数：
          <Input
            id="difficulty"
            placeholder=""
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{
              width: '300px',
              marginTop: '20px',
            }}
          />
          <br />
        </div>
        <div>
          答 案：
          <Input
            id="answer"
            placeholder=""
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{
              width: '300px',
              marginTop: '20px',
            }}
          />
          <br />
        </div>
      </Modal>
    </>
  )
}

// 导出 AddTest_lzx 组件
export default AddTest_lzx
