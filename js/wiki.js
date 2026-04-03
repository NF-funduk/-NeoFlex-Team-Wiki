(function() {
    // ========== СОСТОЯНИЕ ==========
    let currentPage = 'dashboard';
    let sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    let currentUser = {
        name: localStorage.getItem('neoflexUsername') || 'Сотрудник',
        role: 'Team Member'
    };
    
    // ========== СПИСОК ПРАЗДНИКОВ ==========
    const holidays = [
        { month: 0, day: 1, name: 'Новый год', emoji: '🎄' },
        { month: 1, day: 14, name: 'День святого Валентина', emoji: '💕' },
        { month: 2, day: 8, name: 'Международный женский день', emoji: '🌹' },
        { month: 4, day: 1, name: 'Праздник весны и труда', emoji: '🌷' }
    ];
    
    // ========== СТРАНИЦЫ ==========
    const pages = {
        dashboard: {
            title: 'Информация',
            content: `
                <h1>Добро пожаловать в Team Wiki</h1>
                <p>Центральное место для всей внутренней документации NeoFlex.</p>
                
                <h2><i class="fas fa-folder-tree"></i> Разделы вики</h2>
                <div class="card-grid">
                    <div class="card" data-page="team-structure">
                        <div class="card-icon"><i class="fas fa-sitemap"></i></div>
                        <div class="card-title">Структура</div>
                        <div class="card-desc">Организационная структура NeoFlex</div>
                    </div>
                    <div class="card" data-page="roles">
                        <div class="card-icon"><i class="fas fa-tags"></i></div>
                        <div class="card-title">Роли и обязанности</div>
                        <div class="card-desc">Описание всех ролей на проекте</div>
                    </div>
                    <div class="card" data-page="staff-list">
                        <div class="card-icon"><i class="fas fa-id-card"></i></div>
                        <div class="card-title">Команда проекта</div>
                        <div class="card-desc">Список руководящей команды</div>
                    </div>
                    <div class="card" data-page="rules">
                        <div class="card-icon"><i class="fas fa-gavel"></i></div>
                        <div class="card-title">Правила</div>
                        <div class="card-desc">Пояснение правил проекта</div>
                    </div>
                </div>
                
                <div class="calendar-section">
                    <h2><i class="fas fa-calendar-alt"></i> Ближайший праздник</h2>
                    <div class="holiday-card" id="holidayCard">
                        <div class="holiday-date" id="holidayDate"></div>
                        <div class="holiday-name" id="holidayName"></div>
                        <div class="holiday-days" id="holidayDays"></div>
                    </div>
                </div>
            `
        },
        
        'team-structure': {
            title: 'Структура команды',
            content: `
                <h1>Структура состава NeoFlex</h1>
                <p>Иерархия и подчинение внутри проекта</p>
                
                <div class="org-chart-full">
                    <div class="org-row">
                        <div class="org-card owner">
                            <div class="org-icon"><i class="fas fa-crown"></i></div>
                            <div class="org-name">Владелец проекта</div>
                            <div class="org-role">Представитель проекта</div>
                        </div>
                    </div>
                    
                    <div class="org-arrow">
                        <i class="fas fa-long-arrow-alt-down"></i>
                    </div>
                    
                    <div class="org-row">
                        <div class="org-card leader">
                            <div class="org-icon"><i class="fas fa-user-tie"></i></div>
                            <div class="org-name">Главный Администратор</div>
                            <div class="org-role">Прямой руководитель проекта</div>
                        </div>
                    </div>
                    
                    <div class="org-arrow">
                        <i class="fas fa-long-arrow-alt-down"></i>
                    </div>
                    
                    <div class="org-three-columns">
                        <div class="org-column">
                            <div class="dept-icon"><i class="fas fa-headset"></i></div>
                            <div class="dept-name">Состав Support</div>
                            <div class="dept-leader">
                                <i class="fas fa-user-tie"></i>
                                <span>Администратор Поддержки</span>
                            </div>
                        </div>
                        
                        <div class="org-column">
                            <div class="dept-icon"><i class="fas fa-gavel"></i></div>
                            <div class="dept-name">Модераторский состав</div>
                            <div class="dept-leader">
                                <i class="fas fa-user-shield"></i>
                                <span>Руководитель состава</span>
                            </div>
                        </div>
                        
                        <div class="org-column">
                            <div class="dept-icon"><i class="fab fa-discord"></i></div>
                            <div class="dept-name">Состав Discord</div>
                            <div class="dept-leader">
                                <i class="fas fa-user-cog"></i>
                                <span>Администратор Discord</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        
        roles: {
            title: 'Роли и обязанности',
            content: `
                <h1>Роли и обязанности</h1>
                <p>Описание всех отделов и их функций</p>
                
                <div class="roles-grid-cards">
                    <div class="role-card" data-page="moderation-details">
                        <div class="role-card-icon"><i class="fas fa-gavel"></i></div>
                        <div class="role-card-title">Модерация сервера</div>
                        <div class="role-card-desc">Отвечает за порядок на игровых серверах, соблюдение правил игроками и оперативное реагирование на нарушения.</div>
                    </div>
                    
                    <div class="role-card" data-page="support-details">
                        <div class="role-card-icon"><i class="fas fa-headset"></i></div>
                        <div class="role-card-title">Support</div>
                        <div class="role-card-desc">Занимается обработкой обращений игроков, решением технических и игровых вопросов.</div>
                    </div>
                    
                    <div class="role-card" data-page="discord-details">
                        <div class="role-card-icon"><i class="fab fa-discord"></i></div>
                        <div class="role-card-title">Discord</div>
                        <div class="role-card-desc">Отвечает за порядок на Discord-сервере, управление ролями и правами, настройку каналов и ботов.</div>
                    </div>
                    
                    <div class="role-card" data-page="non-game-details">
                        <div class="role-card-icon"><i class="fas fa-tools"></i></div>
                        <div class="role-card-title">Неигровые роли</div>
                        <div class="role-card-desc">Включает позиции, не связанные напрямую с игровым процессом: аналитика, реклама и другие вспомогательные функции.</div>
                    </div>
                </div>
            `
        },
        
        'moderation-details': {
            title: 'Модерация сервера',
            content: `<div id="subpageContent"><div class="loading"><i class="fas fa-spinner fa-spin"></i> Загрузка...</div></div>`
        },
        
        'support-details': {
            title: 'Support',
            content: `<div id="subpageContent"><div class="loading"><i class="fas fa-spinner fa-spin"></i> Загрузка...</div></div>`
        },
        
        'discord-details': {
            title: 'Discord',
            content: `<div id="subpageContent"><div class="loading"><i class="fas fa-spinner fa-spin"></i> Загрузка...</div></div>`
        },
        
        'non-game-details': {
            title: 'Неигровые роли',
            content: `<div id="subpageContent"><div class="loading"><i class="fas fa-spinner fa-spin"></i> Загрузка...</div></div>`
        },
        
        'staff-list': {
            title: 'Команда проекта',
            content: `
                <h1>Команда проекта NeoFlex</h1>
                <p>Актуальный состав участников проекта</p>
                <div class="team-grid" id="teamGrid">
                    <div class="loading"><i class="fas fa-spinner fa-spin"></i> Загрузка команды...</div>
                </div>
            `
        },
        
        rules: {
            title: 'Правила',
            content: `<div class="soon-placeholder"><div class="soon-icon"><i class="fas fa-clock"></i></div><h1>СКОРО</h1><p>Раздел находится в разработке</p><div class="soon-progress"><div class="progress-bar"></div></div></div>`
        },
        
        'team-rules': {
            title: 'Правила состава',
            content: `<div class="soon-placeholder"><div class="soon-icon"><i class="fas fa-clock"></i></div><h1>СКОРО</h1><p>Раздел находится в разработке</p><div class="soon-progress"><div class="progress-bar"></div></div></div>`
        },

        resources: {
            title: 'Ресурсы',
            content: `<div class="soon-placeholder"><div class="soon-icon"><i class="fas fa-clock"></i></div><h1>СКОРО</h1><p>Раздел находится в разработке</p><div class="soon-progress"><div class="progress-bar"></div></div></div>`
        },

        faq: {
            title: 'FAQ',
            content: `<div class="soon-placeholder"><div class="soon-icon"><i class="fas fa-clock"></i></div><h1>СКОРО</h1><p>Раздел находится в разработке</p><div class="soon-progress"><div class="progress-bar"></div></div></div>`
        }
    };
    
    // ========== DOM ЭЛЕМЕНТЫ ==========
    const sidebar = document.getElementById('wikiSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const themeToggle = document.getElementById('themeToggle');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const wikiContent = document.getElementById('wikiContent');
    const breadcrumb = document.getElementById('breadcrumb');
    const wikiSearch = document.getElementById('wikiSearch');
    const userNameSpan = document.getElementById('userName');
    const userRoleSpan = document.getElementById('userRole');
    
    // ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    async function renderSubpage(pageId) {
        const container = document.getElementById('subpageContent');
        if (!container) return;
        
        let jsonFile = '';
        let title = '';
        
        if (pageId === 'moderation-details') {
            jsonFile = 'data/moderation.json';
            title = 'Модерация сервера';
        } else if (pageId === 'support-details') {
            jsonFile = 'data/support.json';
            title = 'Support';
        } else if (pageId === 'discord-details') {
            jsonFile = 'data/discord.json';
            title = 'Discord';
        } else {
            container.innerHTML = '<div class="empty-state">Страница не найдена</div>';
            return;
        }
        
        try {
            const response = await fetch(jsonFile + '?t=' + Date.now());
            if (!response.ok) throw new Error('Файл не найден');
            
            const data = await response.json();
            
            let html = `
                <h1>${title}</h1>
                <p>Структура и обязанности отдела</p>
                
                <div class="moderation-head">
                    <h2><i class="fas fa-user-shield"></i> Глава отдела</h2>
                    <div class="head-card">
                        <div class="head-role">${escapeHtml(data.head.role)}</div>
                        <div class="head-name">${escapeHtml(data.head.name)}</div>
                        <div class="head-discord">
                            <i class="fab fa-discord"></i>
                            <span>${escapeHtml(data.head.discord)}</span>
                        </div>
                    </div>
                </div>
            `;
            
            for (const level of data.levels) {
                html += `
                    <div class="moderation-level">
                        <h2><i class="fas fa-layer-group"></i> ${escapeHtml(level.name)}</h2>
                        <div class="roles-grid-mod">
                            ${level.roles.map(role => `
                                <div class="mod-role-card">
                                    <div class="mod-role-title">${escapeHtml(role.title)}</div>
                                    <div class="mod-role-desc">${escapeHtml(role.description)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            container.innerHTML = html;
            
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            container.innerHTML = `<div class="empty-state">⚠️ Ошибка загрузки данных. Убедитесь, что файл ${jsonFile} существует.</div>`;
        }
    }
    
    async function renderTeamList() {
        const teamGrid = document.getElementById('teamGrid');
        if (!teamGrid) return;
        
        try {
            const response = await fetch('data/team.json?t=' + Date.now());
            if (!response.ok) throw new Error('Файл не найден');
            
            const data = await response.json();
            const members = data.members;
            
            if (members.length === 0) {
                teamGrid.innerHTML = '<div class="empty-state">Нет данных о команде</div>';
                return;
            }
            
            teamGrid.innerHTML = members.map(member => `
                <div class="team-card">
                    <div class="team-left">
                        <div class="team-role-icon">${escapeHtml(member.roleIcon)}</div>
                        <div class="team-role">${escapeHtml(member.role)}</div>
                        <div class="team-name">${escapeHtml(member.name)}</div>
                        <div class="team-discord">
                            <i class="fab fa-discord"></i>
                            <span>${escapeHtml(member.discord)}</span>
                        </div>
                    </div>
                    <div class="team-divider"></div>
                    <div class="team-right">
                        <div class="team-description">${escapeHtml(member.description)}</div>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Ошибка загрузки команды:', error);
            teamGrid.innerHTML = '<div class="empty-state">⚠️ Ошибка загрузки данных о команде.</div>';
        }
    }
    
    function renderNearestHoliday() {
        const today = new Date();
        const currentYear = today.getFullYear();
        today.setHours(0, 0, 0, 0);
        
        let holidaysWithDates = [];
        
        for (const holiday of holidays) {
            const currentDate = new Date(currentYear, holiday.month, holiday.day);
            currentDate.setHours(0, 0, 0, 0);
            const nextDate = new Date(currentYear + 1, holiday.month, holiday.day);
            nextDate.setHours(0, 0, 0, 0);
            
            holidaysWithDates.push({ ...holiday, dateObj: currentDate, year: currentYear });
            holidaysWithDates.push({ ...holiday, dateObj: nextDate, year: currentYear + 1 });
        }
        
        let nearestHoliday = null;
        let minDays = Infinity;
        
        for (const holiday of holidaysWithDates) {
            if (holiday.dateObj >= today) {
                const daysDiff = Math.ceil((holiday.dateObj - today) / (1000 * 60 * 60 * 24));
                if (daysDiff < minDays) {
                    minDays = daysDiff;
                    nearestHoliday = { ...holiday, days: daysDiff };
                }
            }
        }
        
        const holidayDateEl = document.getElementById('holidayDate');
        const holidayNameEl = document.getElementById('holidayName');
        const holidayDaysEl = document.getElementById('holidayDays');
        
        if (nearestHoliday && holidayDateEl && holidayNameEl && holidayDaysEl) {
            const formattedDate = nearestHoliday.dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
            
            holidayDateEl.innerHTML = `${nearestHoliday.emoji} ${formattedDate}`;
            holidayNameEl.textContent = nearestHoliday.name;
            
            if (nearestHoliday.days === 0) {
                holidayDaysEl.innerHTML = '<span class="today">🎉 СЕГОДНЯ! 🎉</span>';
            } else if (nearestHoliday.days === 1) {
                holidayDaysEl.innerHTML = '⏰ Завтра!';
            } else {
                holidayDaysEl.innerHTML = `⏳ Через ${nearestHoliday.days} дней`;
            }
            
            if (nearestHoliday.year > currentYear) {
                holidayDaysEl.innerHTML += ' (следующий год)';
            }
        }
    }
    
    function setupCardNavigation() {
        document.querySelectorAll('.card[data-page], .role-card[data-page]').forEach(card => {
            card.addEventListener('click', () => {
                const pageId = card.dataset.page;
                if (pageId && pages[pageId]) {
                    loadPage(pageId);
                }
            });
        });
    }
    
    // ========== ОСНОВНЫЕ ФУНКЦИИ ==========
    function init() {
        if (sidebarCollapsed) sidebar.classList.add('collapsed');
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        userNameSpan.textContent = currentUser.name;
        userRoleSpan.textContent = currentUser.role;
        
        loadPage(currentPage);
        setupEventListeners();
    }
    
    function loadPage(pageId) {
        const page = pages[pageId];
        if (!page) return;
        
        currentPage = pageId;
        wikiContent.innerHTML = page.content;
        updateBreadcrumb(page.title);
        
        document.querySelectorAll('.sidebar-nav ul li').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            }
        });
        
        const isRolesSubpage = ['moderation-details', 'support-details', 'discord-details', 'non-game-details'].includes(pageId);
        
        if (isRolesSubpage) {
            renderSubpage(pageId);
        } else if (pageId === 'dashboard') {
            renderNearestHoliday();
            setupCardNavigation();
        } else if (pageId === 'staff-list') {
            renderTeamList();
        } else if (pageId === 'roles') {
            setupCardNavigation();
        }
        
        wikiContent.scrollTop = 0;
    }
    
    function updateBreadcrumb(pageTitle) {
        breadcrumb.innerHTML = `<span>Вики</span><i class="fas fa-chevron-right"></i><span class="active">${pageTitle}</span>`;
    }
    
    function setupEventListeners() {
        document.querySelectorAll('.sidebar-nav ul li').forEach(item => {
            item.addEventListener('click', () => {
                const pageId = item.dataset.page;
                if (pageId && pages[pageId]) {
                    loadPage(pageId);
                }
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-open');
                    document.body.classList.remove('menu-open');
                }
            });
        });
        
        const newsBtn = document.getElementById('newsBtn');
        if (newsBtn) {
            newsBtn.addEventListener('click', () => {
                alert('🚧 Раздел с новостями обновлений в разработке.');
            });
        }
        
        sidebarToggle.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
            } else {
                sidebarCollapsed = !sidebarCollapsed;
                sidebar.classList.toggle('collapsed');
                localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
            }
        });
        
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            document.body.classList.toggle('menu-open');
        });
        
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'true');
            } else {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('darkMode', 'false');
            }
        });
        
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });
        
        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });
        
        wikiSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const navItems = document.querySelectorAll('.sidebar-nav ul li');
            
            if (query.length === 0) {
                navItems.forEach(item => item.style.display = '');
                return;
            }
            
            navItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? '' : 'none';
            });
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    init();
})();