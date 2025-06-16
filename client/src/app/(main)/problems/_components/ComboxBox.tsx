"use client";

import { useState, Dispatch } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const AVAILABLE_LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
];

type Props = {
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<React.SetStateAction<string>>;
};

function ComboxBox({ selectedLanguage, setSelectedLanguage }: Props) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    AVAILABLE_LANGUAGES.find((lang) => lang.value === selectedLanguage)
      ?.label ?? "Select language";

  const handleSelect = (value: string) => {
    setSelectedLanguage(value === selectedLanguage ? "" : value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedLabel}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {AVAILABLE_LANGUAGES.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  onSelect={handleSelect}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLanguage === lang.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {lang.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboxBox;
