
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, FileText } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const JobsPage = () => {
  const [jobText, setJobText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedJob, setParsedJob] = useState<null | {
    title: string;
    company: string;
    jobType: string;
    salary: string;
    requirements: string[];
    responsibilities: string[];
  }>(null);

  const processJobText = () => {
    if (!jobText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // This would be replaced with actual AI processing in production
      setParsedJob({
        title: '前端开发工程师',
        company: '科技有限公司',
        jobType: '全职',
        salary: '15k-25k',
        requirements: [
          '熟练掌握HTML, CSS, JavaScript等前端技术',
          '熟悉React, Vue等前端框架',
          '良好的团队协作能力',
          '本科及以上学历，计算机相关专业',
        ],
        responsibilities: [
          '负责公司产品的前端开发工作',
          '与后端开发人员协作，完成产品功能开发',
          '优化前端性能，提升用户体验',
        ]
      });
      setIsProcessing(false);
    }, 2000);
  };

  const clearParsedJob = () => {
    setParsedJob(null);
    setJobText('');
  };

  const jobStatus = [
    { id: 1, title: '前端开发工程师', company: 'ABC科技', date: '2023-04-25', status: '已投递' },
    { id: 2, title: 'UI设计师', company: 'XYZ创意', date: '2023-04-23', status: '面试中' },
    { id: 3, title: '产品经理', company: '未来科技', date: '2023-04-20', status: '已拒绝' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已投递': return 'bg-blue-100 text-blue-800';
      case '面试中': return 'bg-amber-100 text-amber-800';
      case '已拒绝': return 'bg-red-100 text-red-800';
      case '已录用': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">岗位信息整理</h1>
        <p className="text-muted-foreground">上传岗位信息并跟踪申请进度</p>
      </div>

      <Tabs defaultValue="analyze">
        <TabsList>
          <TabsTrigger value="analyze">岗位分析</TabsTrigger>
          <TabsTrigger value="track">申请跟踪</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analyze" className="space-y-6 mt-6">
          {!parsedJob ? (
            <Card>
              <CardHeader>
                <CardTitle>新增岗位</CardTitle>
                <CardDescription>
                  粘贴岗位描述文本，AI助手将自动分析关键信息
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea 
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    placeholder="请粘贴完整的岗位描述..."
                    className="min-h-[200px]"
                  />
                  <Button 
                    onClick={processJobText} 
                    disabled={isProcessing || !jobText.trim()} 
                    className="w-full"
                  >
                    {isProcessing ? '正在分析...' : '分析岗位信息'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{parsedJob.title}</CardTitle>
                  <CardDescription>{parsedJob.company} · {parsedJob.jobType} · {parsedJob.salary}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={clearParsedJob}>
                  <X size={18} />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">岗位要求</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {parsedJob.requirements.map((req, i) => (
                      <li key={i} className="text-sm">{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">工作职责</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {parsedJob.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm">{resp}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button>保存岗位</Button>
                  <Button variant="outline">导出为PDF</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">最近分析的岗位</CardTitle>
            </CardHeader>
            <CardContent>
              {jobStatus.length > 0 ? (
                <div className="space-y-4">
                  {jobStatus.slice(0, 2).map(job => (
                    <div key={job.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="bg-muted rounded-md p-2">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground">{job.company}</div>
                      </div>
                      <Button variant="ghost" size="sm">查看</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-center text-muted-foreground py-6">暂无分析记录</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="track" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">申请进度追踪</CardTitle>
              <Button size="sm">
                <Plus size={16} className="mr-1" /> 添加申请
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>岗位名称</TableHead>
                    <TableHead>公司</TableHead>
                    <TableHead>申请日期</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="w-[100px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobStatus.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(job.status)} variant="outline">
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">编辑</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">统计概览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">已投递</p>
                  <p className="text-2xl font-bold mt-1 text-blue-500">3</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">面试中</p>
                  <p className="text-2xl font-bold mt-1 text-amber-500">1</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">已拒绝</p>
                  <p className="text-2xl font-bold mt-1 text-red-500">1</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">已录用</p>
                  <p className="text-2xl font-bold mt-1 text-green-500">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobsPage;
