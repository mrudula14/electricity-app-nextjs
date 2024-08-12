"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPrice } from "@/utils/actions/getPrice";

function CountriesList({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const currentUnixTime = Math.floor(Date.now() / 1000);
  const { data, error, isLoading } = useQuery({
    queryKey: ["price", id],
    queryFn: () => getPrice(id),
  });
  const closestUnix = data?.unix_seconds.reduce((prev: any, curr: any) =>
    Math.abs(curr - currentUnixTime) < Math.abs(prev - currentUnixTime)
      ? curr
      : prev
  );
  const closestIndex = data?.unix_seconds.indexOf(closestUnix);
  const handleSendData = async (code: string) => {
    const response = await fetch("/api/store-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      const result = await response.json();
    } else {
      console.error("Failed to store data");
    }
    router.push(`/countries/${code}`);
  };
  return (
    <div
      className="text-blue-500 hover:underline cursor-pointer"
      onClick={() => handleSendData(id)}
    >
      <Card className="w-auto">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading price</p>
          ) : (
            <p>Current Price: {data?.price[closestIndex]} EUR</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CountriesList;
