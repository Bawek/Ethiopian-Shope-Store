import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const content = (
    <Tabs defaultValue="update" className="w-full">
        <TabsList className="flex justify-around bg-gray-200 dark:bg-gray-800 p-2 rounded-md">
            <TabsTrigger value="update">Update Account</TabsTrigger>
            <TabsTrigger value="delete">Delete Account</TabsTrigger>
            <TabsTrigger value="change">Change Email/Password</TabsTrigger>
        </TabsList>

        {/* Update Account Section */}
        <TabsContent value="update" className="p-4">
            <h2 className="text-lg font-semibold mb-2">Update Account Information</h2>
            <p>Update your account details here.</p>
            <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => openDialog("Update Account", <p>Update your account information form here.</p>)}
            >
                Update Info
            </button>
        </TabsContent>

        {/* Delete Account Section */}
        <TabsContent value="delete" className="p-4">
            <h2 className="text-lg font-semibold mb-2">Delete Your Account</h2>
            <p>If you wish to delete your account, please confirm here.</p>
            <button
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={() => openDialog("Delete Account", <p>Are you sure you want to delete your account?</p>)}
            >
                Delete Account
            </button>
        </TabsContent>

        {/* Change Email/Password Section */}
        <TabsContent value="change" className="p-4">
            <h2 className="text-lg font-semibold mb-2">Change Email or Password</h2>
            <p>Change your email or password below.</p>
            <button
                className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-md"
                onClick={() => openDialog("Change Email/Password", <p>Enter your new email or password.</p>)}
            >
                Change Email/Password
            </button>
        </TabsContent>
    </Tabs>
)