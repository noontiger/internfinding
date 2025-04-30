
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Star, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define the chat message type explicitly for clarity
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
}

const InterviewPage = () => {
  const [message, setMessage] = useState('');
  const [aiChat, setAiChat] = useState<ChatMessage[]>([
    { role: 'assistant', content: '你好！我是你的面试教练。请告诉我你想要面试的职位，我会帮助你准备面试。' }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat with explicit type
    const newMessages: ChatMessage[] = [...aiChat, { role: 'user', content: message }];
    setAiChat(newMessages);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      // This would be replaced with actual AI processing in production
      setAiChat([...newMessages, { 
        role: 'assistant', 
        content: '对于前端开发工程师的面试，你应该准备好回答以下几个方面的问题：\n\n1. 前端框架的理解和使用经验\n2. JavaScript的核心概念，如闭包、原型链等\n3. 性能优化的经验和方法\n4. 响应式设计和跨浏览器兼容性的处理\n5. 你过去项目中遇到的挑战和解决方案\n\n你想要我针对哪个方面提供更详细的模拟面试问题？'
      }]);
    }, 1000);
  };

  const coaches = [
    {
      id: 1,
      name: '王教练',
      title: '资深HR顾问',
      rating: 4.9,
      reviews: 120,
      price: 299,
      specialties: ['简历优化', 'HR面试', '薪资谈判'],
      avatar: ''
    },
    {
      id: 2,
      name: '李教练',
      title: '技术面试专家',
      rating: 4.8,
      reviews: 98,
      price: 349,
      specialties: ['技术面试', '算法训练', '系统设计'],
      avatar: ''
    },
    {
      id: 3,
      name: '张教练',
      title: '职业规划顾问',
      rating: 4.7,
      reviews: 85,
      price: 279,
      specialties: ['职业规划', '软技能提升', '求职策略'],
      avatar: ''
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">面试辅导</h1>
        <p className="text-muted-foreground">AI智能助手对话练习或专业教练一对一辅导</p>
      </div>

      <Tabs defaultValue="ai-coach">
        <TabsList>
          <TabsTrigger value="ai-coach">AI面试教练</TabsTrigger>
          <TabsTrigger value="pro-coach">专业教练</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai-coach" className="mt-6">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>面试准备指南</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">热门面试话题</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">自我介绍</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">项目经验</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">技术问题</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">离职原因</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">薪资谈判</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">职业规划</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">热门职位</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">前端开发</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">后端开发</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">产品经理</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">UI设计师</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">数据分析师</Badge>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium mb-2">使用提示</h3>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>描述你想面试的岗位</li>
                          <li>告诉AI你的经验和技能</li>
                          <li>要求AI提供特定类型的问题</li>
                          <li>要求AI评价你的回答</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>统计</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-md p-3 text-center">
                          <p className="text-xs text-muted-foreground">模拟面试</p>
                          <p className="text-xl font-bold mt-1">3</p>
                        </div>
                        <div className="border rounded-md p-3 text-center">
                          <p className="text-xs text-muted-foreground">回答评分</p>
                          <p className="text-xl font-bold mt-1">4.2/5</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2">
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader className="border-b">
                      <CardTitle className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                        </Avatar>
                        AI面试教练
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-4">
                        {aiChat.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 ${
                              msg.role === 'assistant' 
                                ? 'bg-secondary text-secondary-foreground' 
                                : 'bg-primary text-primary-foreground'
                            }`}>
                              <p className="whitespace-pre-line text-sm">{msg.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-4">
                      <div className="flex w-full items-center gap-2">
                        <Input 
                          value={message} 
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="输入你的问题..." 
                          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button size="icon" onClick={sendMessage}>
                          <Send size={18} />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pro-coach" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">专业面试教练</h2>
              <Input className="max-w-xs" placeholder="搜索教练..." />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coaches.map((coach) => (
                <Card key={coach.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={coach.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {coach.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{coach.name}</CardTitle>
                        <CardDescription>{coach.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{coach.rating}</span>
                      <span className="text-sm text-muted-foreground">({coach.reviews}条评价)</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">专长领域：</p>
                      <div className="flex flex-wrap gap-1">
                        {coach.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t mt-2 pt-4">
                    <div className="font-semibold">¥{coach.price}/小时</div>
                    <Button size="sm">预约咨询</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>成为面试教练</CardTitle>
                <CardDescription>分享您的专业知识，帮助求职者提升面试技巧</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="max-w-lg">
                  <p className="text-sm text-muted-foreground mb-4">
                    如果您是人力资源专家、技术面试官或职业规划顾问，欢迎加入我们的教练团队，
                    您可以设定自己的咨询价格和时间，帮助求职者提升面试能力。
                  </p>
                </div>
                <Button>申请成为教练</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewPage;
