import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Input, Tooltip, Button, DatePicker, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { queryTableList } from './service';
const { RangePicker } = DatePicker;

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
};

const columns = [
  {
    title: 'ID',
    width: 80,
    dataIndex: 'name',
    fixed: 'left',
    align: 'center',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '用户名',
    dataIndex: 'containers',
    align: 'center',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '邮箱',
    align: 'center',
    dataIndex: 'callNumber',
  },
  {
    title: '手机号',
    dataIndex: 'progress',
    align: 'center',
    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status],
    }),
  },
  {
    title: '状态',
    dataIndex: 'creator',
    align: 'center',
    valueEnum: {
      all: {
        text: '全部',
      },
      付小小: {
        text: '付小小',
      },
      曲丽丽: {
        text: '曲丽丽',
      },
      林东东: {
        text: '林东东',
      },
      陈帅帅: {
        text: '陈帅帅',
      },
      兼某某: {
        text: '兼某某',
      },
    },
  },
  {
    title: '创建时间',
    width: 180,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    align: 'center',
    sorter: (a, b) => a.createdAt - b.createdAt,
    renderFormItem: (_, { value, onChange }) => <RangePicker value={value} onChange={onChange} />,
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    align: 'center',
    render: () => [<a key="link">链路</a>],
  },
];
export default () => {
  return (
    <PageContainer>
      <Card>
        {/* <Row>
          <Col span={24} style={{ height: '50px' }}>
            <Input placeholder="用户名" style={{ width: '200px', marginRight: '20px' }} />
            <Button icon={<SearchOutlined />} style={{ marginRight: '20px' }}>
              查询
            </Button>
            <Button type="primary" icon={<SearchOutlined />} style={{ marginRight: '20px' }}>
              新增
            </Button>
            <Button type="danger" icon={<SearchOutlined />}>
              批量删除
            </Button>
          </Col>
        </Row> */}
        <ProTable
          columns={columns}
          rowSelection={{}}
          tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={onCleanSelected}
                >
                  取消选择
                </a>
              </span>
              <span>{`容器数量: ${selectedRows.reduce(
                (pre, item) => pre + item.containers,
                0,
              )} 个`}</span>
              <span>{`调用量: ${selectedRows.reduce(
                (pre, item) => pre + item.callNumber,
                0,
              )} 次`}</span>
            </Space>
          )}
          tableAlertOptionRender={() => (
            <Space size={16}>
              <a>批量删除</a>
              <a>导出数据</a>
            </Space>
          )}
          //   request={() =>
          //     Promise.resolve({
          //       data: tableListDataSource,
          //       success: true,
          //     })
          //   }
          request={(params) => queryTableList({ ...params })}
          //   scroll={{
          //     x: 1300,
          //   }}
          options={false}
          search={false}
          bordered
          rowKey="key"
          toolBarRender={() => {
            return (
              <div>
                <Input placeholder="用户名" style={{ width: '200px', marginRight: '20px' }} />
                <Button icon={<SearchOutlined />} style={{ marginRight: '20px' }}>
                  查询
                </Button>
                <Button type="primary" icon={<SearchOutlined />} style={{ marginRight: '20px' }}>
                  新增
                </Button>
                <Button type="danger" icon={<SearchOutlined />}>
                  批量删除
                </Button>
              </div>
            );
          }}
        />
      </Card>
    </PageContainer>
  );
};
