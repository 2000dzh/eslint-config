import path from 'node:path';
import fs from 'fs-extra';

/**
 * 构建 ESLint 配置包的工具脚本
 * 功能：替换包引用路径并复制依赖文件到 dist 目录
 */

// 配置参数
const BASE_MODULE_NAME = 'base';

/**
 * 验证并获取模块名称
 * @returns {string} 模块名称
 */
function getModuleName () {
  const lifecycleEvent = process.env.npm_lifecycle_event;

  if (!lifecycleEvent || !lifecycleEvent.includes(':')) {
    throw new Error('请通过正确的 npm 脚本运行此命令，格式为: <script>:<module>');
  }

  const moduleName = lifecycleEvent.split(':')[1];

  if (!moduleName) {
    throw new Error('未指定要构建的模块名称');
  }

  console.log(`开始构建模块: ${moduleName}`);
  return moduleName;
}

/**
 * 获取并处理配置文件内容
 * @param {string} modulePath 模块路径
 * @returns {Promise<{newContent: string, baseFiles: Array<string>}>} 处理后的内容和需要复制的文件列表
 */
async function processConfigContent (modulePath) {
  try {
    const configPath = path.resolve(modulePath, 'index.js');
    const content = await fs.readFile(configPath, 'utf8');

    // 替换引用路径
    const newContent = content.replace(
      /require\.resolve\('eslint-config-dzh-base\/([^']+)'\)/g,
      `require.resolve('./${BASE_MODULE_NAME}/$1')`
    );

    return { newContent };
  } catch (error) {
    console.error('读取或处理配置文件失败:', error);
    throw error;
  }
}

/**
 * 构建指定模块
 */
async function buildModule () {
  try {
    // 获取模块信息
    const moduleName = getModuleName();
    const modulePath = path.resolve('./packages', moduleName);
    const outputPath = path.resolve(modulePath, 'dist');
    const baseModulePath = path.resolve('./packages', BASE_MODULE_NAME);
    const baseOutputPath = path.resolve(outputPath, BASE_MODULE_NAME);

    // 验证模块目录是否存在
    if (!await fs.pathExists(modulePath)) {
      throw new Error(`模块目录不存在: ${modulePath}`);
    }

    // 处理配置内容
    const { newContent } = await processConfigContent(modulePath);

    // 清理并创建输出目录
    console.log('清理输出目录...');
    await fs.emptyDir(outputPath);
    await fs.ensureDir(baseOutputPath);

    // 复制基础文件
    await fs.copy(baseModulePath, baseOutputPath, {
      filter (src) {

        // 获取路径的所有部分
        const pathParts = src.split(path.sep);
        // 检查是否包含node_modules目录（完全匹配目录名）
        if (pathParts.includes('node_modules')) {
          return false;
        }

        // 只复制 js 文件
        if (fs.statSync(src).isFile()) {
          return src.endsWith('.js');
        }
        // 复制目录
        return true
      }
    }).then(() => {
      console.log('基础文件复制完成');
    }).catch(err => {
      console.error('基础文件复制失败:', err);
      throw err;
    });


    // 写入处理后的配置文件
    const outputConfigPath = path.resolve(outputPath, 'index.js');
    await fs.writeFile(outputConfigPath, newContent);
    console.log(`已生成配置文件: ${outputConfigPath}`);

    console.log(`模块 ${moduleName} 构建完成!`);
  } catch (error) {
    console.error('构建过程失败:', error);
  }
}

// 执行构建
buildModule();