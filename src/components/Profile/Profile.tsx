import { Button, Descriptions } from "antd";
import Avatar from "antd/es/avatar/avatar";
import Card from "antd/es/card";
import { EditOutlined, UserOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUserAPI, updateUserAPI } from "../../services/UserService";
import Input from "antd/es/input/Input";

interface Props {}

const Profile = (props: Props) => {
  const [profile, setProfile] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const access_token = localStorage.getItem('access_token');
    const updateProfile = { fullName: profile.fullName, phone: profile.phone };
    updateUserAPI(updateProfile, access_token).then((res) => {
      setIsEditing(false);
    })
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    getUserAPI(access_token as string).then((res) => {
      setProfile(res?.data);
    })
  }, [isEditing]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  return (
    <Card
      actions={[
        isEditing ? (
          <>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveClick} key="save">
              Save
            </Button>
            <Button type="default" icon={<CloseOutlined />} onClick={handleCancelClick} key="cancel">
              Cancel
            </Button>
          </>
        ) : (
          <Button type="primary" icon={<EditOutlined />} onClick={handleEditClick} key="edit">
            Edit Profile
          </Button>
        )
      ]}
    >
      <Card.Meta
        avatar={<Avatar size={64} icon={<UserOutlined />} />}
        title={profile.fullName}
        description={profile.role}
      />
      <Descriptions title="User Info" layout="vertical" bordered>
        <Descriptions.Item label="Full Name">
          {isEditing ? (
            <Input
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
            />
          ) : (
            profile.fullName
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">
          {isEditing ? (
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
            />
          ) : (
            profile.phone
          )}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Profile;