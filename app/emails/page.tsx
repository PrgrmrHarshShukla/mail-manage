"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { act, useEffect, useState } from "react";

export default function Emails() {
  const [emails, setEmails] = useState([]);
  const [nums, setNums] = useState(5);
  const {data: session}: any = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const [sess, setSess] = useState<any>("");

  const get1Mail = async (eDeets: any, userEmail: any, acT: any) => {
    try {
      const mail = await fetch(`https://www.googleapis.com/gmail/v1/users/${userEmail}/messages/${eDeets.id}`, {
        headers: {
          Authorization: `Bearer ${acT}`,
        }
      });
      const mailRes = await mail.json();
      // console.log("Email real: ", mailRes);
      const mainLabel: any = mailRes.labelIds;
      const result: any = mainLabel.find((item: any) => item.startsWith("CATEGORY"));
      const labelToUse: any = result.split("CATEGORY_")[1];

      const mainAIKey: any = localStorage.getItem("mailmanagerKey");

      const label: any = await fetch(`/api/getCategory`, {
        method: "POST",
        body: JSON.stringify({
          key: mainAIKey,
          message: mailRes.snippet
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let labelRes: any = await label.json();
      if(!label.ok) {
        labelRes = "General";
      }
      console.log("Label res: ", labelRes);


      const obj = {
        snippet: mailRes.snippet,
        senderName: mailRes.payload.headers.find((header: any) => header.name === "From").value,
        category: labelRes
      }
      
      return obj;
    } 
    catch (error: any) {
      console.log("Error fetching 1 email: ", error);  
      return {
        snippet: "",
        senderName: "",
        category: ""
      }
    }
  }




  const fetchEmails = async (sess: any) => {
    const userEmail: any = sess ? sess.user.email : null;
    const acT: any = sess ? sess.accessToken : null;

    // console.log("User email: ", userEmail);
    // console.log("Access token: ", acT);
    

    if(!userEmail) return;
    if(!acT) return;


    try {
      const allMails: any = await fetch(`https://www.googleapis.com/gmail/v1/users/${userEmail}/messages`, {
        headers: {
          Authorization: `Bearer ${acT}`,
        }
      });
      // console.log("All emails: ", allMails);
      
      
      const res: any = await allMails.json();
      // console.log("Single start res: ", res.messages);
      

      let actualEmails: any = [];
      
      for(let i = 0; i < nums && i < res.messages.length; i++) {
        // console.log("Email deets: ", res.messages[i]);
        
        const mail = await get1Mail(res.messages[i], userEmail, acT);
        actualEmails.push(mail);
      }

      

      // console.log("Actual emails: ", actualEmails[0]);

      setEmails(actualEmails);
      
    } 
    catch (error: any) {
      // alert("Error fetching emails!");
      console.log("Error fetching emails: ", error);  
    }
  };

  useEffect(() => {
    
    setSess(session);

  }, [session])

  useEffect(() => {
    const starter = async () => {

      if(!sess) return;

      // console.log("session user in emails: ", sess.user.email);
      // console.log("Session acT in emails: ", sess.accessToken);
      

      await fetchEmails(sess);
    }
    starter()
  }, [sess, nums, session])



  // console.log("session in emails: ", session);
  


  const handleClassify = async () => {
    try {
      
    } 
    catch (error: any) {
      console.error("Error classifying emails: ", error);  
    }
  }




  return (
    <div className="bg-black min-h-screen w-screen flex flex-col justify-start items-center pt-12">
      <div className="w-[90%] flex flex-row justify-between items-center text-white mb-8">
        <div className="flex flex-row justify-start items-center text-white gap-2">
          <Image 
            src={sess ? sess.user.image : ""} 
            width={40} 
            height={40} 
            className="rounded-full border-[3px] border-white" 
            alt="Image" 
          />
          <div className="flex flex-col justify-start items-start text-white font-bold">
            <span>{sess ? sess.user.name : "name"}</span>
            <span>{sess ? sess.user.email : "email"}</span>
          </div>
        </div>

        <button
            onClick={() => {
              // localStorage.removeItem("mailmanagerKey");
              signOut();
            }}
            className="flex flex-col justify-center items-center px-20 py-4 font-bold">
            <div>
                Logout
            </div>
        </button>
      </div>

      
      <div className="w-[90%] flex flex-row justify-between items-center text-white mb-12">
        <input value={nums} onChange={(e: any) => setNums(e.target.value)} type="number" readOnly className=" border-[3px] rounded-[3px] text-right bg-black border-white w-[50px] pl-2 font-bold outline-none resize-none"  />
        <button
            onClick={handleClassify}
            className="flex flex-col justify-center items-center px-20 py-4"
          >
            Classify
        </button>
      </div>


      <div className="w-[90%] flex flex-col justify-start items-center text-white">
        {
          emails.length > 0 ?
          emails.map((obj: any, index: number) => (
            <div key={index} className="text-white border w-[100%]  rounded-[5px] mb-4 px-4 py-2 flex flex-col justify-start items-start">
                <div className="font-semibold my-4 w-[100%] flex flex-row justify-between items-center pr-2 sm:pr-8">
                  <span>{obj.senderName}</span>
                  {obj.category == "General" && <div className={`text-purple-800  font-bold`}>{obj.category}</div>}
                  {obj.category == "Important" && <div className={`text-green-500  font-bold`}>{obj.category}</div>}
                  {obj.category == "Social" && <div className={`text-blue-500  font-bold`}>{obj.category}</div>}
                  {obj.category == "Marketing" && <div className={`text-yellow-500  font-bold`}>{obj.category}</div>}
                  {obj.category == "Spam" && <div className={`text-red-500  font-bold`}>{obj.category}</div>}
                </div>
                <div>{obj.snippet}</div>
            </div>
          ))
          :
          <div className="text-white font-bold text-3xl animate-pulse mt-20">
            Loading emails...
          </div>
        }
      </div>
    </div>
  );
}



