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
import PaginationLayout from "@/components/ui/paginationlayout";
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
  deletePostApi,
  getPostApi,
  getPostsApi,
  searchPostsApi,
} from "@/provider/post.api";
import dayjs from "dayjs";
import { CalendarDays, Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PostList = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<string>("");
  const [meta, setMeta] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPayload, setSearchPayload] = useState<any>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>({});
  const perPage = 10;

  useEffect(() => {
    if (isSearching && searchPayload) {
      searchPostsApi(searchPayload, page, perPage).then((res) => {
        setPosts(res.data.data);
        setMeta(res.data.meta);
      });
    } else {
      fetchPosts();
    }
  }, [page, isSearching, searchPayload]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await getPostsApi(page, perPage);
      setPosts(res.data?.data);
      setMeta(res.data?.meta);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    const payload = {
      keyword: keyword || undefined,
      status: status ? Number(status) : undefined,
      date: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
    };
    setPage(1);
    setIsSearching(true);
    setSearchPayload(payload);
  };

  const handleReset = () => {
    setKeyword("");
    setStatus("");
    setDate(undefined);
    setIsSearching(false);
    setSearchPayload(null);
    setPage(1);
  };

  const currentPageIds = posts.map((post) => post.id);

  const isAllChecked =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id));

  const handleCheckAll = (checked: boolean) => {
    setSelectedIds((prev) => {
      if (checked === true) {
        // add current page ids
        return Array.from(new Set([...prev, ...currentPageIds]));
      }
      if (checked === false) {
        // remove current page ids
        return prev.filter((id) => !currentPageIds.includes(id));
      }
      return prev;
    });
  };

  const handleRowCheck = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  const handlePostDetail = async (userId: number) => {
    setOpenDetailDialog(true);
    await getPostApi(userId).then((res) => {
      const post = res.data.data;
      setSelectedPost(post);
    });
  };

  const handleDeleteAction = async () => {
    try {
      const res = await deletePostApi(selectedIds);
      const { message } = res.data;
      toast.success(message);

      setPosts((prev) => prev.filter((user) => !selectedIds.includes(user.id)));
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <SidebarProvider>
        <HeaderLayout />
        <SidebarInset className="flex flex-col overflow-hidden">
          {" "}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 dark:bg-slate-950">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
          </header>
          {/* Main Content Area */}
          <div className="flex-1 relative bg-[#f8fafc] dark:bg-slate-950 overflow-hidden p-2 sm:p-4">
            {/* Background */}
            <div className="hidden lg:block absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="relative flex flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-slate-800/50 shadow-sm">
              {/* Header & Filters Section */}
              <div className="p-4 sm:p-6 lg:p-8 pb-0 sm:pb-0 lg:pb-0 shrink-0">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-800/80 dark:text-slate-100">
                    Post Management
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage and organize your posts with ease.
                  </p>
                </div>

                <div className="flex flex-col gap-4 mb-4">
                  {/* Search inputs grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:flex items-end gap-3">
                    <div className="flex flex-col gap-1.5 w-full xl:w-auto">
                      <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search Post & Description..."
                        className="w-full xl:w-[300px] bg-white/70 focus-visible:ring-1 focus-visible:ring-sky-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full xl:w-auto">
                      <Select
                        value={status?.toString()}
                        onValueChange={setStatus}
                      >
                        <SelectTrigger className="w-full xl:w-48">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="0">Inactive</SelectItem>
                            <SelectItem value="1">Active</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-full xl:w-48 justify-between font-normal"
                          >
                            <span className="truncate">
                              {date ? date.toLocaleDateString() : "Search Date"}
                            </span>
                            <CalendarDays className="h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(d) => {
                              setDate(d);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex gap-2 w-full xl:w-auto">
                      <Button
                        onClick={handleSearch}
                        className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                      >
                        Search
                      </Button>
                      <Button
                        onClick={handleReset}
                        className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Area */}
              <div className="p-4 sm:p-6 lg:p-8 pt-2">
                <div className="flex justify-between gap-4 border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link to="/posts/create">
                      <Button
                        className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                      >
                        Create
                      </Button>
                    </Link>
                    <Button
                      className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                    >
                      Upload
                    </Button>
                    <Button
                      disabled={selectedIds.length === 0}
                      className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                    >
                      Download
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={selectedIds.length === 0}
                          className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="max-w-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Posts</AlertDialogTitle>
                          <AlertDialogDescription>
                            Do you want to delete the selected posts? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAction}
                            className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {selectedIds.length > 0 && (
                      <span className="text-xs text-slate-500 ml-1 animate-in fade-in slide-in-from-left-2">
                        {selectedIds.length} posts selected
                      </span>
                    )}
                  </div>

                  <div className="flex justify-center md:justify-end">
                    <PaginationLayout meta={meta} setPage={setPage} />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm shadow-sm overflow-hidden my-3">
                  <div className="overflow-x-auto">
                    <Table className="w-full border-collapse min-w-[1000px] table-fixed">
                      <TableHeader className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md">
                        <TableRow className="hover:bg-transparent border-b border-slate-200/60 dark:border-slate-800">
                          <TableHead className="w-[60px] pl-6">
                            <Checkbox
                              checked={isAllChecked}
                              onCheckedChange={(checked) =>
                                handleCheckAll(checked as boolean)
                              }
                              className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                            />
                          </TableHead>

                          {/* ID Column */}
                          <TableHead className="w-[80px] font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-wider py-4">
                            ID
                          </TableHead>

                          {/* Title Column */}
                          <TableHead className="w-[15%] font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-wider py-4">
                            Post Title
                          </TableHead>

                          {/* Description Column */}
                          <TableHead className="w-[25%] font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-wider py-4">
                            Post Description
                          </TableHead>

                          {/* Status Column */}
                          <TableHead className="w-[100px] font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-wider py-4">
                            Post Status
                          </TableHead>

                          {/* Created Date Column */}
                          <TableHead className="w-[100px] font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-wider py-4 text-center">
                            Post Date
                          </TableHead>

                          {/* User Edit */}
                          <TableHead className="w-[120px] text-right font-bold text-slate-600 dark:text-slate-300 uppercase text-[11px] tracking-wider py-4 pr-6">
                            Post Edit
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell
                              colSpan={9}
                              className="py-20 text-center"
                            >
                              <Loader className="h-10 w-10 animate-spin text-sky-500 mx-auto" />
                            </TableCell>
                          </TableRow>
                        ) : posts.length > 0 ? (
                          posts.map((post) => (
                            <TableRow
                              key={post.id}
                              className="group border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-200"
                            >
                              <TableCell className="pl-6">
                                <Checkbox
                                  checked={selectedIds.includes(post.id)}
                                  onCheckedChange={(checked) =>
                                    handleRowCheck(post.id, checked as boolean)
                                  }
                                  className="border-slate-300 dark:border-slate-600"
                                />
                              </TableCell>
                              <TableCell className="font-mono text-xs text-slate-400">
                                #{post.id}
                              </TableCell>
                              <TableCell
                                onClick={() => handlePostDetail(post.id)}
                                className="font-semibold text-slate-700 dark:text-slate-200 cursor-pointer hover:text-sky-500 hover:underline truncate"
                              >
                                {post.title}
                              </TableCell>
                              <TableCell className="text-slate-500 dark:text-slate-400 truncate text-sm">
                                {post.description}
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                  {post.status ? "Active" : "Inactive"}
                                </span>
                              </TableCell>
                              <TableCell className="text-xs text-slate-500 dark:text-slate-500 italic text-center">
                                {post.created_at
                                  ? dayjs(post.created_at).format("DD/MM/YYYY")
                                  : "N/A"}
                              </TableCell>
                              <TableCell className="text-right pr-6">
                                <Link to={`/posts/edit/${post.id}`}>
                                  <button
                                    className="inline-flex items-center justify-center rounded-lg px-4 py-1.5 cursor-pointer
                                    text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white
                                    dark:bg-slate-800 text-indigo-600 shadow-sm transition-all hover:scale-105 active:scale-95"
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
                              className="py-10 text-center text-slate-500"
                            >
                              No Result...
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <PaginationLayout meta={meta} setPage={setPage} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              Post Detail
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center">
            <div className="w-full space-y-3 px-6">
              {[
                { label: "Title", value: selectedPost.title },
                { label: "Description", value: selectedPost.description },
                {
                  label: "Status",
                  value: selectedPost.status ? "Active" : "Inactive",
                },
                {
                  label: "Created Date",
                  value: dayjs(selectedPost.created_at).format("DD-MM-YYYY"),
                },
                {
                  label: "Created User",
                  value: selectedPost.created_user,
                },
                {
                  label: "Updated Date",
                  value: dayjs(selectedPost.updated_at).format("DD-MM-YYYY"),
                },
                {
                  label: "Updated User",
                  value: selectedPost.updated_user ?? "-",
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
    </>
  );
};

export default PostList;
