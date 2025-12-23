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
            instagram: "إنستغرام",
            telegram: "تلغرام",
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
            instagram: "Instagram",
            telegram: "Telegram",
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

// عناصر DOM
let DOM = {};

// تهيئة عناصر DOM
function initDOM() {
    DOM = {
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
}

// تهيئة التطبيق
function initApp() {
    // تهيئة عناصر DOM
    initDOM();
    
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
    
    // تحديث نصوص روابط التواصل الاجتماعي
    const websiteLink = document.querySelector('.developer-link.website span');
    const instagramLink = document.querySelector('.developer-link.instagram span');
    const telegramLink = document.querySelector('.developer-link.telegram span');
    
    if (websiteLink) websiteLink.textContent = texts[lang].titles.officialSite;
    if (instagramLink) instagramLink.textContent = texts[lang].titles.instagram;
    if (telegramLink) telegramLink.textContent = texts[lang].titles.telegram;
    
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

// إضافة تأثيرات 3D للبطاقات
function setupCardEffects() {
    const cards = document.querySelectorAll('.lecture-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        card.addEventListener('mousedown', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-2px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-5px)';
        });
    });
}

// إعداد تأثيرات روابط التواصل الاجتماعي
function setupSocialEffects() {
    const socialLinks = document.querySelectorAll('.developer-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
            
            // إظهار نص الروابط على الهواتف عند التمرير
            if (window.innerWidth <= 480) {
                const socialText = this.querySelector('.social-text');
                if (socialText) {
                    socialText.style.display = 'inline';
                    socialText.style.position = 'absolute';
                    socialText.style.top = '-30px';
                    socialText.style.background = getComputedStyle(document.documentElement).getPropertyValue('--dark-color');
                    socialText.style.color = getComputedStyle(document.documentElement).getPropertyValue('--light-color');
                    socialText.style.padding = '0.3rem 0.6rem';
                    socialText.style.borderRadius = '5px';
                    socialText.style.fontSize = '0.8rem';
                    socialText.style.whiteSpace = 'nowrap';
                    socialText.style.zIndex = '10';
                    
                    // إضافة السهم
                    const arrow = document.createElement('div');
                    arrow.style.position = 'absolute';
                    arrow.style.bottom = '-5px';
                    arrow.style.left = '50%';
                    arrow.style.transform = 'translateX(-50%)';
                    arrow.style.width = '0';
                    arrow.style.height = '0';
                    arrow.style.borderLeft = '5px solid transparent';
                    arrow.style.borderRight = '5px solid transparent';
                    arrow.style.borderTop = `5px solid ${getComputedStyle(document.documentElement).getPropertyValue('--dark-color')}`;
                    
                    socialText.appendChild(arrow);
                }
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
            
            // إخفاء نص الروابط على الهواتف عند مغادرة المؤشر
            if (window.innerWidth <= 480) {
                const socialText = this.querySelector('.social-text');
                if (socialText && !this.classList.contains('website')) {
                    socialText.style.display = 'none';
                    // إزالة السهم
                    const arrow = socialText.querySelector('div');
                    if (arrow) {
                        arrow.remove();
                    }
                }
            }
        });
    });
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تبديل اللغة
    DOM.languageToggle.addEventListener('click', () => {
        appState.isArabic = !appState.isArabic;
        savePreferences();
        updateUI();
        
        // إعادة إعداد تأثيرات البطاقات بعد تغيير اللغة
        setTimeout(setupCardEffects, 100);
        setTimeout(setupSocialEffects, 100);
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
        const currentDisplay = DOM.mobileDays.style.display;
        DOM.mobileDays.style.display = currentDisplay === 'flex' ? 'none' : 'flex';
    });
    
    // تغيير اليوم من الشريط الجانبي
    DOM.dayItems.forEach(item => {
        item.addEventListener('click', () => {
            const day = item.dataset.day;
            setCurrentDay(day);
            renderLectures();
            
            // إعادة إعداد تأثيرات البطاقات بعد تغيير اليوم
            setTimeout(setupCardEffects, 100);
            
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
            
            // إعادة إعداد تأثيرات البطاقات بعد تغيير اليوم
            setTimeout(setupCardEffects, 100);
            
            // إغلاق القائمة المنسدلة
            DOM.mobileDays.style.display = 'none';
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
        // إعادة تهيئة عناصر DOM بعد تغيير الحجم
        initDOM();
        
        // إعادة عرض المحاضرات
        renderLectures();
        
        // إعادة إعداد تأثيرات البطاقات
        setTimeout(setupCardEffects, 100);
        
        // إعادة إعداد تأثيرات روابط التواصل
        setTimeout(setupSocialEffects, 100);
        
        // إغلاق الشريط الجانبي عند التبديل إلى شاشة كبيرة
        if (window.innerWidth > 768 && appState.isSidebarOpen) {
            DOM.sidebar.classList.remove('active');
            appState.isSidebarOpen = false;
        }
        
        // إغلاق القائمة المنسدلة عند التبديل إلى شاشة كبيرة
        if (window.innerWidth > 768) {
            DOM.mobileDays.style.display = 'none';
        }
    });
    
    // إضافة تأثيرات 3D للبطاقات عند تحميل الصفحة
    setTimeout(() => {
        setupCardEffects();
        setupSocialEffects();
    }, 500);
}

// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initApp);

// دعم تغيير الحجم لتحسين الأداء
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // إعادة تهيئة تأثيرات البطاقات بعد تغيير الحجم
        setupCardEffects();
    }, 250);
});

// دعم اختصارات لوحة المفاتيح
document.addEventListener('keydown', (e) => {
    // تبديل اللغة بـ Ctrl+L أو Cmd+L
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        DOM.languageToggle.click();
    }
    
    // تبديل الوضع الداكن بـ Ctrl+D أو Cmd+D
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        DOM.themeToggle.click();
    }
    
    // الانتقال بين الأيام باستخدام مفاتيح الأسهم
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const days = ['saturday', 'sunday', 'monday'];
        const currentIndex = days.indexOf(appState.currentDay);
        
        let nextIndex;
        if (e.key === 'ArrowRight') {
            nextIndex = currentIndex === days.length - 1 ? 0 : currentIndex + 1;
        } else {
            nextIndex = currentIndex === 0 ? days.length - 1 : currentIndex - 1;
        }
        
        setCurrentDay(days[nextIndex]);
        renderLectures();
        
        // إعادة إعداد تأثيرات البطاقات
        setTimeout(setupCardEffects, 100);
    }
});