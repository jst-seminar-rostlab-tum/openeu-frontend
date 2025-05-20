"use client"

import type React from "react"

import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onValueChange, placeholder }: SearchBarProps) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(e.target.value)
    },
    [onValueChange],
  )

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={onChange}
        className="pl-8"
      />
    </div>
  )
}
