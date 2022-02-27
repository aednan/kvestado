import React from "react";
import { Dialog, Combobox } from "@headlessui/react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export default function CommandPalette({ cPData }) {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");

  const filteredData = query
    ? cPData.filter((data) =>
        data.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // const cPData = [
  //   { id: 1, title: "C++", description: "Lorem Lorem Lorem Lorem" },
  //   { id: 2, title: "C", description: "Lorem Lorem Lorem Lorem" },
  //   { id: 3, title: "JAVA", description: "Lorem Lorem Lorem Lorem" },
  //   { id: 4, title: "Python", description: "Lorem Lorem Lorem Lorem" },
  // ];
  // const cPData = [1, 2, 3, 4];

  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      className="fixed inset-0 p-4 pt-40"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
      <Combobox
        as="div"
        className="relative mx-auto max-w-2xl divide-y-2 divide-gray-100 overflow-hidden rounded-lg bg-white
        shadow-2xl ring-1 ring-black/5
        "
      >
        <div className="flex items-center gap-2 px-4">
          <MdSearch className="h-7 w-7 text-gray-500" />

          <Combobox.Input
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            className="h-14 w-full border-0 bg-transparent text-base text-gray-800 
            placeholder:text-base placeholder:text-gray-400
             focus:border-none focus:outline-none focus:ring-0 "
            placeholder="Search..."
          />
        </div>

        {filteredData.length > 0 && (
          <Combobox.Options
            static
            className="max-h-96 divide-y divide-gray-50 overflow-y-auto py-4  text-base"
          >
            {filteredData.map((dataObject) => (
              <Combobox.Option key={dataObject.id}>
                {({ active }) => (
                  <div
                    className={`space-x-2 py-2 px-6 ${
                      active ? "bg-blue-500" : "bg-white"
                    }  `}
                  >
                    <span className="text-base font-medium text-gray-900">
                      {dataObject.title}
                    </span>
                    <span className="text-sm text-gray-400">
                      {dataObject.description}
                    </span>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}

        {query && filteredData.length === 0 && (
          <p className="p-4 text-base text-gray-500"> No results found.</p>
        )}
      </Combobox>
    </Dialog>
  );
}
