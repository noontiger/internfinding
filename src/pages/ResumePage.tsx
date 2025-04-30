
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ResumePage = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleOptimize = () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // This would be replaced with actual AI processing in production
      setOptimizedResume(`
# 张三 - 前端开发工程师

## 联系方式
- 电话: 1XX-XXXX-XXXX
- 邮箱: zhangsan@example.com
- 城市: 北京

## 专业技能
- **前端技术**: 精通HTML5, CSS3, JavaScript (ES6+), TypeScript
- **前端框架**: 熟练使用React.js, Vue.js构建复杂Web应用
- **状态管理**: 熟练掌握Redux, Vuex等状态管理工具
- **UI框架**: 精通Ant Design, Element UI, Tailwind CSS
- **构建工具**: 熟悉使用Webpack, Vite, Babel等工具优化前端工程
- **版本控制**: 熟练使用Git进行团队协作
- **性能优化**: 丰富的Web应用性能优化经验

## 工作经历

### ABC科技有限公司 | 高级前端开发工程师 | 2020-至今
- 负责公司核心产品前端架构设计和开发工作
- 主导实现了基于微前端架构的模块化系统，提升了团队开发效率30%
- 优化了产品的前端性能，使页面加载速度提升50%，用户体验显著改善
- 建立了前端自动化测试流程，测试覆盖率达到85%以上
- 指导初级开发人员，提供代码审核和技术指导

### XYZ互联网公司 | 前端开发工程师 | 2018-2020
- 参与电商平台的前端开发，负责用户端和管理端的实现
- 使用Vue.js构建了响应式的商品展示和搜索系统
- 实现了复杂的购物车和结算流程，提供流畅的用户体验
- 参与前端性能优化，减少50%的首屏加载时间

## 教育背景
计算机科学与技术 | 本科 | XX大学 | 2014-2018

## 项目经历

### 企业级ERP系统前端重构
- 主导使用React.js和Ant Design重构了传统ERP系统
- 设计并实现了模块化的应用架构，支持多团队并行开发
- 优化了数据处理流程，提高了大量数据的渲染性能
- 实现了复杂的表单验证和数据可视化功能

### 移动端H5营销活动平台
- 开发了支持多种营销活动模板的H5平台
- 实现了响应式设计，确保在各种移动设备上的良好体验
- 优化了图片加载策略，减少了60%的流量消耗
- 集成了社交媒体分享功能，增加了活动传播率

## 证书
- 前端开发工程师认证
- 网页设计师认证
      `);
      setIsProcessing(false);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Actual file handling would be implemented here
    setResumeText("上传的简历内容将显示在这里...");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">简历优化</h1>
        <p className="text-muted-foreground">使用AI助手根据岗位需求优化您的简历</p>
      </div>

      <Tabs defaultValue="optimize">
        <TabsList>
          <TabsTrigger value="optimize">简历优化</TabsTrigger>
          <TabsTrigger value="history">优化历史</TabsTrigger>
        </TabsList>
        
        <TabsContent value="optimize" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>上传简历</CardTitle>
                <CardDescription>
                  上传您的简历，支持文本粘贴或文件上传
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-muted'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('resume-file')?.click()}
                >
                  <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">拖放文件或点击上传</p>
                  <p className="text-xs text-muted-foreground">支持PDF, Word, TXT格式</p>
                  <input 
                    type="file" 
                    id="resume-file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.txt" 
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">或粘贴简历内容</p>
                  <Textarea 
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="在此粘贴您的简历文本..."
                    className="min-h-[200px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>岗位信息</CardTitle>
                <CardDescription>
                  粘贴目标岗位信息，AI将根据岗位需求优化简历
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="在此粘贴岗位描述..."
                  className="min-h-[200px]"
                />
                
                <Button 
                  onClick={handleOptimize} 
                  disabled={isProcessing || !resumeText.trim() || !jobDescription.trim()} 
                  className="w-full"
                >
                  {isProcessing ? '正在优化...' : '开始优化简历'}
                </Button>

                {isProcessing && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">正在分析简历与岗位匹配度...</p>
                    <Progress value={45} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {optimizedResume && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  优化后的简历
                </CardTitle>
                <CardDescription>
                  AI已根据岗位需求优化了您的简历，突出了相关技能和经验
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap text-sm">
                  {optimizedResume}
                </div>
                <div className="flex gap-4">
                  <Button>下载优化后的简历</Button>
                  <Button variant="outline">保存到历史记录</Button>
                </div>
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h4 className="font-medium text-sm mb-2">优化亮点</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>调整了技能顺序，将岗位相关技能置前</li>
                    <li>优化了工作经历描述，突出了与岗位相关的成就</li>
                    <li>添加了量化的成果展示</li>
                    <li>调整了整体结构使内容更加清晰</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">简历优化历史</CardTitle>
            </CardHeader>
            <CardContent>
              {optimizedResume ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="bg-muted rounded-md p-2">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">前端开发工程师 - 简历优化</div>
                      <div className="text-sm text-muted-foreground">ABC科技有限公司 · 今天</div>
                    </div>
                    <Button variant="ghost" size="sm">查看</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-center text-muted-foreground py-6">暂无优化历史</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">优化统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">优化次数</p>
                  <p className="text-2xl font-bold mt-1">{optimizedResume ? 1 : 0}</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">节省时间</p>
                  <p className="text-2xl font-bold mt-1">{optimizedResume ? '2小时' : '0'}</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">平均匹配度</p>
                  <p className="text-2xl font-bold mt-1">{optimizedResume ? '85%' : '0'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumePage;
