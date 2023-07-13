import React from 'react'
import Testmanage_lzx from './testmanage'
import LogInfo_lzx from './logop'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contracts/config'
import Web3 from 'web3'

// 定义 Content_lzx 组件
class Content_lzx extends React.Component {
  constructor(props) {
    super(props)
    // 初始化 state
    this.state = {
      contract: [], // 智能合约实例
      web3: [], // web3 实例
    }
  }

  // 在组件挂载后创建智能合约实例和 web3 实例
  async componentDidMount() {
    const web3 = new Web3('HTTP://127.0.0.1:7545') // 创建 web3 实例
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS) // 创建智能合约实例
    this.setState({
      contract: contract,
      web3: web3,
    })
  }

  render() {
    const { currentComponent, account } = this.props

    return (
      <div
        style={{
          position: 'fixed',
          top: '90px', // 与头部导航栏的距离
          left: '255px', // 左侧侧边栏的宽度
          width: 'calc(100% - 255px)', // 让宽度等于浏览器宽度减去侧边栏的宽度
          height: 'calc(100% - 90px)', // 让高度等于浏览器高度减去头部导航栏的高度
        }}>
        <div
          style={{
            width: '99%', // 让子元素宽度等于父元素宽度
            height: '97%', // 让子元素高度比父元素留出一定的空白区域
            backgroundColor: '#fff', // 设置背景色为白色
          }}>
          {(() => {
            switch (
              currentComponent // 根据当前组件名称渲染不同的组件
            ) {
              case null: // 当未选择任何组件时，显示欢迎信息
                return (
                  <div
                    style={{
                      fontSize: '26px',
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    欢迎来到考试管理系统
                  </div>
                )
              case 'Testmanage': // 当选择 Testmanage 组件时，渲染 Testmanage_lzx 组件
                return (
                  <Testmanage_lzx
                    account={account}
                    contract={this.state.contract}
                  />
                )
              case 'LogInfo': // 当选择 LogInfo 组件时，渲染 LogInfo_lzx 组件
                return (
                  <LogInfo_lzx
                    contract={this.state.contract}
                    web3={this.state.web3}
                  />
                )
              default:
                return null
            }
          })()}
        </div>
      </div>
    )
  }
}

// 导出 Content_lzx 组件
export default Content_lzx
