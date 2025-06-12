// 初始化元素
let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");
let yesScreen = document.querySelector(".yes-screen");
let videoScreen = document.querySelector(".video-screen");
let music = document.getElementById("music");

// 获取URL参数中的用户名
const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

// 防止 `null` 变成 `"null"`
if (username) {
    questionText.innerText = questionText.innerText + safeUsername;
}

// 成功页面的文字
const loveText = `!!!喜欢你!! ( >᎑<)♡︎ᐝ  ${
    username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
    "？你认真的吗…",
    "要不再想想？",
    "不许选这个！ ",
    "我会很伤心…",
    "不行:(",
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
    clickCount++;
    
    // 让 Yes 变大，每次放大 2 倍
    let yesSize = 1 + clickCount * 1.2;
    yesButton.style.transform = `scale(${yesSize})`;
    
    // 挤压 No 按钮，每次右移 50px
    let noOffset = clickCount * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;
    
    // 让图片和文字往上移动
    let moveUp = clickCount * 25;
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;
    
    // No 文案变化（前 5 次变化）
    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }
    
    // 图片变化（前 5 次变化）
    if (clickCount === 1) mainImage.src = "img/2.jpg"; // 震惊
    if (clickCount === 2) mainImage.src = "img/3.jpg"; // 思考
    if (clickCount === 3) mainImage.src = "img/4.jpg"; // 生气
    if (clickCount === 4) mainImage.src = "img/5.jpg"; // 哭
    if (clickCount >= 5) mainImage.src = "img/5.jpg"; // 之后一直是哭
});

// Yes 按钮点击后，显示成功页面，3秒后跳转到视频页面
// yesButton点击事件处理函数
// yesButton点击事件处理函数
yesButton.addEventListener("click", function () {
    // 隐藏主界面
    document.querySelector(".container").style.display = "none";
    
    // 显示成功页面
    document.querySelector(".yes-text").innerText = loveText;
    yesScreen.style.opacity = 1;
    yesScreen.style.pointerEvents = "auto";
    
    // 3秒后显示视频页面
    setTimeout(() => {
        yesScreen.style.opacity = 0;
        yesScreen.style.pointerEvents = "none";
        
        videoScreen.style.display = "flex";
        
        // 尝试播放音乐
        music.play().catch(err => {
            console.log('音乐自动播放失败，需要用户交互:', err);
        });
        
        // 用户点击页面后尝试再次播放音乐
        document.body.addEventListener('click', () => {
            music.play().catch(err => {
                console.error('音乐播放失败:', err);
            });
        }, { once: true });
        
        // 替换为增强版视频播放逻辑
        const video = document.getElementById("confessionVideo");
        const playPrompt = document.querySelector(".play-prompt");
        
        // 尝试自动播放
        video.play().catch(error => {
            console.error('视频自动播放失败:', error);
            playPrompt.style.display = "block";
            
            // 点击事件
            videoScreen.addEventListener("click", () => {
                video.play().catch(err => {
                    // 显示更详细的错误提示
                    playPrompt.innerHTML = "视频加载失败，请点击重试";
                    console.error('手动播放仍失败:', err);
                });
            }, { once: true });
        });
    }, 3000);
});

