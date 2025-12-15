// ============================
// Sistema de Emails
// ============================
class EmailSystem {
    constructor() {
        this.emails = JSON.parse(localStorage.getItem('keymaster_emails') || '[]');
        this.currentTab = 'inbox';
        this.API_ENDPOINT = 'https://administracao.onrender.com/api/sms/send-email';
        this.init();
    }

    init() {
        this.loadEmails();
        this.setupEventListeners();
    }

    // ====================
    // Emails
    // ====================
    loadEmails() {
        const emailList = document.getElementById('emailList');
        if (!emailList) return;

        const filtered = this.emails.filter(e => e.tab === this.currentTab);

        emailList.innerHTML = filtered.length
            ? filtered.map(e => this.emailItemTemplate(e)).join('')
            : this.emptyTabTemplate();

        this.bindEmailItemEvents();
    }

    emailItemTemplate(email) {
        return `
            <div class="email-item ${email.read ? '' : 'unread'}" data-id="${email.id}">
                <div class="email-sender">
                    <span>${email.sender}</span>
                    <span class="email-time">${this.formatTime(email.timestamp)}</span>
                </div>
                <div class="email-subject">${email.subject}</div>
                <div class="email-preview">${email.preview}</div>
                <div class="email-time">${this.formatDate(email.timestamp)}</div>
            </div>
        `;
    }

    emptyTabTemplate() {
        return `
            <div style="padding: 40px; text-align: center; color: var(--text-tertiary);
                display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;">
                <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                <div style="font-size: 14px; font-weight: 500;">Nenhum email em ${this.getTabName(this.currentTab)}</div>
                <div style="font-size: 12px; margin-top: 4px;">
                    ${this.currentTab === 'inbox' ? 'Novos emails aparecerão aqui' : 'Tente uma aba diferente'}
                </div>
            </div>
        `;
    }

    bindEmailItemEvents() {
        document.querySelectorAll('.email-item').forEach(item => {
            item.addEventListener('click', () => this.openEmail(item.dataset.id));
        });
    }

    openEmail(emailId) {
        const email = this.emails.find(e => e.id == emailId);
        if (!email) return;

        email.read = true;
        this.saveEmails();

        this.setModalContent('emailModal', {
            title: email.subject,
            sender: `De: ${email.sender}`,
            date: `Data: ${this.formatFullDate(email.timestamp)}`,
            content: email.content
        });

        this.showModal('emailModal');
        this.loadEmails();
    }

    openComposeModal(to = '', subject = '', message = '', activationCode = '') {
        ['composeTo', 'composeSubject', 'composeMessage', 'composeActivationCode'].forEach((id, idx) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.value = [to, subject, message, activationCode][idx];
        });

        this.showModal('composeModal');
        const composeTo = document.getElementById('composeTo');
        if (composeTo) composeTo.focus();
    }

    async sendEmail() {
        const to = document.getElementById('composeTo')?.value.trim();
        const subject = document.getElementById('composeSubject')?.value.trim();
        const message = document.getElementById('composeMessage')?.value.trim();
        const activationCode = document.getElementById('composeActivationCode')?.value.trim() || '';

        if (!to || !subject || !message) return showNotification('Erro', 'Preencha todos os campos obrigatórios', 'error');
        if (!this.isValidEmail(to)) return showNotification('Erro', 'Email inválido', 'error');

        showNotification('Enviando', 'Enviando email...', 'info');

        try {
            const result = await this.postToApi({ sendTo: to, subject, activationCode: message });
            const wasAccepted = result.statusCode === 202 || result.status === 'accepted';

            this.addEmail({
                sender: "tridonjoseacacio@gmail.com",
                recipient: to,
                subject,
                content: message,
                activationCode,
                tab: 'sent',
                apiResponse: result,
                status: wasAccepted ? 'processing' : 'sent'
            });

            this.closeComposeModal();
            this.switchTab('sent');

            showNotification(wasAccepted ? 'Email Aceito' : 'Email Enviado', 
                `Email ${wasAccepted ? 'aceito para processamento' : 'enviado'} para ${to}`, 'success');

        } catch (error) {
            console.error('Erro ao enviar email:', error);

            this.addEmail({
                sender: "tridonjoseacacio@gmail.com",
                recipient: to,
                subject,
                content: message,
                activationCode,
                tab: 'drafts',
                error: error.message,
                status: 'failed'
            });

            this.closeComposeModal();
            this.switchTab('drafts');

            showNotification('Erro no Envio', `Falha ao enviar: ${error.message}. Salvo como rascunho.`, 'error');
        }
    }

    async postToApi(emailData) {
        const response = await fetch(this.API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData)
        });

        const raw = await response.text();
        let parsed;
        try { parsed = JSON.parse(raw); } catch { parsed = raw; }

        if (response.status === 202) return { status: 'accepted', statusCode: 202, message: 'Email aceito', raw: parsed };
        if (response.ok) return { status: 'success', statusCode: response.status, ...(typeof parsed === 'object' ? parsed : { message: parsed }) };

        throw new Error(`Erro ${response.status}${parsed?.message ? ': ' + parsed.message : ''}`);
    }

    saveDraft() {
        const to = document.getElementById('composeTo')?.value.trim() || "sem destinatário";
        const subject = document.getElementById('composeSubject')?.value.trim() || "Novo Rascunho";
        const message = document.getElementById('composeMessage')?.value.trim() || "Rascunho vazio...";
        const activationCode = document.getElementById('composeActivationCode')?.value.trim() || '';

        this.addEmail({
            sender: "me@admin.com",
            recipient: to,
            subject,
            content: message,
            preview: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
            activationCode,
            tab: 'drafts',
            read: true
        });

        this.closeComposeModal();
        this.switchTab('drafts');
        showNotification('Rascunho Salvo', 'Rascunho salvo com sucesso', 'success');
    }

    addEmail(email) {
        const newEmail = {
            id: Date.now(),
            ...email,
            preview: email.preview || (email.content.substring(0, 100) + (email.content.length > 100 ? '...' : '')),
            timestamp: new Date().toISOString(),
            read: email.read ?? false
        };
        this.emails.push(newEmail);
        this.saveEmails();
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        document.querySelectorAll('.email-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        this.loadEmails();
    }

    getTabName(tab) {
        return { inbox: 'Caixa de Entrada', sent: 'Enviados', drafts: 'Rascunhos' }[tab] || tab;
    }

    // ====================
    // Utilitários de data
    // ====================
    formatTime(ts) {
        try { return new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
        catch { return ''; }
    }

    formatDate(ts) {
        try {
            const date = new Date(ts), today = new Date(), yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            if (date.toDateString() === today.toDateString()) return 'Hoje';
            if (date.toDateString() === yesterday.toDateString()) return 'Ontem';
            return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch { return ''; }
    }

    formatFullDate(ts) {
        try { return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
        catch { return ''; }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ====================
    // Modal
    // ====================
    setModalContent(modalId, { title = '', sender = '', date = '', content = '' }) {
        const mapping = { modalTitle: title, modalSender: sender, modalDate: date, modalContent: content };
        Object.entries(mapping).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });
    }

    showModal(modalId) {
        const overlay = document.getElementById(`${modalId}Overlay`);
        const modal = document.getElementById(modalId);
        if (overlay) overlay.classList.add('show');
        if (modal) modal.classList.add('show');
    }

    closeModal(modalId) {
        const overlay = document.getElementById(`${modalId}Overlay`);
        const modal = document.getElementById(modalId);
        if (overlay) overlay.classList.remove('show');
        if (modal) modal.classList.remove('show');
    }

    closeViewModal() { this.closeModal('emailModal'); }
    closeComposeModal() {
        this.closeModal('composeModal');
        const composeForm = document.getElementById('composeForm');
        if (composeForm) composeForm.reset();
    }

    // ====================
    // Event Listeners
    // ====================
    setupEventListeners() {
        // Tabs
        document.querySelectorAll('.email-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Compose
        document.getElementById('composeEmail')?.addEventListener('click', () => this.openComposeModal());
        document.getElementById('composeForm')?.addEventListener('submit', e => { e.preventDefault(); this.sendEmail(); });
        document.getElementById('saveDraftBtn')?.addEventListener('click', () => this.saveDraft());
        document.getElementById('cancelComposeBtn')?.addEventListener('click', () => this.closeComposeModal());
        document.getElementById('modalClose')?.addEventListener('click', () => this.closeViewModal());
        document.getElementById('composeModalClose')?.addEventListener('click', () => this.closeComposeModal());

        // Click fora do modal
        ['emailModal', 'composeModal'].forEach(modalId => {
            const overlay = document.getElementById(`${modalId}Overlay`);
            overlay?.addEventListener('click', e => { if (e.target === overlay) this.closeModal(modalId); });
        });

        // Esc key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') { this.closeViewModal(); this.closeComposeModal(); }
        });

        if (!this.emails.length) this.loadSampleEmails();
    }

    loadSampleEmails() {
        this.emails = [];
        this.saveEmails();
        this.loadEmails();
    }

    saveEmails() {
        localStorage.setItem('keymaster_emails', JSON.stringify(this.emails));
    }
}

// ============================
// Função auxiliar de Notificações
// ============================
function showNotification(title, message, type = 'info') {
    const notification = document.getElementById('notification');
    const titleEl = document.getElementById('notificationTitle');
    const msgEl = document.getElementById('notificationMessage');
    if (!notification || !titleEl || !msgEl) return;

    titleEl.textContent = title;
    msgEl.textContent = message;
    notification.className = `notification ${type}`;

    const icon = notification.querySelector('.notification-icon i');
    if (icon) icon.className = {
        success: 'fas fa-check',
        error: 'fas fa-times',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    }[type] || 'fas fa-info-circle';

    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 4000);
}

// ============================
// Inicialização
// ============================
document.addEventListener('DOMContentLoaded', () => {
    window.emailSystem = new EmailSystem();
});
