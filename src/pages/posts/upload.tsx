import { Button } from "@/components/ui/button";
import HeaderLayout from "@/components/ui/headerlayout";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePostCsvImport } from "@/hooks/usePost";
import { Label } from "@radix-ui/react-label";
import { ChevronLeft, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const PostUpload = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isLoading,
    onReset,
  } = usePostCsvImport();

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
                    Post Upload
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="">
                        <Label className="block mb-2">CSV File</Label>
                        <Input
                          accept=".csv"
                          {...register("file")}
                          type="file"
                          className="w-full max-w-[350px] cursor-pointer bg-white/50"
                        />
                        {errors.file && (
                          <p className="text-sm text-red-500 ms-2 mt-1 font-semibold">
                            {errors.file.message}
                          </p>
                        )}
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
                          <Button
                            className="relative rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
                          transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
                          >
                            {isLoading ? (
                              <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              "Upload"
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

export default PostUpload;
