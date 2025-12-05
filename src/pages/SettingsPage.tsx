import React, { useState } from 'react';
import {
  User, Bell, Shield, CreditCard, Briefcase, Globe,
  Camera, Mail, Phone, MapPin, Link as LinkIcon, Save, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { Button } from '../components/common/Button';
import { Card, CardContent, CardHeader, CardFooter } from '../components/common/Card';
import { Input, Textarea, Select } from '../components/common/Input';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'billing' | 'preferences';

const SettingsPage: React.FC = () => {
  const { user, userType } = useAuth();
  const { success, error: showError } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Demo User',
    email: user?.email || 'demo@videohub.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'AI video specialist with expertise in creative direction and motion design.',
    website: 'https://portfolio.example.com',
    company: userType === 'agency' ? 'Creative Agency Inc.' : ''
  });

  const [notifications, setNotifications] = useState({
    emailProposals: true,
    emailMessages: true,
    emailUpdates: false,
    pushProposals: true,
    pushMessages: true,
    pushUpdates: false,
    marketingEmails: false
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    darkMode: false
  });

  const tabs = [
    { id: 'profile' as SettingsTab, name: 'Profile', icon: User },
    { id: 'notifications' as SettingsTab, name: 'Notifications', icon: Bell },
    { id: 'security' as SettingsTab, name: 'Security', icon: Shield },
    { id: 'billing' as SettingsTab, name: 'Billing', icon: CreditCard },
    { id: 'preferences' as SettingsTab, name: 'Preferences', icon: Globe }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    success('Settings Saved', 'Your settings have been updated successfully.');
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  <p className="text-sm text-gray-500">Update your personal information and public profile</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <Avatar
                      src={user?.avatar}
                      alt={profileData.name}
                      fallback={profileData.name}
                      size="xl"
                    />
                    <div>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <Camera className="h-4 w-4" />
                        <span>Change Photo</span>
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 5MB.</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      icon={<User className="h-4 w-4" />}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      icon={<Mail className="h-4 w-4" />}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      icon={<Phone className="h-4 w-4" />}
                    />
                    <Input
                      label="Location"
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      icon={<MapPin className="h-4 w-4" />}
                    />
                    {userType === 'agency' && (
                      <Input
                        label="Company"
                        value={profileData.company}
                        onChange={(e) => handleProfileChange('company', e.target.value)}
                        icon={<Briefcase className="h-4 w-4" />}
                      />
                    )}
                    <Input
                      label="Website"
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleProfileChange('website', e.target.value)}
                      icon={<LinkIcon className="h-4 w-4" />}
                    />
                  </div>

                  <Textarea
                    label="Bio"
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    rows={4}
                    hint="Brief description for your profile. URLs are hyperlinked."
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} loading={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                  <p className="text-sm text-gray-500">Choose how and when you want to be notified</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'emailProposals', label: 'New proposals', description: 'Get notified when someone submits a proposal' },
                        { key: 'emailMessages', label: 'Messages', description: 'Get notified when you receive a new message' },
                        { key: 'emailUpdates', label: 'Project updates', description: 'Updates on your active projects' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[item.key as keyof typeof notifications] as boolean}
                              onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'pushProposals', label: 'New proposals', description: 'Push notification for new proposals' },
                        { key: 'pushMessages', label: 'Messages', description: 'Push notification for messages' },
                        { key: 'pushUpdates', label: 'Project updates', description: 'Push notification for project updates' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[item.key as keyof typeof notifications] as boolean}
                              onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Marketing emails</p>
                        <p className="text-xs text-gray-500">Receive tips, tutorials, and product updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.marketingEmails}
                          onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} loading={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-sm text-gray-500">Manage your password and security preferences</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Change Password */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <Input
                        label="Current Password"
                        type="password"
                        placeholder="Enter current password"
                      />
                      <Input
                        label="New Password"
                        type="password"
                        placeholder="Enter new password"
                      />
                      <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Badge variant="warning">Not Enabled</Badge>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Enable 2FA
                    </Button>
                  </div>

                  {/* Active Sessions */}
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Current Session</p>
                          <p className="text-xs text-gray-500">Chrome on MacOS - San Francisco, CA</p>
                        </div>
                        <Badge variant="success">Active</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4 text-red-600 hover:text-red-700">
                      Sign Out All Other Sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Billing & Payments</h2>
                  <p className="text-sm text-gray-500">Manage your payment methods and billing history</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Plan */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-blue-900">Professional Plan</h3>
                        <p className="text-sm text-blue-700">$49/month - Billed monthly</p>
                      </div>
                      <Button variant="outline" size="sm">Upgrade</Button>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Payment Methods</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                            VISA
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">**** **** **** 4242</p>
                            <p className="text-xs text-gray-500">Expires 12/25</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Add Payment Method
                    </Button>
                  </div>

                  {/* Billing History */}
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Billing History</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 font-medium text-gray-500">Date</th>
                            <th className="text-left py-3 font-medium text-gray-500">Description</th>
                            <th className="text-left py-3 font-medium text-gray-500">Amount</th>
                            <th className="text-left py-3 font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3">Jan 1, 2024</td>
                            <td className="py-3">Professional Plan - Monthly</td>
                            <td className="py-3">$49.00</td>
                            <td className="py-3"><Badge variant="success" size="sm">Paid</Badge></td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">Dec 1, 2023</td>
                            <td className="py-3">Professional Plan - Monthly</td>
                            <td className="py-3">$49.00</td>
                            <td className="py-3"><Badge variant="success" size="sm">Paid</Badge></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
                  <p className="text-sm text-gray-500">Customize your VideoHub experience</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Select
                      label="Language"
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      options={[
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Spanish' },
                        { value: 'fr', label: 'French' },
                        { value: 'de', label: 'German' },
                      ]}
                    />
                    <Select
                      label="Timezone"
                      value={preferences.timezone}
                      onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                      options={[
                        { value: 'America/Los_Angeles', label: 'Pacific Time (US)' },
                        { value: 'America/New_York', label: 'Eastern Time (US)' },
                        { value: 'Europe/London', label: 'London (GMT)' },
                        { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
                      ]}
                    />
                    <Select
                      label="Currency"
                      value={preferences.currency}
                      onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                      options={[
                        { value: 'USD', label: 'US Dollar ($)' },
                        { value: 'EUR', label: 'Euro (€)' },
                        { value: 'GBP', label: 'British Pound (£)' },
                        { value: 'JPY', label: 'Japanese Yen (¥)' },
                      ]}
                    />
                  </div>

                  {/* Dark Mode */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                        <p className="text-xs text-gray-500">Use dark theme across the platform</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.darkMode}
                          onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border-t pt-6">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-red-900">Delete Account</h3>
                          <p className="text-sm text-red-700 mt-1">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <Button variant="danger" size="sm" className="mt-3">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} loading={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
