// ===== Page Navigation =====
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.page).classList.add('active');
    });
});

// ===== Filter Interactions =====
document.querySelectorAll('.filter-select').forEach(select => {
    select.addEventListener('change', () => {
        // Simulate data refresh animation
        document.querySelectorAll('.widget').forEach(w => {
            w.style.opacity = '0.5';
            setTimeout(() => { w.style.opacity = '1'; }, 300);
        });
    });
});

// ===== Widget Hover Effects =====
document.querySelectorAll('.widget').forEach(widget => {
    widget.addEventListener('mouseenter', () => {
        const decision = widget.querySelector('.widget-decision');
        if (decision) {
            decision.style.borderColor = 'var(--accent-blue)';
        }
    });
    widget.addEventListener('mouseleave', () => {
        const decision = widget.querySelector('.widget-decision');
        if (decision) {
            decision.style.borderColor = 'var(--border)';
        }
    });
});
