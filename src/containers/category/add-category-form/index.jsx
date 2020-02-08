import React, { Component } from 'react';
import { Form, Input } from 'antd';
import ProtoTypes from 'prop-types'

@Form.create()
class AddCategoryForm extends Component {
  static propTypes={
    category:ProtoTypes.string
  }
  render() {
    const { form:{getFieldDecorator},categoryName } = this.props;
    return (
      <Form>
        <Form.Item label='品类名称'>
          {getFieldDecorator('categoryName', {
            rules: [{ required: true, message: '请输入分类名称' }],
            // 初始值
            initialValue: categoryName
          })(<Input placeholder='请输入分类名称' />)}
        </Form.Item>
      </Form>
    );
  }
}

export default AddCategoryForm;
