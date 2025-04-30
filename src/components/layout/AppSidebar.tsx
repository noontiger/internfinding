
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { FileText, BookOpen, MessageSquare, Headphones } from 'lucide-react';

const navigationItems = [
  {
    title: '岗位管理',
    path: '/jobs',
    icon: FileText,
  },
  {
    title: '简历优化',
    path: '/resume',
    icon: BookOpen,
  },
  {
    title: '面试辅导',
    path: '/interview',
    icon: MessageSquare,
  },
  {
    title: '面试复盘',
    path: '/review',
    icon: Headphones,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="h-14 px-4 flex items-center border-b">
        <span className="text-xl font-bold text-primary">求职助手</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>功能导航</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`
                      }
                    >
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
