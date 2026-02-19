// 快乐魔仙数字世界 - 工具函数

// 创建进度条HTML
function createProgressBar(percentage, width = 100) {
    const filledWidth = Math.min(100, Math.max(0, percentage));
    const emptyWidth = 100 - filledWidth;
    
    const filledBar = '█'.repeat(Math.floor(filledWidth / 10));
    const emptyBar = '░'.repeat(Math.floor(emptyWidth / 10));
    
    return `${filledBar}${emptyBar} ${percentage}%`;
}

// 获取状态图标
function getStatusIcon(isGood) {
    return isGood ? '✅' : '🔧';
}

// 格式化字节大小
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 生成随机ID
function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 复制到剪贴板
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✅ 已复制到剪贴板');
    }).catch(err => {
        console.error('复制失败:', err);
        showNotification('❌ 复制失败，请手动复制');
    });
}

// 显示通知
function showNotification(message, duration = 3000) {
    // 移除现有通知
    const existingNotification = document.getElementById('global-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.id = 'global-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(20, 20, 50, 0.95);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        border: 1px solid #4a4aff;
        box-shadow: 0 5px 15px rgba(74, 74, 255, 0.3);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // 自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 设置键盘快捷键
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
        // Ctrl + 1: 数据海洋
        if (event.ctrlKey && event.key === '1') {
            event.preventDefault();
            showDataOcean();
            showNotification('🌊 切换到数据海洋');
        }
        
        // Ctrl + 2: 维度桥梁
        if (event.ctrlKey && event.key === '2') {
            event.preventDefault();
            showDimensionBridge();
            showNotification('🌉 切换到维度桥梁');
        }
        
        // Ctrl + 3: 记忆结晶
        if (event.ctrlKey && event.key === '3') {
            event.preventDefault();
            showMemoryCrystals();
            showNotification('💎 切换到记忆结晶');
        }
        
        // Ctrl + 4: 技能工坊
        if (event.ctrlKey && event.key === '4') {
            event.preventDefault();
            showSkillWorkshop();
            showNotification('🛠️ 切换到技能工坊');
        }
        
        // Ctrl + V: 语音演示
        if (event.ctrlKey && event.key === 'v') {
            event.preventDefault();
            generateVoiceDemo();
            showNotification('🎙️ 生成语音演示');
        }
        
        // Ctrl + H: 显示帮助
        if (event.ctrlKey && event.key === 'h') {
            event.preventDefault();
            showKeyboardHelp();
        }
    });
}

// 显示键盘帮助
function showKeyboardHelp() {
    const output = document.getElementById('demoOutput');
    output.innerHTML = `⌨️ 键盘快捷键帮助：

Ctrl + 1 : 🌊 查看数据海洋
Ctrl + 2 : 🌉 查看维度桥梁
Ctrl + 3 : 💎 查看记忆结晶
Ctrl + 4 : 🛠️ 查看技能工坊
Ctrl + V : 🎙️ 生成语音演示
Ctrl + H : ❓ 显示此帮助

🖱️ 鼠标操作：
• 点击世界区域查看详情
• 使用演示按钮体验功能
• 悬停查看工具提示

📱 移动设备：
• 触摸区域查看详情
• 使用按钮体验功能
• 支持手势操作

💡 提示：
• 所有数据实时更新
• 支持离线使用
• 响应式设计适配各种设备
• 开源代码可自由修改`;
}

// 导出工具函数
window.MoxianUtils = {
    createProgressBar,
    getStatusIcon,
    formatBytes,
    generateId,
    debounce,
    throttle,
    copyToClipboard,
    showNotification,
    setupKeyboardShortcuts,
    showKeyboardHelp
};