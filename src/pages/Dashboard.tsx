
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, MessageSquare, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: '岗位信息整理',
    description: '上传岗位信息，AI助手自动分类整理成表格，追踪申请进度',
    icon: FileText,
    path: '/jobs',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    title: '简历优化',
    description: '上传简历，AI助手根据岗位要求进行针对性优化',
    icon: BookOpen,
    path: '/resume',
    color: 'bg-green-50 text-green-500',
  },
  {
    title: '面试辅导',
    description: 'AI助手面试练习或联系专业求职顾问进行辅导',
    icon: MessageSquare,
    path: '/interview',
    color: 'bg-purple-50 text-purple-500',
  },
  {
    title: '面试复盘',
    description: '录音转文字，AI助手分析面试表现并提供改进建议',
    icon: Headphones,
    path: '/review',
    color: 'bg-amber-50 text-amber-500',
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">欢迎使用求职助手</h1>
        <p className="text-muted-foreground">使用AI助手提升您的求职体验，增加成功率</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="overflow-hidden border">
            <CardHeader className="p-4">
              <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-3`}>
                <feature.icon size={20} />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription className="h-12">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link to={feature.path}>立即使用</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>使用统计</CardTitle>
            <CardDescription>您的平台使用情况概览</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground">整理岗位</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
              <div className="border rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground">优化简历</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
              <div className="border rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground">面试练习</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
              <div className="border rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground">面试复盘</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>近期活动</CardTitle>
            <CardDescription>您最近的平台活动</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-center text-muted-foreground py-8">暂无近期活动</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
