import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  Select,
  DatePicker,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import type { CreateProjectData } from "../../hooks/useProjectManagement";

const { TextArea } = Input;
const { Option } = Select;

interface CreateProjectModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateProjectData) => Promise<void>;
  form: FormInstance;
  loading?: boolean;
}

export function CreateProjectModal({
  open,
  onCancel,
  onSubmit,
  form,
  loading = false,
}: CreateProjectModalProps) {
  return (
    <Modal
      title={
        <Space>
          <PlusOutlined />
          <span>Create New Project</span>
        </Space>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={520}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        style={{ marginTop: 8 }}
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            { required: true, message: "Please enter project name" },
            { min: 2, message: "Name must be at least 2 characters" },
            { max: 100, message: "Name must be less than 100 characters" },
          ]}
        >
          <Input placeholder="Enter project name" size="large" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              max: 500,
              message: "Description must be less than 500 characters",
            },
          ]}
        >
          <TextArea
            placeholder="Enter project description (optional)"
            rows={3}
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              initialValue="Planning"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select status" size="large">
                <Option value="Planning">Planning</Option>
                <Option value="Active">Active</Option>
                <Option value="On Hold">On Hold</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Priority"
              name="priority"
              initialValue="Medium"
              rules={[{ required: true, message: "Please select priority" }]}
            >
              <Select placeholder="Select priority" size="large">
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please select due date" }]}
        >
          <DatePicker
            placeholder="Select due date"
            size="large"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            paddingTop: 12,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            icon={<PlusOutlined />}
          >
            Create Project
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
