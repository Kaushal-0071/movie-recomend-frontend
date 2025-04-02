"use client";
import GenreSelector from "@/components/genreSelector";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { UseridContext } from "./context/Useridcontex";
import { useRouter } from "next/navigation";

export default function Home() {
const {Userid, setUserid}=useContext(UseridContext)
const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
  <input placeholder="enter user id" type="number" onChange={(e) => setUserid(e.target.value)} className="border border-black" required/>
  <GenreSelector />
  <Button onClick={() => router.push(`/Home`)} type="submit">Submit</Button>
    </div>
  );
}
