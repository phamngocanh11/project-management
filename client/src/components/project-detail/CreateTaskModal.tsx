import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { TeamMember, CreateTaskData } from "../../types/project";

const { TextArea } = Input;
const { Option } = Select;

interface CreateTaskModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateTaskData) => void;
  teamMembers: TeamMember[];
  loading?: boolean;
}

export function CreateTaskModal({
  open,
  onCancel,
  onSubmit,
  teamMembers,
  loading = false,
}: CreateTaskModalProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: CreateTaskData) => {
    onSubmit(values);
    form.resetFields();
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="Create New Task"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ paddingTop: 16 }}
      >
        <Form.Item
          label="Task Title"
          name="title"
          rules={[
            { required: true, message: "Please enter task title" },
            { min: 2, message: "Title must be at least 2 characters" },
          ]}
        >
          <Input placeholder="Enter task title" size="large" />
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
            placeholder="Enter task description (optional)"
            rows={3}
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Status"
              name="status"
              initialValue="Todo"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select size="large">
                <Option value="Todo">Todo</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="In Review">In Review</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Priority"
              name="priority"
              initialValue="Medium"
              rules={[{ required: true, message: "Please select priority" }]}
            >
              <Select size="large">
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Type"
              name="type"
              initialValue="Feature"
              rules={[{ required: true, message: "Please select type" }]}
            >
              <Select size="large">
                <Option value="Feature">Feature</Option>
                <Option value="Bug">Bug</Option>
                <Option value="Documentation">Documentation</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Assignee"
              name="assignee"
              rules={[{ required: true, message: "Please select assignee" }]}
            >
              <Select size="large" placeholder="Select assignee">
                {teamMembers.map((member) => (
                  <Option key={member.id} value={member.name}>
                    {member.name} - {member.role}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: "Please select due date" }]}
            >
              <Input type="date" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            paddingTop: 16,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Button onClick={handleCancel} size="large">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<PlusOutlined />}
            loading={loading}
          >
            Create Task
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
