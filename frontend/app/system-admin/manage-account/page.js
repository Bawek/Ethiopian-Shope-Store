import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Trash2, Lock, Mail, Smartphone, LogOut } from "lucide-react"

const ManageAccount = () => {
    const userData = {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/avatars/01.png",
        lastPasswordUpdate: "2024-02-15",
        connectedDevices: [
            { id: 1, device: "MacBook Pro", location: "New York, NY", lastActive: "2 hours ago" },
            { id: 2, device: "iPhone 15", location: "San Francisco, CA", lastActive: "5 minutes ago" }
        ]
    }

    return (
        <div className="container max-w-6xl py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-center">Account Settings</h1>
                <Badge variant="outline" className="px-4 py-2">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    Active Account
                </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 md:col-span-2">
                    {/* Profile Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={userData.avatar} />
                                    <AvatarFallback>{userData.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-lg font-semibold">{userData.name}</h2>
                                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Change Email Address
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Lock className="w-4 h-4 mr-2" />
                                    Change Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Password</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Last changed: {userData.lastPasswordUpdate}
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Change Password
                                    </Button>
                                </div>
                                <Separator />

                                <div className="pt-4">
                                    <h3 className="font-medium mb-4">Active Sessions</h3>
                                    <div className="space-y-4">
                                        {userData.connectedDevices.map((device) => (
                                            <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div>
                                                    <p className="font-medium">{device.device}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {device.location} · {device.lastActive}
                                                    </p>
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    Log Out
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Danger Zone Card */}
                    <Card className="border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20">
                        <CardHeader>
                            <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="w-full">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Account
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove all data associated with it.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction variant="destructive">Delete Account</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>

                    {/* Recent Activity Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span>Password changed</span>
                                    <span className="text-muted-foreground">Feb 15, 2024</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>New device logged in</span>
                                    <span className="text-muted-foreground">Feb 14, 2024</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ManageAccount