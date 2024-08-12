// components/CustomTabs.tsx

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * CustomTabs Component
 *
 * This is a reusable wrapper around the Shadcn Tabs component.
 * It provides a simpler interface and better documentation for ease of use.
 *
 * Props:
 * - tabs: An array of objects, each containing a `label` and `content`.
 * - defaultValue: The default active tab (optional).
 */
type Tab = {
  label: string;
  content: React.ReactNode;
};

interface CustomTabsProps {
  tabs: Tab[];
  defaultValue?: string;
  children?: React.ReactNode;
}

export const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, defaultValue }) => {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.label} className="TabsRoot w-full ">
      <TabsList className="TabsList" className="grid w-full grid-cols-3 bg-neutral-100">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}  className="data-[state=active]:bg-white">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
