import { useState } from "react";
import "./App.css";
import {
  Button,
  Form,
  Input,
  Flex,
  Card,
  Spin,
  Empty,
  Alert,
  Popconfirm,
  message,
  ConfigProvider,
  theme,
} from "antd";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = (values) => {
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      setTasks([...tasks, values.task]);
      setIsLoading(false);
    }, 1000);
  };

  const onFinishFailed = () => {
    setErrorMessage("Пожалуйста, заполните поле!");
  };

  const handleDelete = (indexToDelete) => {
    const newTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(newTasks);

    message.success("Задача успешно удалена!");
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Flex
        gap="middle"
        justify="center"
        align="center"
        vertical
        style={{ padding: 20, maxWidth: 500, margin: "0 auto", color: "white" }}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Название задачи:"
            name="task"
            rules={[{ required: true, message: "Поле не может быть пустым" }]}
          >
            <Input placeholder="Введите задачу..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Add Task
            </Button>
          </Form.Item>
        </Form>

        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {isLoading ? (
          <Spin />
        ) : tasks.length === 0 ? (
          <Empty description="Список задач пуст" />
        ) : (
          <Flex wrap gap="small">
            {tasks.map((item, index) => (
              <Card
                key={index}
                size="small"
                title={`Задача #${index + 1}`}
                style={{ width: "100%" }}
              >
                <p>{item}</p>

                <Popconfirm
                  title="Удалить задачу?"
                  description="Вы уверены, что хотите удалить эту задачу?"
                  okText="Да"
                  cancelText="Нет"
                  onConfirm={() => handleDelete(index)}
                >
                  <Button danger size="small">
                    Удалить
                  </Button>
                </Popconfirm>
              </Card>
            ))}
          </Flex>
        )}
      </Flex>
    </ConfigProvider>
  );
}

export default App;
