import { Avatar, Button, List, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { changeActiveUser, getAllUsers } from '../../services/UserService';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const [active, setActive] = useState(false);
  const [render, setRender] = useState(0);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res) {
        setData(res?.data as any);
      }
    });
  }, [render]);

  const handleChangeActive = (id: number) => {
    showModal();
    setUserId(id);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await changeActiveUser(userId, active) && toast.success("Change active user successfully");
    setRender(render + 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
  };

  return (
    <div className="w-full max-w-4xl">
      <Space direction="vertical" className="p-2" size="middle">
        <h2>View List of All Users</h2>
      </Space>
      <List
        pagination={{
          position: 'bottom',
          align: 'center',
          pageSize: 6,
          defaultCurrent: 1,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              item.isActive ? (
                <Button onClick={() => { 
                  handleChangeActive(item.id) 
                  setActive(false);
                  }} className="text-lightGreen" key="list-loadmore-active">
                  Active
                </Button>
              ) : (
                <Button onClick={() => {
                  handleChangeActive(item.id)
                  setActive(true);
                  }
                } className="text-redWarning" key="list-loadmore-ban">
                  Banned
                </Button>
              )
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar>{item.fullName.charAt(0)}</Avatar>}
              title={<a onClick={handleClick}>{item.fullName}</a>}
              description={`Email: ${item.email}, Phone: ${item.phone}`}
            />
          </List.Item>
        )}
      />
      <Modal title="Delete Confirm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure?</p>
      </Modal>
    </div>
  );
};

export default AdminUsers;
