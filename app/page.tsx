"use client";

import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex gap-4 p-6">
        <button onClick={() => router.push('/course')} className="px-6 py-2 text-gray-700 hover:text-black font-medium hover:cursor-pointer">Courses</button>
        <button onClick={() => router.push('/service')} className="px-6 py-2 text-gray-700 hover:text-black font-medium hover:cursor-pointer">Services</button>
      </div>
      <div className="w-full p-6 text-sm text-gray-600">
        <p>Font styling not used as same because it was not mentioned in figma</p>
      </div>
    </>
  )
}