import { Avatar, List, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { HomestayResponse } from '../../models/HomestayDto';
import { getAllHomestay } from '../../services/HomestayService';
import { deleteUserHomestay } from '../../services/UserService';
import { toast } from 'react-toastify';

const AdminHomestay = () => {
  const [data, setData] = useState<HomestayResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [render, setRender] = useState(0);

  useEffect(() => {
    getAllHomestay().then((res) => {
      if (res) {
        setData(res?.data as any);
      }
    })
  }, [render]);

  const handleDelete = (slug: string) => {
    showModal();
    setSlug(slug);
  };


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await deleteUserHomestay(slug) && toast.success("Delete successfully");
    setRender(render + 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const handleClick = () => {
  }

  return (
      <div className="w-full max-w-4xl">
        <Space direction="vertical" className='p-2' size="middle">
          <h2>View List All Homestay</h2>
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
              actions={[<a className='text-lightGreen' key="list-loadmore-edit">edit</a>, <a onClick={() => handleDelete(item.slug)} className='text-redWarning' key="list-loadmore-more">delete</a>]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.images} />}
                title={<a onClick={handleClick}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
          <Modal title="Delete Confirm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure? It can't be restored</p>
          </Modal>
      </div>
  );
};

export default AdminHomestay;