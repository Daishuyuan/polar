# 极地大屏可视化系统

---

## Architecture
- **mineJs** 核心代码区域
  - **basic** 存放项目中通用的代码模块
    - **BasicTools.js** 基础通用模块
    - **DataReceiver.js** 数据请求和接收模块
  - **core** 核心部分
    - **MainActivity.js** 所有requireJs配置项和工程初始化
    - **ThreeComponents.js** 三维场景控制
    - **VueComponents.js** Dom元素控制
  - **diagram** 存放与图表生成相关的模块
    - **TableConfig.js** 图表配置<临时模块>
    - **TableFactory.js** 图表生成器
  - **pipeline** ThreeJs三维可视化的所有功能模块
    - **BlockPipeline.js** 渲染引擎主要代码区域
    - **Constants.js** 渲染所需常量声明区域
    - **Controller.js** 控制摄像机的控制器区域
    - **Gaffer.js** 灯光控制器区域
    - **Producer.js** 复杂物体生成器区域
    - **ShaderFactory** 复杂材质生成器区域
    - **Utils.js** 渲染所需的通用函数库区域

## Operation
1. 下载安装git、nodeJs、tomcat、visual code
- git version 2.18.0.windows up
- nodeJs version v8.11.4 up
- tomcat version 8.0 up
- vc no limit
2. 下载私钥id_rsa到系统盘Users下的<你的用户>里的.ssh文件中
- 先删除里面所有内容
3. 使用git bash cd 至tomcat 目录下的webapps/ROOT中
- 键入git clone git@github.com:SynchronizedThread/polar.git（第一次拉取代码）
4. cd 进入polar后，配置你的用户:
- git config --global user.name '你的名字'
- git config --global user.email '你的邮箱'
5. 上传代码步骤:
- git pull （注意，上传前必须先拉取别人的代码）
- git add --all (添加所有你修改的代码) 或者 git add 某个文件（推荐使用）
- git commit -m '修改信息备注'
- git push （上传所有修改代码）
6. 下载代码步骤:
- git pull （拉取代码）
7. 安装json-server <beta阶段>
- npm install -g json-server
8. 启动工程
- 开启tomcat/bin下的startup.bat
- 用json-server开启polar/json下的gauge.json <beta阶段>
9. 如果发现冲突，无法上传代码，禁止使用git push -f
- 如未更改冲突的文件，可以直接删除后拉取代码
- 如果已经更改了冲突文件，可以先将冲突文件保存至桌面，
  然后参照上一条操作之后改回文件，再上传代码
- 如果更改的冲突文件不重要，也可以直接删除

## Authors
1. ZX 周旭 1352059589@qq.com
2. demon 张学俭 775198768@qq.com
3. PPY 魏新宇
4. LSM 刘诗梦 237645045@qq.com
5. SynchronizedThread 戴舒原 2250649759@qq.com
6. WXY  武欣怡  1349301283@qq.com
7. SJC  史景聪  s807718468@163.com

