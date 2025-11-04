import { Modal, Form, Input, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import type { CreateWorkspaceData } from "../../types/api";

const { TextArea } = Input;

interface CreateWorkspaceModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateWorkspaceData) => Promise<void>;
  form: FormInstance;
  loading: boolean;
}

export function CreateWorkspaceModal({
  open,
  onCancel,
  onSubmit,
  form,
  loading,
}: CreateWorkspaceModalProps) {
  return (
    <Modal
      title={
        <Space>
          <PlusOutlined />
          <span>Create New Workspace</span>
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
          label="Workspace Name"
          name="name"
          rules={[
            { required: true, message: "Please enter workspace name" },
            { min: 2, message: "Name must be at least 2 characters" },
            { max: 50, message: "Name must be less than 50 characters" },
          ]}
        >
          <Input placeholder="Enter workspace name" size="large" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              max: 200,
              message: "Description must be less than 200 characters",
            },
          ]}
        >
          <TextArea
            placeholder="Enter workspace description (optional)"
            rows={3}
            maxLength={200}
            showCount
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
            Create Workspace
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
