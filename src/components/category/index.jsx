import React, { Component } from "react";
import { Card, Table, Button, Icon } from "antd";
import {connect} from 'react-redux';
import { getCategoryAsync } from '$redux/actions';

@connect(state=>({categories:state.categories}),
{ getCategoryAsync})
class Category extends Component {
  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      dataIndex: "money",
      render() {
        return(
          <div>
          <Button type="link">修改分类</Button>
          <Button type="link">删除分类</Button>
        </div>
        )
      }
    }
  ];
  componentDidMount(){
    this.props.getCategoryAsync()
  }
  // data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     money: "￥300,000.00",
  //     address: "New York No. 1 Lake Park"
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     money: "￥1,256,000.00",
  //     address: "London No. 1 Lake Park"
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     money: "￥120,000.00",
  //     address: "Sidney No. 1 Lake Park"
  //   }
  // ];
  render() {
    
    const {categories} =this.props;
    console.log(categories);
    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type="primary">
              <Icon type="plus" />
              分类列表
            </Button>
          }
        >
          <Table columns={this.columns} dataSource={categories} bordered 
          pagination={{
            defaultPageSize:3,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper:true,
            showSizeChanger:true
          }}
          rowKey='_id'
          />
        </Card>
      </div>
    );
  }
}
export default Category
