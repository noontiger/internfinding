
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, MicOff, Clock, FileText, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const ReviewPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcriptText, setTranscriptText] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<null | {
    strengths: string[];
    improvements: string[];
    overall: string;
  }>(null);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate transcript generation
      setTimeout(() => {
        setTranscriptText(`面试官：您好，请简单介绍一下自己和相关经验。

我：您好，我是张三，有5年的前端开发经验。我熟悉React、Vue等主流框架，并且在过去的项目中负责过多个中大型应用的前端架构和开发工作。我特别擅长性能优化和组件设计，在上一家公司，我主导了一个电商平台的前端重构，使页面加载速度提高了40%。

面试官：您能详细说一下是如何进行性能优化的吗？

我：是的，我主要从几个方面进行了优化。首先是代码层面，使用了懒加载、虚拟列表等技术减少首屏加载内容；其次是资源层面，通过webpack优化打包策略，实现了更细粒度的代码分割；最后在缓存策略上，合理设置了HTTP缓存头和使用Service Worker实现了离线缓存。这些措施综合起来大大提升了性能。

面试官：您在团队协作方面有什么经验？

我：嗯...我认为良好的沟通是团队协作的基础。我通常会...呃...与团队成员保持定期的技术讨论和代码审核，确保代码质量和一致性。我也会积极参与...那个...项目规划和进度跟踪，以便及时调整开发策略。`);
      }, 1500);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const analyzeTranscript = () => {
    if (!transcriptText) return;
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        strengths: [
          '清晰描述了技术经验和专长',
          '提供了具体的性能优化实例和数据',
          '回答问题时从多个方面进行了阐述'
        ],
        improvements: [
          '团队协作部分回答时出现了停顿和犹豫，可以更流畅自信',
          '可以增加更多实际项目中协作解决问题的案例',
          '建议增加对未来职业规划和对应职位的期望阐述'
        ],
        overall: '整体表现良好，技术能力描述清晰有力，展示了丰富的项目经验和问题解决能力。团队协作部分可以准备更多具体案例，增强回答的流畅度和说服力。面试中语速适中，但在回答团队协作问题时有些犹豫，建议进一步练习以提高自信和流畅度。'
      });
    }, 2000);
  };

  const clearTranscript = () => {
    setTranscriptText(null);
    setAnalysis(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">面试复盘</h1>
        <p className="text-muted-foreground">录音转文字，AI分析面试表现</p>
      </div>

      <Tabs defaultValue="record">
        <TabsList>
          <TabsTrigger value="record">录制面试</TabsTrigger>
          <TabsTrigger value="history">历史记录</TabsTrigger>
        </TabsList>
        
        <TabsContent value="record" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>录制面试</CardTitle>
                <CardDescription>
                  录制您的面试过程或练习回答，AI将帮助分析
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10 space-y-6">
                <div 
                  onClick={toggleRecording}
                  className={`w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {isRecording ? <MicOff size={36} /> : <Mic size={36} />}
                </div>
                <div className="text-center">
                  {isRecording ? (
                    <>
                      <p className="text-sm font-medium mb-2">正在录制...</p>
                      <div className="flex items-center gap-2 justify-center">
                        <Clock size={16} className="text-red-500" />
                        <span className="font-mono">{formatTime(recordingTime)}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {transcriptText ? '点击重新录制' : '点击开始录制'}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-xs text-muted-foreground text-center max-w-xs">
                  录制您的面试过程或练习回答，系统会自动转录为文字并分析您的表现，提供改进建议
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>转录文本</CardTitle>
                  <CardDescription>
                    自动转录的面试内容
                  </CardDescription>
                </div>
                {transcriptText && (
                  <Button variant="ghost" size="icon" onClick={clearTranscript}>
                    <X size={18} />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="min-h-[300px] space-y-4">
                {!transcriptText && !isRecording ? (
                  <div className="h-full flex items-center justify-center text-center p-8">
                    <p className="text-sm text-muted-foreground">
                      录制完成后，面试内容将在此处显示
                    </p>
                  </div>
                ) : isRecording ? (
                  <div className="space-y-4 flex flex-col items-center justify-center h-[200px]">
                    <p className="text-sm text-muted-foreground">正在录音...</p>
                    <Progress value={45} className="w-48 h-2" />
                  </div>
                ) : (
                  <>
                    <Textarea 
                      value={transcriptText || ''} 
                      onChange={(e) => setTranscriptText(e.target.value)}
                      className="min-h-[200px]"
                    />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">编辑文本</Button>
                      <Button size="sm" onClick={analyzeTranscript}>
                        分析面试表现
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle>AI分析报告</CardTitle>
                <CardDescription>对您面试表现的详细分析和改进建议</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">亮点</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysis.strengths.map((item, i) => (
                      <li key={i} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-medium">改进建议</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysis.improvements.map((item, i) => (
                      <li key={i} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-medium">总体评价</h3>
                  <p className="text-sm">{analysis.overall}</p>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button>保存分析报告</Button>
                  <Button variant="outline">生成改进练习</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">面试记录</CardTitle>
            </CardHeader>
            <CardContent>
              {analysis ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="bg-muted rounded-md p-2">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">模拟面试记录</div>
                      <div className="text-sm text-muted-foreground">前端开发工程师 · 今天</div>
                    </div>
                    <Button variant="ghost" size="sm">查看</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-center text-muted-foreground py-6">暂无面试记录</p>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">常见面试问题集</CardTitle>
              <CardDescription>精选面试问题库，帮助更好地准备</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="border rounded-lg p-3">
                  <p className="font-medium text-sm">技术岗位常见问题 (25题)</p>
                  <p className="text-xs text-muted-foreground mt-1">包含编程基础、算法、系统设计等问题</p>
                  <Button variant="link" size="sm" className="px-0">查看详情</Button>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="font-medium text-sm">行为面试问题 (18题)</p>
                  <p className="text-xs text-muted-foreground mt-1">团队协作、压力处理、职业规划等问题</p>
                  <Button variant="link" size="sm" className="px-0">查看详情</Button>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="font-medium text-sm">HR面试常见问题 (15题)</p>
                  <p className="text-xs text-muted-foreground mt-1">薪资期望、离职原因、公司文化等问题</p>
                  <Button variant="link" size="sm" className="px-0">查看详情</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewPage;
