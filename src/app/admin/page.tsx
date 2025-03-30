"use client"
import React,{useEffect} from 'react'
import AdminSkill from '@/components/AdminSkill'
import AdminProject from '@/components/AdminProject'
import '@/app/globals.css'
import { logout } from '@/app/lib/action/auth';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import Button from '@/components/ui/Button'


function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; 
    if (!session || session.user?.name !== "chayanon poolwas" || session.user?.email !== "moswit7@gmail.com") {

      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

    return (
      <div className="wrapper-admin">
        <div className="setting">
          <h1 className="setting-title">Setting</h1>

          <Button className='logout' onClick={() => logout  } size="icon" variant="outline">Logout</Button>

          <div className="setting_skill">
            <AdminSkill />
          </div>
          <div className="setting_project">
            <AdminProject />
          </div>
        </div>
      </div>
    );

  return null; 
}

export default Page;