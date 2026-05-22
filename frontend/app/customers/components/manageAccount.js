"use client";
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateAccountMutation } from '@/lib/features/auth/accountApi';
import { Loader2 } from 'lucide-react';
import { setCredential } from '@/lib/features/auth/accountSlice';
import { imageViewer } from '@/app/system-admin/lib/imageViewer';

const AccountPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const account = useSelector((state) => state.account)
  const [updateAccount, { isLoading, isError, error }] = useUpdateAccountMutation()
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    language: 'en'
  });
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch()
  // Profile Form
  const { register: profileRegister, handleSubmit: handleProfileSubmit, reset: resetProfile, formState: { isDirty: isProfileDirty } } = useForm({
    defaultValues: {
      firstName: account?.firestName || '',
      lastName: account?.lastName || ''
    }
  });

  // Password Form
  const { register: passwordRegister, handleSubmit: handlePasswordSubmit, reset: resetPassword, watch, formState: { isSubmitting: isPasswordSubmitting } } = useForm();

  useEffect(() => {
    // Load saved settings
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'en';
    setAppearanceSettings({
      theme: savedTheme,
      language: savedLanguage
    });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleProfileSave = async (data) => {
    try {
      const formData = new FormData();
      // Append profile image if exists
      if (profileImage) {
        if (profileImage instanceof File) {
          formData.append('profileImage', profileImage);
        } else if (typeof profileImage === 'string') {
          // Convert base64 to blob if needed
          const blob = await fetch(profileImage).then(r => r.blob());
          formData.append('profileImage', blob, 'profile.jpg');
        }
      }

      // Append other fields
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('id', account?.id);
      // Execute mutation
      const response = await updateAccount({ formData: formData, id: account.id }).unwrap();
      console.log(response)
      if (isError) {
        return toast({
          title: "Update failed",
          description: error?.message || "Failed to update profile",
          variant: "destructive",
        });
      }
      // Update local state with server response
      resetProfile({
        firstName: response.firstName,
        lastName: response.lastName,
      });

      // Update profile image if returned from server
      if (response.profileUrl) {
        setProfileImage(response.profileUrl);
      }
      dispatch(setCredential({ ...account, ...response.data }))
      toast({
        title: "Profile updated successfully",
        description: "Your changes have been saved",
      });

    } catch (err) {
      console.log(err, 'proifle error')
      toast({
        title: "Update failed",
        description: error?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async (data) => {
    try {
      const response = await updateAccount({ formData: data, id: account.id }).unwrap();
      if (isError) {
        return toast({
          title: "Error changing password",
          description: error.message || 'Something went wrong please try again.',
          variant: "destructive"
        });
      }
      resetPassword();
      toast({
        title: "changing password",
        description: 'YOur password is successfully changed.'
      });
    } catch (error) {
      console.log(error, 'error')
      toast({
        title: "Error changing password",
        description: error?.data?.message || 'something went wrong please try again.',
        variant: "destructive"
      });
    }
  };

  const handleAppearanceChange = (type, value) => {
    const newSettings = { ...appearanceSettings, [type]: value };
    setAppearanceSettings(newSettings);
    // Save to localStorage
    localStorage.setItem(type, value);
    // Apply theme
    if (type === 'theme') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(value);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl mx-auto font-bold text-center mb-6">Manage Account</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Profile Tab Content */}
        <TabsContent
          value="profile"
          className="space-y-4 pt-4 h-[calc(100vh-200px)] overflow-y-auto"
        >
          <form onSubmit={handleProfileSubmit(handleProfileSave)}>
            <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold mb-8">Profile details</h1>

              <div className="space-y-8 overflow-y-auto">
                <div className='overflow-y-auto'>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full  flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile file"
                            className="w-full h-full object-cover"
                          />
                        ) : account?.profileUrl ?
                          <img
                            src={imageViewer(account?.profileUrl)}
                            alt="Profile pro"
                            className="w-full h-full object-cover"
                          />
                          : (
                            <svg
                              className="w-8 h-8 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              htmlFor="profile-upload"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="file"
                        id="profile-upload"
                        name='profileImage'
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="profile-upload"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors cursor-pointer block text-center"
                      >
                        Upload
                      </label>
                      {profileImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="px-4 py-2 text-red-600 border border-red-200 rounded-md text-sm hover:bg-red-50 transition-colors w-full"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm">
                    Recommended size 1:1, up to 10MB.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium  mb-2">
                      First name
                    </label>
                    <Input
                      {...profileRegister("firstName")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium  mb-2">
                      Last name
                    </label>
                    <Input
                      {...profileRegister("lastName")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-8">
                  <button
                    type="button"
                    onClick={() => resetProfile()}
                    disabled={!isProfileDirty}
                    className="px-6 py-2  border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    disabled={!isProfileDirty || isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </TabsContent>

        {/* Account Tab Content */}
        <TabsContent value="account" className="space-y-4 pt-4">
          <form onSubmit={handlePasswordSubmit(handlePasswordChange)}>
            <div className="space-y-4 p-6 rounded-lg shadow-sm">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <Input
                  type="password"
                  {...passwordRegister("currentPassword")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input
                  type="password"
                  {...passwordRegister("newPassword")}
                  required
                  minLength={8}
                />
              </div>
              <Button
                type="submit"
                className="mt-4 bg-orange-700 w-full"
                disabled={isPasswordSubmitting}
              >
                {isPasswordSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    changing...
                  </span>
                ) : "Change Password"}
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Appearance Tab Content */}
        <TabsContent value="appearance" className="space-y-4 pt-4">
          <div className="p-6 rounded-lg shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <Select
                value={appearanceSettings.theme}
                onValueChange={(value) => handleAppearanceChange('theme', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AccountPage;