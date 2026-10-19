// ==================== 1. 统一数据层 (StoreAPI) ====================
const STORAGE_KEY = 'PORTFOLIO_SITE_DATA_V1';
const AUTH_KEY = 'PORTFOLIO_ADMIN_TOKEN';

const DEFAULT_DATA = {
  profile: {
    name: 'Donk',
    role: '全栈开发工程师 / 计算机科学',
    bio: '热爱底层架构与现代 Web 技术，专注于打造简洁高效的工程化产品。可通过右上角「后台管理」随时在线修改本页内容。',
    email: 'donk666@example.com'
  },
  skills: [
    { id: 1, name: 'JavaScript / TypeScript / HTML5', level: 92 },
    { id: 2, name: 'Linux / C++ / 计算机体系结构', level: 85 },
    { id: 3, name: 'Java EE / Python / Spark 数据分析', level: 80 },
    { id: 4, name: 'Git / Chrome Extension 开发', level: 90 }
  ],
  projects: [
    {
      id: 1,
      title: '图提取 (ImageGrab)',
      tag: 'Chrome Manifest V3',
      desc: '一键提取淘宝、京东、拼多多详情页图片并批量转换为 PNG 下载。'
    },
    {
      id: 2,
      title: 'ZenFlow 专注空间',
      tag: 'Web Audio API',
      desc: '极简番茄钟与白噪音环境音生成器，提升编码与备考专注度。'
    },
    {
      id: 3,
      title: '智能家居触控终端',
      tag: 'Qt / Embedded Linux',
      desc: '基于 ARM 开发板的跨平台图形界面家居控制系统。'
    }
  ],
  posts: [
    {
      id: 1,
      title: 'AI 驱动的软件开发标准流程实践',
      date: '2026-10-19',
      summary: '通过编写清晰的 PRD、TECH_DESIGN 与 AGENTS 规范文档，让 AI 精准生成高质量可维护代码。'
    },
    {
      id: 2,
      title: 'Chrome 插件 Manifest V3 跨域图片处理技巧',
      date: '2026-10-18',
      summary: '详解如何利用 Fetch、createImageBitmap 与 Canvas 实现将 WebP 格式统一无损转换为 PNG。'
    }
  ]
};

const StoreAPI = {
  getData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
      return structuredClone(DEFAULT_DATA);
    }
    return JSON.parse(raw);
  },
  saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    renderAll();
  },
  reset() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    renderAll();
  }
};

// HTML 转义防止 XSS
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

// ==================== 2. 渲染前台与后台视图 ====================
function renderAll() {
  const data = StoreAPI.getData();

  // 渲染前台个人信息
  document.getElementById('nav-logo').textContent = `${data.profile.name}.Dev`;
  document.getElementById('hero-name').textContent = `你好，我是 ${data.profile.name}`;
  document.getElementById('hero-role').textContent = data.profile.role;
  document.getElementById('hero-bio').textContent = data.profile.bio;
  document.getElementById('hero-email').textContent = data.profile.email;

  // 渲染前台技能
  document.getElementById('skills-list').innerHTML = data.skills.map((s) => `
    <div class="card">
      <div style="display:flex;justify-content:space-between;">
        <strong>${escapeHtml(s.name)}</strong>
        <span>${Number(s.level)}%</span>
      </div>
      <div class="progress-bg"><div class="progress-bar" style="width:${Number(s.level)}%"></div></div>
    </div>
  `).join('');

  // 渲染前台项目
  document.getElementById('projects-list').innerHTML = data.projects.map((p) => `
    <div class="card">
      <span class="tag">${escapeHtml(p.tag)}</span>
      <h3 style="margin-bottom:8px;">${escapeHtml(p.title)}</h3>
      <p style="color:var(--muted);font-size:14px;line-height:1.6;">${escapeHtml(p.desc)}</p>
    </div>
  `).join('');

  // 渲染前台博客
  document.getElementById('posts-list').innerHTML = data.posts.map((post) => `
    <div class="card">
      <span style="color:var(--muted);font-size:12px;">📅 ${escapeHtml(post.date)}</span>
      <h3 style="margin:8px 0;">${escapeHtml(post.title)}</h3>
      <p style="color:var(--muted);font-size:14px;line-height:1.6;">${escapeHtml(post.summary)}</p>
    </div>
  `).join('');

  // 渲染后台表单与统计
  document.getElementById('stat-skills').textContent = data.skills.length;
  document.getElementById('stat-projects').textContent = data.projects.length;
  document.getElementById('stat-posts').textContent = data.posts.length;

  document.getElementById('edit-name').value = data.profile.name;
  document.getElementById('edit-role').value = data.profile.role;
  document.getElementById('edit-email').value = data.profile.email;
  document.getElementById('edit-bio').value = data.profile.bio;

  document.getElementById('admin-skills-list').innerHTML = data.skills.map((s) => `
    <div class="admin-list-item">
      <span>${escapeHtml(s.name)} (${s.level}%)</span>
      <button class="btn danger" onclick="deleteItem('skills', ${s.id})">删除</button>
    </div>
  `).join('');

  document.getElementById('admin-projects-list').innerHTML = data.projects.map((p) => `
    <div class="admin-list-item">
      <span><strong>${escapeHtml(p.title)}</strong> [${escapeHtml(p.tag)}]</span>
      <button class="btn danger" onclick="deleteItem('projects', ${p.id})">删除</button>
    </div>
  `).join('');

  document.getElementById('admin-posts-list').innerHTML = data.posts.map((post) => `
    <div class="admin-list-item">
      <span><strong>${escapeHtml(post.title)}</strong> (${escapeHtml(post.date)})</span>
      <button class="btn danger" onclick="deleteItem('posts', ${post.id})">删除</button>
    </div>
  `).join('');
}

// ==================== 3. 后台交互与权限控制 ====================
function switchView(view) {
  const isFront = view === 'front';
  document.getElementById('front-view').classList.toggle('hidden', !isFront);
  document.getElementById('admin-view').classList.toggle('hidden', isFront);
  if (!isFront) checkAuth();
}

function checkAuth() {
  const isLogged = sessionStorage.getItem(AUTH_KEY) === 'TOKEN_VALID';
  document.getElementById('login-panel').classList.toggle('hidden', isLogged);
  document.getElementById('dashboard-panel').classList.toggle('hidden', !isLogged);
}

function handleLogin() {
  const pwd = document.getElementById('admin-pwd').value;
  if (pwd === 'admin123') {
    sessionStorage.setItem(AUTH_KEY, 'TOKEN_VALID');
    document.getElementById('admin-pwd').value = '';
    checkAuth();
  } else {
    alert('密码错误！默认演示密码为：admin123');
  }
}

function handleLogout() {
  sessionStorage.removeItem(AUTH_KEY);
  checkAuth();
}

function saveProfile() {
  const data = StoreAPI.getData();
  data.profile.name = document.getElementById('edit-name').value.trim() || '未命名';
  data.profile.role = document.getElementById('edit-role').value.trim();
  data.profile.email = document.getElementById('edit-email').value.trim();
  data.profile.bio = document.getElementById('edit-bio').value.trim();
  StoreAPI.saveData(data);
  alert('✅ 个人信息已更新！点击顶部导航返回前台即可查看效果。');
}

function addSkill() {
  const name = document.getElementById('new-skill-name').value.trim();
  const level = Math.min(100, Math.max(1, Number(document.getElementById('new-skill-level').value) || 80));
  if (!name) return alert('请输入技能名称');
  const data = StoreAPI.getData();
  data.skills.push({ id: Date.now(), name, level });
  StoreAPI.saveData(data);
  document.getElementById('new-skill-name').value = '';
}

function addProject() {
  const title = document.getElementById('new-proj-title').value.trim();
  const tag = document.getElementById('new-proj-tag').value.trim() || 'Project';
  const desc = document.getElementById('new-proj-desc').value.trim();
  if (!title) return alert('请输入项目名称');
  const data = StoreAPI.getData();
  data.projects.unshift({ id: Date.now(), title, tag, desc });
  StoreAPI.saveData(data);
  document.getElementById('new-proj-title').value = '';
  document.getElementById('new-proj-desc').value = '';
}

function addPost() {
  const title = document.getElementById('new-post-title').value.trim();
  const summary = document.getElementById('new-post-summary').value.trim();
  if (!title) return alert('请输入文章标题');
  const today = new Date().toISOString().split('T')[0];
  const data = StoreAPI.getData();
  data.posts.unshift({ id: Date.now(), title, date: today, summary });
  StoreAPI.saveData(data);
  document.getElementById('new-post-title').value = '';
  document.getElementById('new-post-summary').value = '';
}

function deleteItem(type, id) {
  if (!confirm('确定要删除该条目吗？此操作不可撤销。')) return;
  const data = StoreAPI.getData();
  data[type] = data[type].filter((item) => item.id !== id);
  StoreAPI.saveData(data);
}

function resetDefaultData() {
  if (confirm('确定要恢复默认初始数据吗？')) {
    StoreAPI.reset();
  }
}

function copyEmail() {
  const email = StoreAPI.getData().profile.email;
  navigator.clipboard.writeText(email);
  alert(`已复制邮箱：${email}`);
}

// ==================== 4. Canvas 动态星空背景 ====================
function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = window.innerWidth < 768 ? 50 : 120;
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: (Math.random() * 0.015) + 0.005
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230, 234, 242, ${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

// 启动初始化
renderAll();
initStarfield();