import '../static/css/iconfont.css'
import '../static/css/sidebar.css'
import React from 'react'
class Sidebar_lzx extends React.Component {
  constructor(props) {
    super(props)
    this.handleComponentClick = this.handleComponentClick.bind(this)
  }

  handleComponentClick(componentName) {
    console.log('Received component name:', componentName)
    this.props.onComponentClick(componentName)
  }

  render() {
    return (
      <div className="content">
        <div className="menu-box">
          <div className="menu">
            <div className="menu-title">
              <h1>Menu</h1>
            </div>
            <div className="menu-item">
              <input type="checkbox" id="menu-item1"></input>
              <label htmlFor="menu-item1">
                <i className="menu-item-icon iconfont icon-a-01-shujuzhongxin"></i>
                <span>系统管理</span>
                <i className="menu-item-last iconfont icon-down"></i>
              </label>
              <div className="menu-content">
                <span onClick={() => this.handleComponentClick('null')}>
                  option1
                </span>
                <span onClick={() => this.handleComponentClick('null')}>
                  option2
                </span>
                <span onClick={() => this.handleComponentClick('null')}>
                  option3
                </span>
              </div>
            </div>

            <div className="menu-item">
              <input type="checkbox" id="menu-item2"></input>
              <label htmlFor="menu-item2">
                <i className="menu-item-icon iconfont icon-a-02-kechengguanli"></i>
                <span id="TestManagement">考试管理</span>
                <i className="menu-item-last iconfont icon-down"></i>
              </label>
              <div className="menu-content">
                <span onClick={() => this.handleComponentClick('Testmanage')}>
                  试题管理
                </span>
                <span onClick={() => this.handleComponentClick('null')}>
                  科目管理
                </span>
                <span onClick={() => this.handleComponentClick('null')}>
                  试卷管理
                </span>
              </div>
            </div>

            <div className="menu-item">
              <input type="checkbox" id="menu-item3"></input>
              <label htmlFor="menu-item3">
                <i className="menu-item-icon iconfont icon-a-04-zixunfabu"></i>
                <span>班级管理</span>
                <i className="menu-item-last iconfont icon-down"></i>
              </label>
              <div className="menu-content">
                <span onClick={() => this.handleComponentClick('null')}>
                  option1
                </span>
                <span onClick={() => this.handleComponentClick('null')}>
                  option2
                </span>
                <span onClick={() => this.handleComponentClick('null')}>
                  option3
                </span>
              </div>
            </div>

            <div className="set-line"></div>

            <div className="menu-item">
              <label>
                <i className="menu-item-icon iconfont icon-a-08-shezhi"></i>
                <span onClick={() => this.handleComponentClick('LogInfo')}>
                  操作日志管理
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar_lzx
