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
import { CalendarDays, ChevronLeft, Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useCreateUser } from "@/hooks/useUser";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const UserCreate = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    control,
    isLoading,
    onReset,
  } = useCreateUser();

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
                    User Create
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-5">
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

                        {/* Password */}
                        <div className="relative flex flex-col gap-2">
                          <Label>Password</Label>
                          <div className="relative">
                            <Input
                              {...register("password")}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="rounded-lg w-full bg-white/70 placeholder:text-gray-400 shadow-sm
                focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-sm text-red-500 ms-2 font-semibold">
                              {errors.password.message}
                            </p>
                          )}
                        </div>

                        {/* Password Confirmation */}
                        <div className="relative flex flex-col gap-2">
                          <Label>Confirm Password</Label>
                          <div className="relative">
                            <Input
                              {...register("confirm_password")}
                              type={confirmPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              className="rounded-lg w-full bg-white/70 placeholder:text-gray-400 shadow-sm
                focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmPassword(!confirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
                            >
                              {confirmPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {errors.confirm_password && (
                            <p className="text-sm text-red-500 ms-2 font-semibold">
                              {errors.confirm_password.message}
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

                      {/* Profile & Buttons Row */}
                      <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
                        {/* Profile Image Preview */}
                        <div className="flex items-center gap-5 w-full">
                          <div className="">
                            <Label className="mb-2 block">Profile</Label>
                            <Input
                              {...register("profile")}
                              type="file"
                              className="w-full max-w-[250px] cursor-pointer bg-white/50"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  setProfilePreview(
                                    URL.createObjectURL(e.target.files[0]),
                                  );
                                }
                              }}
                            />
                          </div>
                          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-slate-300 bg-slate-50 shadow-sm shrink-0">
                            <AvatarImage
                              src={profilePreview || undefined}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-slate-100 text-slate-400">
                              <div className="flex flex-col items-center justify-center">
                                <svg
                                  className="w-8 h-8 opacity-70"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M12 7a4 4 0 100-8 4 4 0 000 8z"
                                  />
                                </svg>
                                <span className="text-[8px] uppercase font-bold">
                                  Profile
                                </span>
                              </div>
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center md:justify-end gap-3 w-full md:w-auto">
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
                          <Button
                            disabled={isLoading}
                            className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                      transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                          >
                            {isLoading ? (
                              <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save"
                            )}
                          </Button>
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

export default UserCreate;
