import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";

type ProductFilterProps = {
  children?: React.ReactNode;
};

const ProductFilter = ({ children }: ProductFilterProps) => {
  return (
    <>
      <Card>
        <Row justify="space-between">
          <Col span={16}>
            <Row gutter={20}>
              <Col span={6}>
                <Form.Item name="q">
                  <Input.Search allowClear={true} placeholder="Search" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="role">
                  <Select>
                    <Select.Option value="pizza">Pizza</Select.Option>
                    <Select.Option value="beverages">Beverages</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="role">
                  <Select>
                    <Select.Option value="pizza">Pizza hut</Select.Option>
                    <Select.Option value="beverage">Softy Corner</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space>
                  <Switch defaultChecked onChange={() => {}} />
                  <Typography.Text>Show only published</Typography.Text>
                </Space>
              </Col>
            </Row>
          </Col>

          <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
            {children}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductFilter;
