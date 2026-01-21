import { ChevronRight, CircleUserRound, FolderInput, ChevronUp, LogOut, UserRoundCog } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import dayjs from "dayjs";
import api from "@/provider/api"

export default function HeaderLayout() {

    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        api.get("api/me")
            .then(res => setUser(res.data?.data))
            .catch(err => {
                console.log(err)
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate('/');
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <Link to="/posts">
                    <div className="flex items-center space-x-3 my-3">
                        {/* Logo */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md font-bold text-white
                            bg-linear-to-r from-indigo-500 via-sky-400 to-emerald-500
                            shadow-[0_0_12px_rgba(99,102,241,0.8)] bg-size-[200%_200%] animate-[gradient_2s_ease_infinite]"
                        >
                            B
                        </div>

                        <span className="text-2xl font-semibold bg-linear-to-r from-indigo-500 via-sky-400 to-emerald-500
                            bg-size-[200%_200%] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(99,102,241,0.8)] 
                            animate-[gradient_2s_ease_infinite] truncate group-data-[collapsible=icon]:hidden"
                        >
                            Bulletin Board
                        </span>
                    </div>
                </Link>
                <SidebarMenu>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-3">Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        {/* User Collapsible Menu */}
                        <Collapsible asChild className="group/collapsible mb-3">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip="User">
                                        <CircleUserRound />
                                        <span>Users</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <a href="#">
                                                    <span>User List</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <a href="#">
                                                    <span>User Create</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>

                        {/* Post Collapsible Menu */}
                        <Collapsible asChild className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip="Post">
                                        <FolderInput />
                                        <span>Posts</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <a href="#">
                                                    <span>Post List</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <a href="#">
                                                    <span>Post Create</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <img src="https://github.com/shadcn.png" className="size-8 rounded-lg" alt="user" />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.role ? 'User' : 'Admin'}</span>
                                        <span className="truncate text-xs">{user?.name}</span>
                                    </div>
                                    <ChevronUp className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="right"
                                align="end"
                                sideOffset={12}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <img src="https://github.com/shadcn.png" className="size-8 rounded-lg" alt="user" />
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{user?.role ? 'User' : 'Admin'}</span>
                                            <span className="truncate text-xs">{user?.name}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <UserRoundCog className="mr-2 size-4" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                                        <LogOut className="mr-2 size-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Last Login At - {dayjs(user?.last_login_at).format("DD/MM/YYYY")}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
