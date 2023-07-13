import { Modal, Input } from 'antd'
import { useState } from 'react'
import React, { useEffect } from 'react'
import axios from 'axios'

// 定义 Modify_lzx 组件
const Modify_lzx = ({ onClose, fetchData, record, oprecords, timestamp }) => {
  // 从传入的 record 中获取需要修改的题目信息
  const { ID, topic, score, questiontype, difficulty, answer } = record
  const classes = record['class']

  // 定义一个 state 值 count 和 useEffect 钩子函数，用于在接收到数据变化时重新渲染组件
  const [count, setCount] = useState(0)
  useEffect(() => {
    // 调用 fetchData 函数获取最新的题目信息
    fetchData()
    // 在控制台输出 count 值
    console.log(`The count is ${count}`)
  }, [count])

  // 定义用于更新题目信息的 state 值
  const [id, setId] = useState(ID)
  const [title, setTitle] = useState(topic)
  const [classValue, setClassValue] = useState(classes)
  const [scorenum, setScore] = useState(score)
  const [type, setType] = useState(questiontype)
  const [testdifficulty, setDifficulty] = useState(difficulty)
  const [testanswer, setAnswer] = useState(answer)

  // 点击保存按钮后触发的函数
  const handleSaveClick = () => {
    // 在控制台输出修改后的题目信息
    console.log({
      ID,
      title,
      classValue,
      scorenum,
      type,
      testdifficulty,
      testanswer,
    })
    // 发送 POST 请求，将修改后的题目信息提交到服务器
    axios
      .post('http://localhost:8080/controllers/modification', {
        id: ID,
        topic: title,
        class: classValue,
        score: scorenum,
        questiontype: type,
        difficulty: testdifficulty,
        answer: testanswer,
      })
      .then((response) => {
        // 更新 count 值触发组件重新渲染
        setCount(count + 1)
        // 调用 fetchData 函数获取最新的题目信息
        fetchData()
        // 弹出提示框，提示用户修改成功
        alert('修改成功')
        // 将操作类型和时间戳传递给外部组件进行记录
        const op = '修改'
        oprecords(op, timestamp)
        return
      })
      .catch((error) => {
        return
      })
    // 关闭 Modal 组件
    onClose()
  }

  // 点击取消按钮后触发的函数，关闭 Modal 组件
  const handleCancelClick = () => {
    onClose()
  }

  // 返回包含 Modal 和各种输入框的 JSX 元素
  return (
    <>
      <Modal
        title="修改"
        open={true}
        onOk={handleSaveClick}
        onCancel={handleCancelClick}
        getContainer={false}>
        <div>
          序 号:
          <Input
            placeholder=""
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={true}
            style={{
              width: '300px',
              marginTop: '20px',
            }}
          />{' '}
          <br />
        </div>
        <div>
          题 目:
          <Input
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '300px',
              marginTop: '20px',
            }}
          />{' '}
          <br />
        </div>
        <div>
          班 级：
          <Input
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
            placeholder=""
            value={scorenum}
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
            placeholder=""
            value={testdifficulty}
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
            placeholder=""
            value={testanswer}
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

// 将 Modify_lzx 组件导出
export default Modify_lzx
