import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  deleteUsersApi,
  getLoginUserApi,
  getSingleUserApi,
  getUsersApi,
  lockUsersApi,
  searchUsersApi,
} from "@/provider/user.api";
import dayjs from "dayjs";
import { CalendarDays, Loader, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PaginationLayout from "@/components/ui/paginationlayout";

const UserList = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState<string>("");
  const [loginUser, setLoginUser] = useState<any>("");
  const [users, setUsers] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchPayload, setSearchPayload] = useState<any>(null);

  useEffect(() => {
    if (isSearching && searchPayload) {
      searchUsersApi(searchPayload, page, perPage).then((res) => {
        setUsers(res.data.data);
        setMeta(res.data.meta);
      });
    } else {
      fetchUsers();
      fetchloginUser();
    }
  }, [page, isSearching, searchPayload]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getUsersApi(page, perPage);
      setUsers(res.data?.data);
      setMeta(res.data?.meta);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchloginUser = async () => {
    try {
      const res = await getLoginUserApi();
      setLoginUser(res.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectAll = (checked: boolean | string) => {
    if (checked) {
      const allIds = users
        .filter((user) => user.id !== loginUser.id)
        .map((user) => user.id);
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

  const handleSearch = async () => {
    const payload = {
      name: keyword || undefined,
      email: keyword || undefined,
      role: role ? Number(role) : undefined,
      start_date: startDate ? dayjs(startDate).format("YYYY-MM-DD") : undefined,
      end_date: endDate ? dayjs(endDate).format("YYYY-MM-DD") : undefined,
    };
    setPage(1);
    setIsSearching(true);
    setSearchPayload(payload);
  };

  const handleUserDetail = async (userId: number) => {
    setOpenDetailDialog(true);
    await getSingleUserApi(userId).then((res) => {
      const user = res.data.data;
      setSelectedUser(user);
    });
  };

  const handleReset = () => {
    setKeyword("");
    setRole("");
    setStartDate(undefined);
    setEndDate(undefined);
    setIsSearching(false);
    setSearchPayload(null);
    setPage(1);
  };

  const selectedUsersData = users.filter((user) =>
    selectedRows.includes(user.id),
  );
  const isAllLocked =
    selectedUsersData.length > 0 &&
    selectedUsersData.every((user) => user.lock_flg);
  const actionLabel = isAllLocked ? "Unlock" : "Lock";
  const lockFlg = isAllLocked ? 0 : 1;

  const handleLockAction = async () => {
    try {
      const res = await lockUsersApi({
        user_ids: selectedRows,
        lock_flg: lockFlg,
      });
      const { message } = res.data;
      toast.success(message);

      setUsers((prev) =>
        prev.map((user) =>
          selectedRows.includes(user.id)
            ? { ...user, lock_flg: lockFlg }
            : user,
        ),
      );

      setSelectedRows([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAction = async () => {
    try {
      const res = await deleteUsersApi(selectedRows);
      const { message } = res.data;
      toast.success(message);

      // remove deleted users from state
      setUsers((prev) =>
        prev.filter((user) => !selectedRows.includes(user.id)),
      );

      setSelectedRows([]);
    } catch (err) {
      console.error(err);
    }
  };

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
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-75 rounded-lg bg-white/70
                                focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Select value={role?.toString()} onValueChange={setRole}>
                    <SelectTrigger className="w-50">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">Admin</SelectItem>
                        <SelectItem value="1">User</SelectItem>
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
                        {startDate
                          ? startDate.toLocaleDateString()
                          : "Created Start Date"}
                        <CalendarDays />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={startDate}
                        captionLayout="dropdown"
                        onSelect={(d) => {
                          setStartDate(d);
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
                        {endDate
                          ? endDate.toLocaleDateString()
                          : "Created End Date"}
                        <CalendarDays />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={endDate}
                        captionLayout="dropdown"
                        onSelect={(d) => {
                          setEndDate(d);
                          setOpen1(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Button
                    onClick={handleReset}
                    className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleSearch}
                    className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                  >
                    Search
                  </Button>
                </div>

                {/* Unlock/ Delete Button */}
                <div className="flex gap-3 mb-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={selectedUsersData.length == 0}
                        className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                      >
                        {actionLabel}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-100">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl">
                          Account Unlock
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-md font-semibold">
                          Are you sure you want to {actionLabel.toLowerCase()}{" "}
                          selected users?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                          transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                          onClick={handleLockAction}
                        >
                          {actionLabel}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={selectedUsersData.length == 0}
                        className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                          transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-100">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl">
                          Delete Users
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-md font-semibold">
                          Do you want to delete the selected users?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                          transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                          onClick={handleDeleteAction}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Pagination */}
                <PaginationLayout meta={meta} setPage={setPage} />
                {/* Post list Table */}
                <div className="rounded-xl border border-white/10 dark:border-slate-800 bg-white/10 dark:bg-slate-900/20 overflow-hidden p-6">
                  <Table>
                    <TableHeader className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md">
                      <TableRow className="hover:bg-transparent border-white/40 dark:border-slate-700">
                        <TableHead className="w-12.5">
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
                          Name
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          Email
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          Role
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          Created Date
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-200">
                          Change Password
                        </TableHead>
                        <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200">
                          User Edit
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <>
                          <TableRow>
                            <TableCell colSpan={9} className="py-10">
                              <div className="flex items-center justify-center">
                                <Loader className="h-10 w-10 animate-spin" />
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
                      ) : users.length > 0 ? (
                        users.map((user) => (
                          <TableRow
                            key={user.id}
                            className="group border-white/20 dark:border-slate-800 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors duration-300"
                          >
                            <TableCell>
                              <Checkbox
                                className="border-slate-300 dark:border-slate-600"
                                checked={selectedRows.includes(user.id)}
                                disabled={loginUser.id == user.id}
                                onCheckedChange={(checked) =>
                                  handleSelectRow(user.id, checked)
                                }
                              />
                            </TableCell>
                            <TableCell className="font-medium text-slate-600 dark:text-slate-400">
                              #{user.id}
                            </TableCell>
                            <TableCell
                              onClick={() => handleUserDetail(user.id)}
                              className="font-semibold text-slate-800 dark:text-slate-200"
                            >
                              {user.name}
                            </TableCell>
                            <TableCell className="text-slate-500 dark:text-slate-400 max-w-62.5 truncate">
                              {user.email}
                            </TableCell>
                            <TableCell>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/60 dark:bg-slate-800 border border-white/80 dark:border-slate-700 shadow-sm text-slate-600 dark:text-slate-300">
                                {user.role ? "User" : "Admin"}
                              </span>
                            </TableCell>
                            <TableCell className="text-slate-500 dark:text-slate-500 italic text-xs">
                              {user.lock_flg ? "Lock" : "Unlock"}
                            </TableCell>
                            <TableCell className="text-slate-500 dark:text-slate-500 italic text-xs">
                              {dayjs(user.created_at).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell className="text-slate-500 dark:text-slate-500 italic text-xs">
                              <Settings />
                            </TableCell>
                            <TableCell className="text-right px-6">
                              <Link to={`/users/edit/${user.id}`}>
                                <button
                                  className="px-4 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-medium
                                         text-sm shadow-sm border border-white dark:border-slate-700 transition-all hover:scale-105 active:scale-95"
                                >
                                  Edit
                                </button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={9}
                            className="py-10 text-center text-gray-500 text-lg"
                          >
                            No Result...
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                <PaginationLayout meta={meta} setPage={setPage} />
                <Dialog
                  open={openDetailDialog}
                  onOpenChange={setOpenDetailDialog}
                >
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl font-bold">
                        User Detail
                      </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center">
                      {/* Profile Icon */}
                      <Avatar className="w-24 h-24 border-2 border-dashed border-slate-300 bg-slate-50 shadow-sm mb-3">
                        <AvatarImage
                          src={selectedUser.profile_path || undefined}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-slate-100 text-slate-400">
                          <div className="flex flex-col items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-12 h-12 opacity-70"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                        </AvatarFallback>
                      </Avatar>

                      <div className="w-full space-y-3 px-6">
                        {[
                          { label: "Name", value: selectedUser.name },
                          {
                            label: "Role",
                            value: selectedUser.role ? "User" : "Admin",
                          },
                          { label: "Email", value: selectedUser.email },
                          { label: "Phone", value: selectedUser.phone ?? "-" },
                          {
                            label: "Date of Birth",
                            value: selectedUser.dob
                              ? dayjs(selectedUser.dob).format("DD-MM-YYYY")
                              : "-",
                          },
                          {
                            label: "Address",
                            value: selectedUser.address ?? "-",
                          },
                          {
                            label: "Created Date",
                            value: dayjs(selectedUser.created_at).format(
                              "DD-MM-YYYY",
                            ),
                          },
                          {
                            label: "Created User",
                            value: selectedUser.created_user,
                          },
                          {
                            label: "Updated Date",
                            value: dayjs(selectedUser.updated_at).format(
                              "DD-MM-YYYY",
                            ),
                          },
                          {
                            label: "Updated User",
                            value: selectedUser.updated_user ?? "-",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-5 gap-4 items-center"
                          >
                            <span className="col-span-2 text-right font-bold text-gray-700">
                              {item.label}
                            </span>
                            <span className="col-span-3 text-left text-gray-600 pl-4">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => setOpenDetailDialog(false)}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default UserList;
