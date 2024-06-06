"use client";

import { useState } from "react";

export default function Emails() {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const response = await fetch("/api/emails");
    if (response.ok) {
      const data = await response.json();
      setEmails(data.messages);
    } else {
      console.error("Failed to fetch emails");
    }
  };

  return (
    <div>
      <h1>Emails</h1>
      <button onClick={fetchEmails}>Fetch Emails</button>
      <ul>
        {emails.map((email: any, index: any) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
}
