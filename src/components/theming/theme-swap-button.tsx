"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const swapTheme = (theme: String, setTheme: React.Dispatch<React.SetStateAction<string>>) => {
  if (theme == "dark") {
    setTheme(() => "light")
  } else if (theme == "light") {
    setTheme(() => "dark")
  }
}

export function ThemeSwapButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant="outline" size="icon" onClick={() => swapTheme(theme ?? "", setTheme)}>
      {
        theme == "dark" ?
          (<Moon />) : (<Sun />)
      }
    </Button>
  );
}
