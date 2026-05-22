'use client'
import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { profileLinks } from '../data/nav-links';
import { useSelector } from 'react-redux';
import { imageViewer } from '@/app/system-admin/lib/imageViewer';
import { useLogout } from '@/util/userLogout';
import { useRouter } from 'next/navigation';

const ProfileMenu = () => {
  const [openDialog, setOpenDialog] = useState(null);
  const account = useSelector((state) => state.account)
  const router = useRouter()
  const logout = useLogout()
  console.log(account?.profileUrl, 'url')
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {
            account?.profileUrl ? (
              <img
                alt="User Profile"
                className="w-10 h-10 rounded-full border-none shadow-lg"
                src={imageViewer(account?.profileUrl) || '/img/team-1-800x800.jpg'}
              />
            )
              :
              (
                <div
                  className="w-10 h-10 rounded-full border-none shadow-lg"
                >
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                    {
                      account?.firestName?.slice(0, 2)
                    }</h1>
                </div>
              )
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {profileLinks.map((link) => (
            <DropdownMenuItem
              key={link.title}
              className="cursor-pointer"
              onClick={() => link.title === 'Orders' ? router.push('/customers/order') : setOpenDialog(link.title)}
            >
              {link.title}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={logout}>
            logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {profileLinks.map((link) => (
        <Dialog key={link.title} open={openDialog === link.title} onOpenChange={() => setOpenDialog(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{link.title}</DialogTitle>
              <DialogDescription>
                {link.description || "Manage your account settings"}
              </DialogDescription>
            </DialogHeader>
            {link.dialogContent}
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};

export default ProfileMenu;
