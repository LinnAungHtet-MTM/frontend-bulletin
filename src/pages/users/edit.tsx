import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import HeaderLayout from "@/components/ui/headerlayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  CalendarDays,
  ChevronLeft,
  Download,
  Loader,
  Trash,
} from "lucide-react";
import { useRef, useState } from "react";
import { useUpdateUser } from "@/hooks/useUser";
import { Controller } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
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

const UserEdit = () => {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    onSubmit,
    onReset,
    isLoading,
    profilePreview,
    setProfilePreview,
  } = useUpdateUser(Number(userId));

  const onValidateConfirm = handleSubmit(() => {
    setOpenConfirm(true);
  });

  const handleFile = (file?: File) => {
    if (!file) return;
    setProfilePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <SidebarProvider>
        <HeaderLayout />
        <SidebarInset className="flex flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 dark:bg-slate-950">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
          </header>

          {/* Main Content Area */}
          <div className="flex-1 relative bg-[#f8fafc] dark:bg-slate-950 overflow-hidden p-2 sm:p-4">
            <div className="hidden lg:block absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="relative flex flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-slate-800/50 shadow-sm">
              <div className="relative p-4 sm:p-8">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800/80 dark:text-slate-100">
                    User Edit
                  </h2>
                  <Link
                    to="/users"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-400 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to User List
                  </Link>
                </div>

                {/* Glass Card */}
                <div className="flex justify-center items-center">
                  <div
                    className="relative w-full max-w-4xl rounded-3xl bg-white/20 backdrop-blur-3xl border border-white 
      shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 sm:p-8"
                  >
                    <form id="confirm-form" onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                          <Label>Name</Label>
                          <Input
                            {...register("name")}
                            placeholder="User Name"
                            className="rounded-lg w-full bg-white/70 placeholder:text-gray-400 shadow-sm
              focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {errors.name && (
                            <p className="text-sm text-red-500 ms-2 font-semibold">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-2">
                          <Label>Email Address</Label>
                          <Input
                            {...register("email")}
                            placeholder="Email Address"
                            className="rounded-lg w-full bg-white/70 placeholder:text-gray-400 shadow-sm
              focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {errors.email && (
                            <p className="text-sm text-red-500 ms-2 font-semibold">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* Role */}
                        <div className="flex flex-col gap-2">
                          <Label>Role</Label>
                          <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full bg-white/70">
                                  <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="0">Admin</SelectItem>
                                    <SelectItem value="1">User</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.role && (
                            <p className="text-sm text-red-500 ms-2 font-semibold">
                              {errors.role.message}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-2">
                          <Label>Phone</Label>
                          <Input
                            {...register("phone")}
                            placeholder="Phone"
                            className="rounded-lg w-full bg-white/70 placeholder:text-gray-400 shadow-sm
              focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-500 ms-2 font-semibold">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        {/* DOB */}
                        <div className="flex flex-col gap-2">
                          <Label>Date of Birth</Label>
                          <Controller
                            control={control}
                            name="dob"
                            render={({ field }) => (
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-between font-normal bg-white/70"
                                  >
                                    {field.value ? (
                                      dayjs(field.value).format("MM-DD-YYYY")
                                    ) : (
                                      <span>Date of Birth</span>
                                    )}
                                    <CalendarDays className="ml-2 h-4 w-4 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? dayjs(field.value).toDate()
                                        : undefined
                                    }
                                    onSelect={(date) => {
                                      field.onChange(date);
                                      setOpen(false);
                                    }}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            )}
                          />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-2">
                          <Label>Address</Label>
                          <Input
                            {...register("address")}
                            placeholder="Address"
                            className="rounded-lg w-full bg-white/70 placeholder:text-gray-400 shadow-sm
              focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                      </div>

                      {/* Profile */}
                      <div className="flex flex-col gap-8 max-w-4xl rounded-xl">
                        <div className="space-y-4">
                          <Label className="font-bold text-slate-700 dark:text-slate-200">
                            Profile Photo
                          </Label>

                          <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
                            {/* left side image */}
                            <div className="relative group">
                              <Avatar
                                className="w-32 h-32 border-4 border-white shadow-xl ring-1 ring-slate-200 dark:ring-slate-700
                                  bg-slate-100 dark:bg-slate-800"
                              >
                                <AvatarImage
                                  src={profilePreview ?? undefined}
                                  className="object-cover"
                                />
                                <AvatarFallback className="bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
                                  <div className="flex flex-col items-center">
                                    <span className="text-xs font-bold opacity-70">
                                      NO IMAGE
                                    </span>
                                  </div>
                                </AvatarFallback>
                              </Avatar>

                              {/* Remove Button - Only shows when image exists */}
                              {profilePreview && (
                                <button
                                  type="button"
                                  onClick={() => setProfilePreview(null)}
                                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full
                                  bg-white dark:bg-slate-800 text-red-500 shadow-lg border
                                  border-red-100 dark:border-red-900 flex items-center justify-center
                                  hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                  title="Remove Photo"
                                >
                                  <Trash className="w-4 h-4 cursor-pointer" />
                                </button>
                              )}
                            </div>

                            {/* right side drag & drop */}
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.currentTarget.classList.add(
                                  "border-blue-500",
                                  "bg-blue-50",
                                  "dark:bg-blue-950/30",
                                );
                              }}
                              onDragLeave={(e) => {
                                e.preventDefault();
                                e.currentTarget.classList.remove(
                                  "border-blue-500",
                                  "bg-blue-50",
                                  "dark:bg-blue-950/30",
                                );
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                e.currentTarget.classList.remove(
                                  "border-blue-500",
                                  "bg-blue-50",
                                  "dark:bg-blue-950/30",
                                );
                                handleFile(e.dataTransfer.files?.[0]);
                              }}
                              className="flex-1 w-full min-h-[128px] cursor-pointer rounded-xl
                                border-2 border-dashed border-slate-300 dark:border-slate-600
                                bg-white dark:bg-slate-900 hover:border-blue-400
                                dark:hover:border-blue-500 hover:bg-slate-50
                                dark:hover:bg-slate-800 transition-all duration-200
                                flex flex-col items-center justify-center gap-3 p-4 group"
                            >
                              <Controller
                                name="profile"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                      field.onChange(e.target.files);
                                      handleFile(e.target.files?.[0]);
                                    }}
                                  />
                                )}
                              />

                              <div
                                className="p-3 rounded-full bg-blue-50 dark:bg-blue-950/40
                                group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors"
                              >
                                <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                              </div>

                              <div className="text-center">
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p
                                  className="text-xs mt-1 uppercase tracking-wider font-medium
                                  text-slate-400 dark:text-slate-500"
                                >
                                  PNG, JPG, JPEG (Max 2MB)
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Error Message */}
                          {errors.profile && (
                            <p className="text-sm text-red-500 dark:text-red-400 font-medium flex items-center gap-2 px-2">
                              {String(errors.profile.message)}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full flex justify-end gap-3">
                          <Button
                            type="button"
                            onClick={() => {
                              onReset();
                            }}
                            className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                          transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                          >
                            Reset
                          </Button>
                          <AlertDialog
                            open={openConfirm}
                            onOpenChange={setOpenConfirm}
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                type="button"
                                onClick={onValidateConfirm}
                                className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                          transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                              >
                                {isLoading ? (
                                  <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                  </>
                                ) : (
                                  "Save"
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-110">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl">
                                  Confirmation
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-md font-semibold">
                                  This will be saved into the database. Are you
                                  sure?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  className="cursor-pointer"
                                  onClick={() => setOpenConfirm(false)}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  type="submit"
                                  form="confirm-form"
                                  disabled={isLoading}
                                  className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                          transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                                >
                                  Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default UserEdit;
