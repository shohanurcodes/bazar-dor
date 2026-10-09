
"use client";

import { useEffect, useState } from "react";

export default function DateDisplay() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setDate(formattedDate);
  }, []);

  return (
    <p className="mt-1 text-sm text-gray-500">
      {date}
    </p>
  );
}

