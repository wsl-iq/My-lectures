// مدير الجلسات والتقدم
class SessionManager {
    constructor() {
        this.currentStudyType = null;
        this.lastVisited = null;
        this.progressData = {};
    }
    
    // تحميل بيانات الجلسة
    loadSession() {
        const sessionData = localStorage.getItem('studySession');
        if (sessionData) {
            const data = JSON.parse(sessionData);
            this.currentStudyType = data.studyType;
            this.lastVisited = data.lastVisited;
            this.progressData = data.progressData || {};
            
            console.log('📂 جلسة الدراسة المحفوظة:', data);
            return data;
        }
        return null;
    }
    
    // حفظ بيانات الجلسة
    saveSession(studyType, additionalData = {}) {
        const sessionData = {
            studyType: studyType,
            lastVisited: new Date().toISOString(),
            progressData: {
                ...this.progressData,
                ...additionalData
            }
        };
        
        localStorage.setItem('studySession', JSON.stringify(sessionData));
        console.log('💾 تم حفظ الجلسة:', sessionData);
        
        // إرسال إحصائيات (يمكن استخدامها للتتبع)
        this.sendAnalytics(studyType);
    }
    
    // إرسال إحصائيات
    sendAnalytics(studyType) {
        // هنا يمكنك إضافة كود لإرسال الإحصائيات للخادم
        console.log('📊 إحصائيات الدراسة:', {
            type: studyType,
            time: new Date().toLocaleString('ar-SA'),
            userAgent: navigator.userAgent
        });
    }
    
    // الحصول على التقدم
    getProgress() {
        return this.progressData;
    }
    
    // تحديث التقدم
    updateProgress(key, value) {
        this.progressData[key] = value;
        this.saveSession(this.currentStudyType);
    }
    
    // مسح الجلسة
    clearSession() {
        localStorage.removeItem('studySession');
        this.currentStudyType = null;
        this.lastVisited = null;
        this.progressData = {};
        console.log('🗑️ تم مسح الجلسة');
    }
    
    // التحقق من وجود جلسة
    hasActiveSession() {
        return !!this.currentStudyType;
    }
    
    // الحصول على وقت آخر زيارة
    getLastVisitTime() {
        if (this.lastVisited) {
            const lastDate = new Date(this.lastVisited);
            const now = new Date();
            const diffMs = now - lastDate;
            const diffMins = Math.floor(diffMs / 60000);
            
            if (diffMins < 1) return 'الآن';
            if (diffMins < 60) return `قبل ${diffMins} دقيقة`;
            
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) return `قبل ${diffHours} ساعة`;
            
            const diffDays = Math.floor(diffHours / 24);
            return `قبل ${diffDays} يوم`;
        }
        return 'أول زيارة';
    }
}

// تصدير المدير للاستخدام
const sessionManager = new SessionManager();