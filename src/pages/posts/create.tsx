import { Button } from "@/components/ui/button";
import HeaderLayout from "@/components/ui/headerlayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronLeft, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost } from "@/hooks/usePost";
import { Link } from "react-router-dom";
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
import { useState } from "react";

const PostCreate = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isLoading,
    onReset,
  } = useCreatePost();

  const onValidateConfirm = handleSubmit(() => {
    setOpenConfirm(true);
  });

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
                    Post Create
                  </h2>
                  <Link
                    to="/posts"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-400 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Post List
                  </Link>
                </div>

                {/* Glass Card */}
                <div className="flex justify-center items-center">
                  <div
                    className="relative w-full max-w-xl rounded-3xl bg-white/20 backdrop-blur-3xl border border-white 
                      shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 sm:p-8"
                  >
                    <form id="confirm-form" onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-5">
                        {/* Title */}
                        <div className="flex flex-col gap-2">
                          <Label>Title</Label>
                          <Input
                            {...register("title")}
                            placeholder="Post Title"
                            className="rounded-lg w-full bg-white/70 placeholder:text-gray-400 shadow-sm
                              focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {errors.title && (
                            <p className="text-sm text-red-500 ms-2 font-semibold">
                              {errors.title.message}
                            </p>
                          )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2">
                          <Label>Description</Label>
                          <Textarea
                            {...register("description")}
                            placeholder="Post Description"
                            className="rounded-lg w-full bg-white/70 placeholder:text-gray-400 shadow-sm
                              focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {errors.description && (
                            <p className="text-sm text-red-500 ms-2 font-semibold">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Buttons Row */}
                      <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
                        {/* Action Buttons */}
                        <div className="flex justify-center md:justify-end gap-3 w-full md:w-auto">
                          <Button
                            type="button"
                            onClick={() => onReset()}
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
                                Save
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="max-w-md">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirmation
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-md font-semibold">
                                  This will be saved into the database. Are you
                                  sure?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer"
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

export default PostCreate;
