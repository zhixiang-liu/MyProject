import Sidebar_lzx from './sidebar'
import TopBar_lzx from './topBar'
import React from 'react'
import Content_lzx from './Content'

// 定义 Index_lzx 组件
class Index_lzx extends React.Component {
  constructor(props) {
    super(props)
    // 定义一个 state 值 currentComponent，用于表示当前显示的组件
    this.state = {
      currentComponent: null,
    }
    // 绑定 handleSidebarClick 函数中的 this 指向
    this.handleSidebarClick = this.handleSidebarClick.bind(this)
  }

  // 点击侧边栏菜单时触发的函数，将 currentComponent 的值设置为对应组件的名称
  handleSidebarClick(componentName) {
    this.setState({ currentComponent: componentName })
  }

  render() {
    //获取当前页面 URL 中的参数
    const searchParams = new URLSearchParams(window.location.search)
    // 获取 account 参数的值
    const account = searchParams.get('account')
    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        {/* 渲染 TopBar_lzx 组件，并传递 account 参数 */}
        <TopBar_lzx account={account} />
        {/* 渲染 Sidebar_lzx 组件，并传递 handleSidebarClick 函数 */}
        <Sidebar_lzx onComponentClick={this.handleSidebarClick} />
        {/* 渲染 Content_lzx 组件，并传递 currentComponent 和 account 参数 */}
        <Content_lzx
          currentComponent={this.state.currentComponent}
          account={account}
        />
      </div>
    )
  }
}

// 将 Index_lzx 组件导出
export default Index_lzx
