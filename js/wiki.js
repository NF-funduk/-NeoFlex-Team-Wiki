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
                        <div class="org-column" data-dept="support">
                            <div class="dept-icon"><i class="fas fa-headset"></i></div>
                            <div class="dept-name">Состав Support</div>
                            <div class="dept-leader">
                                <i class="fas fa-user-tie"></i>
                                <span>Администратор Поддержки</span>
                            </div>
                        </div>
                        
                        <div class="org-column" data-dept="moderation">
                            <div class="dept-icon"><i class="fas fa-gavel"></i></div>
                            <div class="dept-name">Модераторский состав</div>
                            <div class="dept-leader">
                                <i class="fas fa-user-shield"></i>
                                <span>Руководитель состава</span>
                            </div>
                        </div>
                        
                        <div class="org-column" data-dept="discord">
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
    let rolesFile = '';
    let title = '';
    
    if (pageId === 'moderation-details') {
        jsonFile = 'data/moderation.json';
        rolesFile = 'data/roles/moderation.json';
        title = 'Модерация сервера';
    } else if (pageId === 'support-details') {
        jsonFile = 'data/support.json';
        rolesFile = 'data/roles/support.json';
        title = 'Support';
    } else if (pageId === 'discord-details') {
        jsonFile = 'data/discord.json';
        rolesFile = 'data/roles/discord.json';
        title = 'Discord';
    } else {
        container.innerHTML = '<div class="empty-state">Страница не найдена</div>';
        return;
    }
    
    try {
        const [deptResponse, rolesResponse] = await Promise.all([
            fetch(jsonFile + '?t=' + Date.now()),
            fetch(rolesFile + '?t=' + Date.now())
        ]);
        
        if (!deptResponse.ok) throw new Error('Файл отдела не найден');
        if (!rolesResponse.ok) throw new Error('Файл ролей не найден');
        
        const deptData = await deptResponse.json();
        const rolesData = await rolesResponse.json();
        
        let html = `
            <h1>${title}</h1>
            <p>Структура и обязанности отдела</p>
            
            <div class="moderation-head">
                <h2><i class="fas fa-user-shield"></i> Глава отдела</h2>
                <div class="head-card">
                    <div class="head-role">${escapeHtml(deptData.head.role)}</div>
                    <div class="head-name">${escapeHtml(deptData.head.name)}</div>
                    <div class="head-discord">
                        <i class="fab fa-discord"></i>
                        <span>${escapeHtml(deptData.head.discord)}</span>
                    </div>
                </div>
            </div>
        `;
        
        html += `
            <div class="moderation-level">
                <h2><i class="fas fa-layer-group"></i> Все роли отдела</h2>
                <div class="roles-grid-mod">
                    ${rolesData.roles.map(role => `
                        <div class="mod-role-card" data-role-id="${escapeHtml(role.id)}">
                            <div class="mod-role-title">${escapeHtml(role.title)}</div>
                            <div class="mod-role-desc">${escapeHtml(role.description)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        document.querySelectorAll('.mod-role-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const roleId = card.dataset.roleId;
                const role = rolesData.roles.find(r => r.id === roleId);
                if (role) {
                    openRoleModal(role, rolesData.department, rolesData.icon);
                }
            });
        });
        
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        container.innerHTML = `<div class="empty-state">⚠️ Ошибка загрузки данных. Убедитесь, что файлы существуют.</div>`;
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
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-open');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }
    
    function bindDeptCardsClick() {
        const deptColumns = document.querySelectorAll('.org-column');
        deptColumns.forEach(column => {
            // Удаляем старые обработчики, чтобы не дублировать
            column.removeEventListener('click', column._deptHandler);
            
            const handler = () => {
                const dept = column.dataset.dept;
                if (dept) {
                    openDeptModal(dept);
                }
            };
            column._deptHandler = handler;
            column.addEventListener('click', handler);
        });
    }
    
    // ========== НОВОСТИ ==========
    async function loadNews() {
        const container = document.getElementById('newsModalContent');
        if (!container) return;
        
        try {
            const response = await fetch('data/news.json?t=' + Date.now());
            if (!response.ok) throw new Error('Файл не найден');
            
            const news = await response.json();
            
            if (news.length === 0) {
                container.innerHTML = '<div class="news-empty">📭 Новостей пока нет</div>';
                return;
            }
            
            news.sort((a, b) => b.id - a.id);
            
            container.innerHTML = news.map(item => {
                const date = new Date(item.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                
                let badgeClass = 'update';
                let badgeIcon = '🔄';
                if (item.type === 'new') {
                    badgeClass = 'new';
                    badgeIcon = '✨';
                } else if (item.type === 'fix') {
                    badgeClass = 'fix';
                    badgeIcon = '🐛';
                }
                
                return `
                    <div class="news-item">
                        <div class="news-header">
                            <span class="news-title">${escapeHtml(item.title)}</span>
                            <span class="news-badge ${badgeClass}">${badgeIcon} ${escapeHtml(item.type)}</span>
                        </div>
                        <div class="news-date">📅 ${date}</div>
                        <div class="news-content">${escapeHtml(item.content)}</div>
                        <div class="news-author"><i class="fas fa-user"></i> ${escapeHtml(item.author)}</div>
                    </div>
                `;
            }).join('');
            
        } catch (error) {
            console.error('Ошибка загрузки новостей:', error);
            container.innerHTML = '<div class="news-empty">⚠️ Ошибка загрузки новостей</div>';
        }
    }
    
    function openNewsModal() {
        const modal = document.getElementById('newsModal');
        if (!modal) return;
        
        loadNews();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeNewsModal() {
        const modal = document.getElementById('newsModal');
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ========== МОДАЛЬНОЕ ОКНО ОТДЕЛА ==========
    async function loadDepartmentModal(department) {
    const container = document.getElementById('deptModalContent');
    const titleSpan = document.getElementById('deptModalTitle');
    if (!container) return;
    
    let jsonFile = '';
    let iconClass = '';
    let displayTitle = '';
    
    if (department === 'moderation') {
    jsonFile = 'data/departments/moderation.json';
    iconClass = 'fas fa-gavel';
    displayTitle = 'Модерация сервера';
} else if (department === 'support') {
    jsonFile = 'data/departments/support.json';
    iconClass = 'fas fa-headset';
    displayTitle = 'Support';
} else if (department === 'discord') {
    jsonFile = 'data/departments/discord.json';
    iconClass = 'fab fa-discord';
    displayTitle = 'Discord';
}
    
    titleSpan.innerHTML = `<i class="${iconClass}"></i> ${displayTitle}`;
    
    try {
        const response = await fetch(jsonFile + '?t=' + Date.now());
        if (!response.ok) throw new Error('Файл не найден');
        
        const data = await response.json();
        
        const html = `
            <div class="dept-icon"><i class="${iconClass}"></i></div>
            <div class="dept-description">${escapeHtml(data.description)}</div>
            
            <div class="dept-section">
                <h3><i class="fas fa-tasks"></i> Чем занимается отдел</h3>
                <ul>
                    ${data.responsibilities.map(item => `<li><i class="fas fa-check-circle"></i> ${escapeHtml(item)}</li>`).join('')}
                </ul>
            </div>
            
            <div class="dept-section">
                <h3><i class="fas fa-star"></i> Навыки и качества</h3>
                <ul>
                    ${data.skills.map(item => `<li><i class="fas fa-gem"></i> ${escapeHtml(item)}</li>`).join('')}
                </ul>
            </div>
            
            <div class="dept-section">
                <h3><i class="fas fa-clipboard-list"></i> Требования к кандидатам</h3>
                <ul>
                    ${data.requirements.map(item => `<li><i class="fas fa-shield-alt"></i> ${escapeHtml(item)}</li>`).join('')}
                </ul>
            </div>
        `;
        
        container.innerHTML = html;
        
        window.currentDepartment = department;
        
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        container.innerHTML = '<div class="empty-state">⚠️ Ошибка загрузки данных об отделе</div>';
    }
}
    
    function openDeptModal(department) {
        const modal = document.getElementById('deptModal');
        if (!modal) return;
        
        loadDepartmentModal(department);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeDeptModal() {
        const modal = document.getElementById('deptModal');
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function goToRolesPage() {
    closeDeptModal();
    
    if (window.currentDepartment === 'moderation') {
        loadPage('moderation-details');
    } else if (window.currentDepartment === 'support') {
        loadPage('support-details');
    } else if (window.currentDepartment === 'discord') {
        loadPage('discord-details');
    } else {
        loadPage('roles');
    }
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
        } else if (pageId === 'team-structure') {
            setTimeout(() => bindDeptCardsClick(), 50);
        }
        
        wikiContent.scrollTop = 0;
    }
    
    function updateBreadcrumb(pageTitle) {
        breadcrumb.innerHTML = `<span>Вики</span><i class="fas fa-chevron-right"></i><span class="active">${pageTitle}</span>`;
    }
    
    function setupEventListeners() {
    const navItems = document.querySelectorAll('.sidebar-nav ul li');
    navItems.forEach(item => {
        item.removeEventListener('click', item._clickHandler);
        
        const handler = () => {
            const pageId = item.dataset.page;
            if (pageId && pages[pageId]) {
                loadPage(pageId);
            }
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
            }
        };
        item._clickHandler = handler;
        item.addEventListener('click', handler);
    });
    
    const roleModalClose = document.getElementById('roleModalClose');
    if (roleModalClose) {
        roleModalClose.addEventListener('click', closeRoleModal);
    }
    
    const roleModal = document.getElementById('roleModal');
    if (roleModal) {
        roleModal.addEventListener('click', (e) => {
            if (e.target === roleModal) {
                closeRoleModal();
            }
        });
    }
    
    const deptModalClose = document.getElementById('deptModalClose');
    if (deptModalClose) {
        deptModalClose.addEventListener('click', closeDeptModal);
    }

    const deptModal = document.getElementById('deptModal');
    if (deptModal) {
        deptModal.addEventListener('click', (e) => {
            if (e.target === deptModal) {
                closeDeptModal();
            }
        });
    }
    
    const deptRolesBtn = document.getElementById('deptRolesBtn');
    if (deptRolesBtn) {
        deptRolesBtn.addEventListener('click', goToRolesPage);
    }
    
    const newsBtn = document.getElementById('newsBtn');
    if (newsBtn) {
        newsBtn.addEventListener('click', openNewsModal);
    }

    const newsModalClose = document.getElementById('newsModalClose');
    if (newsModalClose) {
        newsModalClose.addEventListener('click', closeNewsModal);
    }
    
    const newsModal = document.getElementById('newsModal');
    if (newsModal) {
        newsModal.addEventListener('click', (e) => {
            if (e.target === newsModal) {
                closeNewsModal();
            }
        });
    }
    
    sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            if (sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
            } else {
                sidebar.classList.add('mobile-open');
                document.body.classList.add('menu-open');
            }
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
        const navItemsList = document.querySelectorAll('.sidebar-nav ul li');
        
        if (query.length === 0) {
            navItemsList.forEach(item => item.style.display = '');
            return;
        }
        
        navItemsList.forEach(item => {
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
        if (e.key === 'Escape') {
            const newsModalEl = document.getElementById('newsModal');
            if (newsModalEl && newsModalEl.classList.contains('active')) {
                closeNewsModal();
            }
            const deptModalEl = document.getElementById('deptModal');
            if (deptModalEl && deptModalEl.classList.contains('active')) {
                closeDeptModal();
            }
            const roleModalEl = document.getElementById('roleModal');
            if (roleModalEl && roleModalEl.classList.contains('active')) {
                closeRoleModal();
            }
            if (sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
            }
        }
    });
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

    // ========== МОДАЛЬНОЕ ОКНО РОЛИ ==========
async function loadRoleModal(roleData) {
    const container = document.getElementById('roleModalContent');
    const titleSpan = document.getElementById('roleModalTitle');
    if (!container) return;
    
    titleSpan.innerHTML = `<i class="${roleData.icon}"></i> ${roleData.title}`;
    
    const html = `
        <div class="role-icon"><i class="${roleData.icon}"></i></div>
        <div class="role-full-title">${escapeHtml(roleData.fullTitle)}</div>
        <div class="role-department">${escapeHtml(roleData.department)}</div>
        <div class="role-description">${escapeHtml(roleData.description)}</div>
        
        <div class="role-subsection">
            <h4><i class="fas fa-tasks"></i> Обязанности</h4>
            <ul>
                ${roleData.responsibilities.map(item => `<li><i class="fas fa-check-circle"></i> ${escapeHtml(item)}</li>`).join('')}
            </ul>
        </div>
        
        <div class="role-subsection">
            <h4><i class="fas fa-star"></i> Необходимые навыки</h4>
            <ul>
                ${roleData.skills.map(item => `<li><i class="fas fa-gem"></i> ${escapeHtml(item)}</li>`).join('')}
            </ul>
        </div>
    `;
    
    container.innerHTML = html;
}

function openRoleModal(role, department, deptIcon) {
    const modal = document.getElementById('roleModal');
    if (!modal) return;
    
    const container = document.getElementById('roleModalContent');
    const titleSpan = document.getElementById('roleModalTitle');
    
    titleSpan.innerHTML = `<i class="${role.icon}"></i> ${role.title}`;
    
    const html = `
        <div class="role-icon"><i class="${role.icon}"></i></div>
        <div class="role-full-title">${escapeHtml(role.fullTitle)}</div>
        <div class="role-department"><i class="${deptIcon}"></i> ${escapeHtml(department)}</div>
        <div class="role-description">${escapeHtml(role.description)}</div>
        
        <div class="role-subsection">
            <h4><i class="fas fa-tasks"></i> Обязанности</h4>
            <ul>
                ${role.responsibilities.map(item => `<li><i class="fas fa-check-circle"></i> ${escapeHtml(item)}</li>`).join('')}
            </ul>
        </div>
        
        <div class="role-subsection">
            <h4><i class="fas fa-star"></i> Необходимые навыки</h4>
            <ul>
                ${role.skills.map(item => `<li><i class="fas fa-gem"></i> ${escapeHtml(item)}</li>`).join('')}
            </ul>
        </div>
    `;
    
    container.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRoleModal() {
    const modal = document.getElementById('roleModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
    
    init();
})();