"use client"; // Ensure this directive is at the top

import React, { useEffect, useState } from "react";
import Templates from "@/app/(data)/Templates";
import TemplateCard from "./TemplateCard";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

interface Props {
  userSearchInput: string; // Search term from parent component
}

function TemplateListSection({ userSearchInput }: Props) {
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(Templates);

  useEffect(() => {
    if (userSearchInput) {
      const filterData = Templates.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(Templates);
    }
  }, [userSearchInput]);

  return (
    <div>
      {templateList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {templateList.map((item, index) => (
            <TemplateCard key={index} {...item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>No results found for "{userSearchInput}".</p>
        </div>
      )}
    </div>
  );
}

export default TemplateListSection;
