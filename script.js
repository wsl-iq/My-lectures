// بيانات الجدول
const scheduleData = {
    "saturday": [
        {
            id: 1,
            title: "Phonetics",
            titleAr: "علم الأصوات",
            time: "2:00 PM - 3:00 PM",
            teacher: "Ms. Sayran Najim",
            teacherAr: "م. سيران نجم",
            department: "English Department",
            departmentAr: "قسم اللغة الإنجليزية"
        },
        {
            id: 2,
            title: "English Grammar",
            titleAr: "قواعد اللغة الإنجليزية",
            time: "3:00 PM - 4:00 PM",
            teacher: "Ms. Abrar Sa'ad",
            teacherAr: "م. أبرار سعد",
            department: "English Department",
            departmentAr: "قسم اللغة الإنجليزية"
        },
        {
            id: 3,
            title: "Arabic Language",
            titleAr: "اللغة العربية",
            time: "4:00 PM - 5:00 PM",
            teacher: "Non Departmental",
            teacherAr: "غير تخصصي",
            department: "General",
            departmentAr: "عام"
        }
    ],
    "sunday": [
        {
            id: 4,
            title: "Literature",
            titleAr: "الأدب",
            time: "2:00 PM - 3:00 PM",
            teacher: "Mr. Mohammad Rahman",
            teacherAr: "أ. محمد الرحمن",
            department: "English Department",
            departmentAr: "قسم اللغة الإنجليزية"
        },
        {
            id: 5,
            title: "Reading 1",
            titleAr: "القراءة 1",
            time: "3:00 PM - 4:00 PM",
            teacher: "Ms. Jeehan Abd Al-Kareem",
            teacherAr: "م. جيهان عبد الكريم",
            department: "English Department",
            departmentAr: "قسم اللغة الإنجليزية"
        }
    ],
    "monday": [
        {
            id: 6,
            title: "Human Rights",
            titleAr: "حقوق الإنسان",
            time: "2:00 PM - 3:00 PM",
            teacher: "Dr. Nidhal Metti",
            teacherAr: "د. نضال متي",
            department: "General",
            departmentAr: "عام"
        },
        {
            id: 7,
            title: "Computer Science",
            titleAr: "علوم الحاسوب",
            time: "3:00 PM - 4:00 PM",
            teacher: "Non Departmental",
            teacherAr: "غير تخصصي",
            department: "General",
            departmentAr: "عام"
        },
        {
            id: 8,
            title: "Composition Writing",
            titleAr: "كتابة التأليف",
            time: "4:00 PM - 5:00 PM",
            teacher: "Mr. Ali Abas",
            teacherAr: "أ. علي عباس",
            department: "English Department",
            departmentAr: "قسم اللغة الإنجليزية"
        }
    ]
};

// حالة التطبيق
const appState = {
    currentDay: "saturday",
    isArabic: true,
    isDarkMode: false,
    isSidebarOpen: false
};

// عناصر DOM
const DOM = {
    body: document.body,
    languageToggle: document.getElementById('languageToggle'),
    themeToggle: document.getElementById('themeToggle'),
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    closeSidebar: document.getElementById('closeSidebar'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileDays: document.getElementById('mobileDays'),
    currentDayTitle: document.getElementById('currentDayTitle'),
    currentDayDate: document.getElementById('currentDayDate'),
    lecturesContainer: document.getElementById('lecturesContainer'),
    noLecturesMessage: document.getElementById('noLecturesMessage'),
    currentTime: document.getElementById('currentTime'),
    dayTabs: document.querySelectorAll('.day-tab'),
    dayItems: document.querySelectorAll('.day-item')
};

// النصوص حسب اللغة
const texts = {
    ar: {
        days: {
            saturday: "السبت",
            sunday: "الأحد",
            monday: "الإثنين"
        },
        titles: {
            main: "جدول المحاضرات الأسبوعي",
            subtitle: "السبت - الأحد - الإثنين | بداية من 2:00 ظهراً",
            sidebar: "أيام الأسبوع",
            noLectures: "لا توجد محاضرات اليوم",
            enjoyRest: "استمتع بيوم راحة من المحاضرات",
            developedBy: "تم التطوير بواسطة: محمد الباقر",
            officialSite: "الموقع الرسمي للمطور",
            footerNote: "جدول المحاضرات الأسبوعي - كلية التربية - قسم اللغة الإنجليزية"
        },
        buttons: {
            language: "English",
            theme: "الوضع الداكن",
            menu: "أيام الأسبوع",
            close: "إغلاق"
        },
        labels: {
            lectures: "محاضرات",
            from: "من",
            teacher: "مدرس",
            department: "قسم"
        }
    },
    en: {
        days: {
            saturday: "Saturday",
            sunday: "Sunday",
            monday: "Monday"
        },
        titles: {
            main: "Weekly Lectures Schedule",
            subtitle: "Saturday - Sunday - Monday | Starting from 2:00 PM",
            sidebar: "Week Days",
            noLectures: "No lectures today",
            enjoyRest: "Enjoy a day off from lectures",
            developedBy: "Developed by: Mohammed Al-Baqer",
            officialSite: "Developer's Official Website",            
            instagram: "Follow me on Instagram",
            footerNote: "Weekly Lectures Schedule - College of Education - English Department"
        },
        buttons: {
            language: "العربية",
            theme: "Dark Mode",
            menu: "Week Days",
            close: "Close"
        },
        labels: {
            lectures: "lectures",
            from: "from",
            teacher: "Teacher",
            department: "Department"
        }
    }
};

// تهيئة التطبيق
function initApp() {
    // تعيين اليوم الحالي
    setCurrentDay('saturday');
    
    // تحميل التفضيلات من localStorage
    loadPreferences();
    
    // تحديث واجهة المستخدم بناءً على الحالة
    updateUI();
    
    // إنشاء محاضرات اليوم الحالي
    renderLectures();
    
    // تحديث الوقت الحالي
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // تحديث كل دقيقة
    
    // إضافة مستمعي الأحداث
    setupEventListeners();
}

// تعيين اليوم الحالي
function setCurrentDay(day) {
    appState.currentDay = day;
    
    // تحديث الأزرار النشطة
    DOM.dayTabs.forEach(tab => {
        if (tab.dataset.day === day) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    DOM.dayItems.forEach(item => {
        if (item.dataset.day === day) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// تحميل التفضيلات
function loadPreferences() {
    const savedLanguage = localStorage.getItem('language');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedLanguage) {
        appState.isArabic = savedLanguage === 'ar';
    }
    
    if (savedTheme) {
        appState.isDarkMode = savedTheme === 'dark';
    }
}

// حفظ التفضيلات
function savePreferences() {
    localStorage.setItem('language', appState.isArabic ? 'ar' : 'en');
    localStorage.setItem('theme', appState.isDarkMode ? 'dark' : 'light');
}

// تحديث واجهة المستخدم
function updateUI() {
    // تحديث اللغة
    DOM.body.setAttribute('dir', appState.isArabic ? 'rtl' : 'ltr');
    DOM.body.setAttribute('lang', appState.isArabic ? 'ar' : 'en');
    
    // تحديث النصوص
    const lang = appState.isArabic ? 'ar' : 'en';
    
    // تحديث العناوين
    document.querySelector('.main-title').textContent = texts[lang].titles.main;
    document.querySelector('.subtitle').textContent = texts[lang].titles.subtitle;
    document.querySelector('.sidebar-title').textContent = texts[lang].titles.sidebar;
    document.querySelector('.mobile-menu-btn span').textContent = texts[lang].buttons.menu;
    
    // تحديث أسماء الأيام في الشريط الجانبي
    DOM.dayItems.forEach(item => {
        const day = item.dataset.day;
        const dayName = item.querySelector('.day-name');
        dayName.textContent = texts[lang].days[day];
    });
    
    // تحديث أزرار التحكم
    DOM.languageToggle.querySelector('.lang-text').textContent = texts[lang].buttons.language;
    DOM.themeToggle.querySelector('.theme-text').textContent = texts[lang].buttons.theme;
    
    // تحديث التذييل
    document.querySelector('.developer-name span').textContent = texts[lang].titles.developedBy;
    document.querySelector('.developer-link span').textContent = texts[lang].titles.officialSite;
    document.querySelector('.footer-note p').textContent = texts[lang].titles.footerNote;
    
    // تحديث حالة الوضع الداكن
    if (appState.isDarkMode) {
        DOM.body.setAttribute('data-theme', 'dark');
        DOM.themeToggle.querySelector('i').className = 'fas fa-sun';
        DOM.themeToggle.querySelector('.theme-text').textContent = appState.isArabic ? 'الوضع الفاتح' : 'Light Mode';
    } else {
        DOM.body.setAttribute('data-theme', 'light');
        DOM.themeToggle.querySelector('i').className = 'fas fa-moon';
        DOM.themeToggle.querySelector('.theme-text').textContent = texts[lang].buttons.theme;
    }
    
    // إعادة عرض المحاضرات مع التحديث اللغوي
    renderLectures();
}

// عرض المحاضرات
function renderLectures() {
    const lectures = scheduleData[appState.currentDay];
    const lang = appState.isArabic ? 'ar' : 'en';
    
    // تحديث عنوان اليوم
    const dayTitle = texts[lang].days[appState.currentDay];
    DOM.currentDayTitle.textContent = `${appState.isArabic ? 'يوم' : ''} ${dayTitle}`;
    
    // تحديث معلومات اليوم
    const lecturesCount = lectures ? lectures.length : 0;
    const lecturesText = appState.isArabic ? 
        `${lecturesCount} ${lecturesCount === 1 ? 'محاضرة' : 'محاضرات'}` : 
        `${lecturesCount} ${lecturesCount === 1 ? 'lecture' : 'lectures'}`;
    
    DOM.currentDayDate.textContent = lecturesText;
    
    // مسح المحاضرات الحالية
    DOM.lecturesContainer.innerHTML = '';
    
    // التحقق من وجود محاضرات
    if (!lectures || lectures.length === 0) {
        DOM.noLecturesMessage.style.display = 'flex';
        
        // تحديث نص حالة عدم وجود محاضرات
        const emptyState = DOM.noLecturesMessage.querySelector('.empty-state');
        emptyState.querySelector('h3').textContent = texts[lang].titles.noLectures;
        emptyState.querySelector('p').textContent = texts[lang].titles.enjoyRest;
        
        return;
    }
    
    DOM.noLecturesMessage.style.display = 'none';
    
    // إنشاء بطاقات المحاضرات
    lectures.forEach((lecture, index) => {
        const card = document.createElement('div');
        card.className = `lecture-card animate-fade-in ${appState.currentDay}`;
        card.style.animationDelay = `${index * 0.1 + 0.1}s`;
        
        // تحديد النصوص بناءً على اللغة
        const title = appState.isArabic ? lecture.titleAr : lecture.title;
        const teacher = appState.isArabic ? lecture.teacherAr : lecture.teacher;
        const department = appState.isArabic ? lecture.departmentAr : lecture.department;
        const teacherLabel = appState.isArabic ? 'مدرس:' : 'Teacher:';
        const dayLabel = texts[lang].days[appState.currentDay];
        
        card.innerHTML = `
            <div class="lecture-header">
                <div class="lecture-time">${lecture.time}</div>
                <div class="lecture-day">${dayLabel}</div>
            </div>
            <h3 class="lecture-title">${title}</h3>
            <div class="lecture-subject">${appState.isArabic ? 'المادة الدراسية' : 'Course'}</div>
            <div class="lecture-teacher">
                <i class="fas fa-chalkboard-teacher"></i>
                <span><strong>${teacherLabel}</strong> ${teacher}</span>
            </div>
            <div class="lecture-department">${department}</div>
        `;
        
        DOM.lecturesContainer.appendChild(card);
    });
}

// تحديث الوقت الحالي
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(appState.isArabic ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    DOM.currentTime.textContent = timeString;
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تبديل اللغة
    DOM.languageToggle.addEventListener('click', () => {
        appState.isArabic = !appState.isArabic;
        savePreferences();
        updateUI();
    });
    
    // تبديل الوضع الداكن
    DOM.themeToggle.addEventListener('click', () => {
        appState.isDarkMode = !appState.isDarkMode;
        savePreferences();
        updateUI();
    });
    
    // فتح/إغلاق الشريط الجانبي
    DOM.sidebarToggle.addEventListener('click', () => {
        DOM.sidebar.classList.add('active');
        appState.isSidebarOpen = true;
    });
    
    DOM.closeSidebar.addEventListener('click', () => {
        DOM.sidebar.classList.remove('active');
        appState.isSidebarOpen = false;
    });
    
    // زر القائمة على الشاشات الصغيرة
    DOM.mobileMenuBtn.addEventListener('click', () => {
        DOM.mobileDays.style.display = DOM.mobileDays.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // تغيير اليوم من الشريط الجانبي
    DOM.dayItems.forEach(item => {
        item.addEventListener('click', () => {
            const day = item.dataset.day;
            setCurrentDay(day);
            renderLectures();
            
            // إغلاق الشريط الجانبي على الشاشات الصغيرة
            if (window.innerWidth <= 768) {
                DOM.sidebar.classList.remove('active');
                appState.isSidebarOpen = false;
            }
        });
    });
    
    // تغيير اليوم من القائمة العلوية للشاشات الصغيرة
    DOM.dayTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const day = tab.dataset.day;
            setCurrentDay(day);
            renderLectures();
        });
    });
    
    // إغلاق الشريط الجانبي بالنقر خارجها
    document.addEventListener('click', (e) => {
        if (appState.isSidebarOpen && 
            !DOM.sidebar.contains(e.target) && 
            !DOM.sidebarToggle.contains(e.target)) {
            DOM.sidebar.classList.remove('active');
            appState.isSidebarOpen = false;
        }
    });
    
    // إغلاق القائمة المنسدلة للشاشات الصغيرة بالنقر خارجها
    document.addEventListener('click', (e) => {
        if (!DOM.mobileMenuBtn.contains(e.target) && 
            !DOM.mobileDays.contains(e.target) &&
            window.innerWidth <= 768) {
            DOM.mobileDays.style.display = 'none';
        }
    });
    
    // إعادة عرض المحاضرات عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        renderLectures();
        
        // إغلاق الشريط الجانبي عند التبديل إلى شاشة كبيرة
        if (window.innerWidth > 768 && appState.isSidebarOpen) {
            DOM.sidebar.classList.remove('active');
            appState.isSidebarOpen = false;
        }
    });
    
    // تأثيرات 3D للبطاقات عند المرور
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.lecture-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
    });
    
    // إعادة تعيين تأثيرات البطاقات عند مغادرة المؤشر
    document.addEventListener('mouseleave', () => {
        const cards = document.querySelectorAll('.lecture-card');
        cards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initApp);