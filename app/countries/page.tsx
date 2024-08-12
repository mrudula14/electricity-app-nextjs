"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import CountriesList from "@/components/countries-list";
import { COUNTRIES } from "../constants/countries";

export default function CountriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter countries based on search term
  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main >
      <Input
        type="text"
        placeholder="Search countries"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1 m-10">
        {filteredCountries.map((country) => (
          <CountriesList
            key={country.code}
            id={country.code}
            name={country.name}
          />
        ))}
      </div>
    </main>
  );
}
