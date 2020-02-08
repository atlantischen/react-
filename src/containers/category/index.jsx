import React, { Component } from "react";
import { Card, Button, Icon, Table, Modal, message } from "antd";
import { connect } from "react-redux";

import AddCategoryForm from "./add-category-form";
import {
  getCategoryListAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
  
} from "../product/product-form/node_modules/$redux/actions";

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
})
class Category extends Component {
  state = {
    isShowAddCategory: false,
    category: {}
  };

  componentDidMount() {
    this.props.getCategoryListAsync();
  }

  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      // dataIndex: "operation",
      render: category => {
        // console.log(category);
        return (
          <div>
            <Button type="link" onClick={this.showUpateCategory(category)}>
              修改分类
            </Button>
            <Button type="link" onClick= {this.deleteCategory(category)}>删除分类</Button>
          </div>
        );
      }
    }
  ];
  deleteCategory=(category)=>{
    return ()=>{
      Modal.confirm({
        title: `您确认要删除${category.name}分类吗?`,
        onOk:()=>{
          this.props
          .deleteCategoryAsync(category._id)
          .then(() => {
            message.success('删除分类成功~');
          })
          .catch(err => {
            message.error(err);
          });
        }
      })
    }
  }

  /**
   * 添加分类
   */
  setCategory = () => {
    /*
      1. 校验表单
      2. 收集数据
        validateFields
      3. 发送请求，更新后 端数据
      4. 请求成功，更新前端数据
    */

    const { validateFields, resetFields } = this.addCategoryForm.props.form;
    const {
      category: { name, _id }
    } = this.state;
    console.log(_id);
    validateFields((err, values) => {
      if (!err) {
        const { categoryName } = values;
        // 3. 发送请求，更新后端数据
        // 添加或者修改分类
        let promise = null;
        if (name) {
          // 修改
          promise= this.props.updateCategoryAsync(_id,categoryName)
        } else {
          // 添加
          promise= this.props.addCategoryAsync(categoryName);
        }
        promise
          .then(() => {
            // 提示添加成功~
            message.success(`${name ? "修改" : "添加"}分类成功`);
            // 清空表单数据
            resetFields();
            // 隐藏对话框
            this.hiddenAddCategory();
          })
          .catch(err => {
            console.log(1213);
            message.error(err);
          });
      }
    });
  };

  /**
   * 隐藏添加分类对话框
   */
  hiddenAddCategory = () => {
    this.addCategoryForm.props.form.resetFields()
    this.setState({
      isShowAddCategory: false
    });
  };
  /**
   * 显示添加分类对话框
   */
  showCategoryModal = () => {
    this.setState({
      isShowAddCategory: true
    });
  };
  // 修改分类modal框
  showUpateCategory = (category = {}) => {
    return () => {
      this.setState({
        isShowAddCategory: true,
        category: category
      });
    };
  };

  render() {
    const { categories } = this.props;
    const { isShowAddCategory, category } = this.state;

    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary" onClick={this.showUpateCategory()}>
            <Icon type="plus" />
            分类列表
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          pagination={{
            defaultPageSize: 3,
            pageSizeOptions: ["3", "6", "9", "12"],
            showSizeChanger: true, // 是否显示改变 pageSize
            showQuickJumper: true // 是否显示快速跳转
          }}
          rowKey="_id"
        />

        <Modal
          title={category.name ? "修改分类" : "添加分类"}
          visible={isShowAddCategory}
          onOk={this.setCategory}
          onCancel={this.hiddenAddCategory}
          width={300}
        >
          <AddCategoryForm
            categoryName={category.name}
            wrappedComponentRef={form => (this.addCategoryForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;
