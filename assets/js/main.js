/**
 * FINORA - FINANCE MADE SIMPLER
 * Interactive Controller: Consultation Forms, Dynamic EMI Calculator & Modals
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DYNAMIC FINORA LOAN EMI CALCULATOR (EXACT REFERENCE FORMULAS)
  // =========================================================================
  const loanAmountRange = document.getElementById('loanAmountRange');
  const loanAmountInput = document.getElementById('loanAmountInput');

  const interestRateRange = document.getElementById('interestRateRange');
  const interestRateInput = document.getElementById('interestRateInput');

  const loanTenureRange = document.getElementById('loanTenureRange');
  const loanTenureInput = document.getElementById('loanTenureInput');

  const calcEmiValue = document.getElementById('calcEmiValue');
  const calcInterestValue = document.getElementById('calcInterestValue');
  const calcRepaymentValue = document.getElementById('calcRepaymentValue');

  function calculateFinoraEmi(principal, annualRate, tenureYears) {
    const monthlyRate = (annualRate / 12) / 100;
    const months = tenureYears * 12;
    if (monthlyRate === 0) return Math.round(principal / months);

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  }

  function updateSliderFill(slider) {
    if (!slider) return;
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value) || 0;
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #00A884 0%, #00A884 ${pct}%, #E2E8F0 ${pct}%, #E2E8F0 100%)`;
  }

  function updateFinoraEmiCalculations() {
    if (!loanAmountRange || !interestRateRange || !loanTenureRange) return;

    const principal = parseFloat(loanAmountRange.value) || 5000000;
    const rate = parseFloat(interestRateRange.value) || 8.5;
    const tenureYears = parseInt(loanTenureRange.value, 10) || 20;

    const emi = calculateFinoraEmi(principal, rate, tenureYears);
    const totalRepayment = emi * (tenureYears * 12);
    const totalInterest = Math.max(0, totalRepayment - principal);

    // Update Input Display Values
    if (loanAmountInput) {
      loanAmountInput.value = `₹ ${principal.toLocaleString('en-IN')}`;
    }
    if (interestRateInput) {
      interestRateInput.value = `${rate.toFixed(1)}%`.replace('.0%', '%');
    }
    if (loanTenureInput) {
      loanTenureInput.value = `${tenureYears} Years`;
    }

    // Update Output Summary Values
    if (calcEmiValue) {
      calcEmiValue.textContent = `₹ ${emi.toLocaleString('en-IN')}`;
    }
    if (calcInterestValue) {
      calcInterestValue.textContent = `₹ ${totalInterest.toLocaleString('en-IN')}`;
    }
    if (calcRepaymentValue) {
      calcRepaymentValue.textContent = `₹ ${totalRepayment.toLocaleString('en-IN')}`;
    }

    // Visual Slider Track Fill
    updateSliderFill(loanAmountRange);
    updateSliderFill(interestRateRange);
    updateSliderFill(loanTenureRange);
  }

  if (loanAmountRange) loanAmountRange.addEventListener('input', updateFinoraEmiCalculations);
  if (interestRateRange) interestRateRange.addEventListener('input', updateFinoraEmiCalculations);
  if (loanTenureRange) loanTenureRange.addEventListener('input', updateFinoraEmiCalculations);

  updateFinoraEmiCalculations();

  // =========================================================================
  // 2. CONSULTATION FORM SUBMISSION
  // =========================================================================
  const heroConsultationForm = document.getElementById('heroConsultationForm');
  const consultationSuccess = document.getElementById('consultationSuccess');

  if (heroConsultationForm) {
    heroConsultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      heroConsultationForm.style.opacity = '0.4';
      heroConsultationForm.style.pointerEvents = 'none';

      setTimeout(() => {
        heroConsultationForm.reset();
        heroConsultationForm.style.display = 'none';
        if (consultationSuccess) {
          consultationSuccess.style.display = 'block';
        }
      }, 600);
    });
  }

  // =========================================================================
  // 3. CONSULTATION MODAL DIALOG
  // =========================================================================
  const consultationModal = document.getElementById('consultationModal');
  const openModalBtns = document.querySelectorAll('.js-open-consultation-modal');
  const closeModalBtns = document.querySelectorAll('.js-close-modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (consultationModal) consultationModal.classList.add('active');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-overlay-finora');
      if (parentModal) parentModal.classList.remove('active');
    });
  });

  // Close on outside overlay click
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay-finora')) {
      e.target.classList.remove('active');
    }
  });

  // =========================================================================
  // 4. VIDEO MODAL DIALOG
  // =========================================================================
  const videoModal = document.getElementById('videoModal');
  const openVideoBtn = document.getElementById('openVideoBtn');

  if (openVideoBtn && videoModal) {
    openVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      videoModal.classList.add('active');
    });
  }

  // =========================================================================
  // 5. MOBILE MENU TOGGLE
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksMenu = document.querySelector('.nav-links-menu');

  if (mobileMenuBtn && navLinksMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinksMenu.style.display === 'flex';
      navLinksMenu.style.display = isOpen ? 'none' : 'flex';
      navLinksMenu.style.flexDirection = 'column';
      navLinksMenu.style.position = 'absolute';
      navLinksMenu.style.top = '100%';
      navLinksMenu.style.left = '0';
      navLinksMenu.style.right = '0';
      navLinksMenu.style.background = '#FFFFFF';
      navLinksMenu.style.padding = '20px 24px';
      navLinksMenu.style.boxShadow = '0 10px 25px rgba(10, 37, 64, 0.1)';
      navLinksMenu.style.gap = '14px';
    });
  }

  // =========================================================================
  // 6. SCROLL TO TOP CONTROLLER
  // =========================================================================
  const scrollToTopBtn = document.querySelector('.js-scroll-to-top');
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  console.log('Finora - Finance Made Simpler initialized successfully.');
});
