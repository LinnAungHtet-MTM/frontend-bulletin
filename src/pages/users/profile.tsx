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
import { useUserProfile } from "@/hooks/useUser";
import dayjs from "dayjs";
import { CalendarDays, Loader } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    control,
    isLoading,
    onReset,
    profilePreview,
    setProfilePreview,
  } = useUserProfile();

  const onValidateConfirm = handleSubmit(() => {
    setOpenConfirm(true);
  });

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
                    User Profile
                  </h2>
                </div>

                {/* Glass Card */}
                <div className="flex justify-center items-center">
                  <div
                    className="relative w-200 rounded-3xl bg-white/20 backdrop-blur-3xl border border-white 
                    shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8"
                  >
                    <form id="confirm-form" onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex gap-4 mb-5">
                        {/* Name */}
                        <div>
                          <Label className="mb-2">Name</Label>
                          <Input
                            {...register("name")}
                            placeholder="User Name"
                            className="rounded-lg w-90 bg-white/70 placeholder:text-gray-400 shadow-2xl
                          focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {errors.name && (
                            <p className="text-sm text-red-500 ms-2 mt-1 font-semibold">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div>
                          <Label className="mb-2">Email Address</Label>
                          <Input
                            {...register("email")}
                            placeholder="Email Address"
                            className="rounded-lg w-90 bg-white/70 placeholder:text-gray-400 shadow-2xl
                          focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {errors.email && (
                            <p className="text-sm text-red-500 ms-2 mt-1 font-semibold">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 mb-5">
                        {/* Role */}
                        <div>
                          <Label className="mb-2">Role</Label>
                          <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                              <>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={field.value === "1"}
                                >
                                  <SelectTrigger className="w-90">
                                    <SelectValue placeholder="Select Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="0">Admin</SelectItem>
                                      <SelectItem value="1">User</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </>
                            )}
                          />
                          {errors.role && (
                            <p className="text-sm text-red-500 ms-2 mt-1 font-semibold">
                              {errors.role.message}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <Label className="mb-2">Phone</Label>
                          <Input
                            {...register("phone")}
                            placeholder="Phone"
                            className="rounded-lg w-90 bg-white/70 placeholder:text-gray-400 shadow-2xl
                          focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-500 ms-2 mt-1 font-semibold">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 mb-5">
                        {/* DOB */}
                        <div>
                          <Label className="mb-2">Date of Birth</Label>
                          <Controller
                            control={control}
                            name="dob"
                            render={({ field }) => (
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-90 justify-between font-normal"
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
                        <div>
                          <Label className="mb-2">Address</Label>
                          <Input
                            {...register("address")}
                            placeholder="Address"
                            className="rounded-lg w-90 bg-white/70 placeholder:text-gray-400 shadow-2xl
                          focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Profile Image */}
                        <div className="flex items-center gap-5 w-200">
                          <div>
                            <Label className="mb-2">Profile</Label>
                            <Input
                              {...register("profile")}
                              type="file"
                              className="max-w-[250px] cursor-pointer"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  setProfilePreview(
                                    URL.createObjectURL(e.target.files[0]),
                                  );
                                }
                              }}
                            />
                            {errors.profile?.message === "string" && (
                              <p className="text-sm text-red-500 ms-2 mt-1 font-semibold">
                                {errors.profile.message}
                              </p>
                            )}
                          </div>
                          <Avatar className="w-24 h-24 border-2 border-dashed border-slate-300 bg-slate-50 shadow-sm">
                            <AvatarImage
                              src={profilePreview || undefined}
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
                                <span className="text-[10px] uppercase font-semibold tracking-wider mt-1">
                                  Profile
                                </span>
                              </div>
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        {/* Rest & Save Button */}
                        <div className="w-full flex justify-center gap-3">
                          <Button
                            type="button"
                            onClick={() => {
                              onReset();
                              setProfilePreview(null);
                            }}
                            className="relative rounded-lg text-white font-medium cursor-pointer bg-red-500 hover:bg-red-600
                          transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                          >
                            Reset
                          </Button>
                          <AlertDialog open={openConfirm}
                            onOpenChange={setOpenConfirm}>
                            <AlertDialogTrigger asChild>
                              <Button type="button"
                                onClick={onValidateConfirm}
                                className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                          transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                              >
                                Save
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
                                  {isLoading ? (
                                    <>
                                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                                      Processing...
                                    </>
                                  ) : (
                                    "Confirm"
                                  )}
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

export default UserProfile;
