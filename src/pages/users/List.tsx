import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import HeaderLayout from "@/components/ui/headerlayout";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays } from "lucide-react";
import React from "react";
import { useState } from "react";

const UserList = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [date1, setDate1] = useState<Date | undefined>(undefined);

  const handleSelectAll = (checked: boolean | string) => {
    if (checked) {
      const allIds = invoices.map((item) => item.ID);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean | string) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const invoices = [
    {
      ID: 1,
      title: "Post Title",
      description: "Post Description",
      status: "Active",
      date: "01/16/2026",
    },
    {
      ID: 2,
      title: "Post Title",
      description: "Post Description",
      status: "Active",
      date: "01/16/2026",
    },
  ];

  return (
    <>
      <SidebarProvider>
        <HeaderLayout />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 dark:bg-slate-950">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
          </header>

          {/* Main Content Area */}
          <div className="min-h-screen flex-1 relative bg-[#f8fafc] dark:bg-slate-950 overflow-hidden p-2 transition-colors duration-300">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[0%] right-[-5%] w-[35%] h-[35%] bg-linear-to-tr from-sky-500/20 to-emerald-500/20 rounded-full blur-[100px]" />

            <div
              className="relative h-full rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-slate-800/50 
                         shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden"
            >
              <div className="relative p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800/80 dark:text-slate-100">
                    User Management
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage and organize your bulletins with ease.
                  </p>
                </div>

                {/* Search Post List */}
                <div className="flex items-center gap-3 mb-6">
                  <Input
                    placeholder="Search Username & Email"
                    className="w-[300px] rounded-lg bg-white/70 border-none
                                focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-50 justify-between font-normal"
                      >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <CalendarDays />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover open={open1} onOpenChange={setOpen1}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-50 justify-between font-normal"
                      >
                        {date1 ? date1.toLocaleDateString() : "Select date"}
                        <CalendarDays />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date1}
                        captionLayout="dropdown"
                        onSelect={(date1) => {
                          setDate1(date1);
                          setOpen1(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Button
                    className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                  >
                    Reset
                  </Button>
                  <Button
                    className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                  >
                    Search
                  </Button>
                </div>

                {/* Unlock/ Delete Button */}
                <div className="flex gap-3 mb-3">
                  <Button
                    className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                  >
                    Unlock
                  </Button>
                  <Button
                    className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                  >
                    Delete
                  </Button>
                </div>

                {/* Post list Table */}
                <div className="rounded-xl border border-white/10 dark:border-slate-800 bg-white/10 dark:bg-slate-900/20 overflow-hidden p-6">
                  <Table>
                    <TableHeader className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md">
                      <TableRow className="hover:bg-transparent border-white/40 dark:border-slate-700">
                        <TableHead className="w-[50px]">
                          {/* <Checkbox className="border-slate-300 dark:border-slate-600" /> */}
                          <Checkbox
                            className="border-slate-300 dark:border-slate-600"
                            checked={selectedRows.length > 0}
                            onCheckedChange={(checked) =>
                              handleSelectAll(checked)
                            }
                          />
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          ID
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          Post Title
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          Description
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          Date
                        </TableHead>
                        <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-6">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow
                          key={invoice.ID}
                          className="group border-white/20 dark:border-slate-800 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors duration-300"
                        >
                          <TableCell>
                            {/* <Checkbox className="border-slate-300 dark:border-slate-600" /> */}
                            <Checkbox
                              className="border-slate-300 dark:border-slate-600"
                              checked={selectedRows.includes(invoice.ID)}
                              onCheckedChange={(checked) =>
                                handleSelectRow(invoice.ID, checked)
                              }
                            />
                          </TableCell>
                          <TableCell className="font-medium text-slate-600 dark:text-slate-400">
                            #{invoice.ID}
                          </TableCell>
                          <TableCell className="font-semibold text-slate-800 dark:text-slate-200">
                            {invoice.title}
                          </TableCell>
                          <TableCell className="text-slate-500 dark:text-slate-400 max-w-[250px] truncate">
                            {invoice.description}
                          </TableCell>
                          <TableCell>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/60 dark:bg-slate-800 border border-white/80 dark:border-slate-700 shadow-sm text-slate-600 dark:text-slate-300">
                              {invoice.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-slate-500 dark:text-slate-500 italic text-xs">
                            {invoice.date}
                          </TableCell>
                          <TableCell className="text-right px-6">
                            <button
                              className="px-4 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-medium 
                                         text-sm shadow-sm border border-white dark:border-slate-700 transition-all hover:scale-105 active:scale-95"
                            >
                              Edit
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default UserList;
