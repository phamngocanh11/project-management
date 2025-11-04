import { Card, Row, Col, Space } from "antd";
import { MainLayout } from "../components/layout/MainLayout";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { AccountOverviewCard } from "../components/profile/AccountOverviewCard";
import { SecurityStatusCard } from "../components/profile/SecurityStatusCard";
import { ProfileTabs } from "../components/profile/ProfileTabs";
import { useProfileManagement } from "../hooks/useProfileManagement";

export function ProfilePage() {
  const {
    // State
    user,
    form,
    passwordForm,

    // Mutations
    updateProfileMutation,
    changePasswordMutation,
    uploadAvatarMutation,

    // Handlers
    handleProfileUpdate,
    handlePasswordChange,
    handleAvatarChange,
  } = useProfileManagement();

  return (
    <MainLayout>
      <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        {/* Header Section */}
        <ProfileHeader
          user={user}
          onAvatarChange={handleAvatarChange}
          avatarUploading={uploadAvatarMutation.isPending}
        />

        {/* Main Content */}
        <Row gutter={[24, 24]}>
          {/* Left Column - Quick Stats */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <AccountOverviewCard user={user} />
              <SecurityStatusCard />
            </Space>
          </Col>

          {/* Right Column - Settings */}
          <Col xs={24} lg={16}>
            <Card>
              <ProfileTabs
                user={user}
                form={form}
                passwordForm={passwordForm}
                onProfileUpdate={handleProfileUpdate}
                onPasswordChange={handlePasswordChange}
                profileUpdateLoading={updateProfileMutation.isPending}
                passwordChangeLoading={changePasswordMutation.isPending}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
