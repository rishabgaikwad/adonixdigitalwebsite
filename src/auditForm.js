import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scroll to form when clicking CTA
    const ctaBtns = document.querySelectorAll('a[href="#audit-form-section"]');
    ctaBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#audit-form-section');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. Industry "Other" reveal logic
    const industrySelect = document.getElementById('audit_industry');
    const industryOtherInput = document.getElementById('audit_industry_other');

    if (industrySelect && industryOtherInput) {
        industrySelect.addEventListener('change', (e) => {
            if (e.target.value === 'Other' || e.target.options[e.target.selectedIndex].getAttribute('data-translate') === 'audit_form_ind_other') {
                industryOtherInput.style.display = 'block';
                industryOtherInput.setAttribute('required', 'true');
            } else {
                industryOtherInput.style.display = 'none';
                industryOtherInput.removeAttribute('required');
            }
        });
    }

    // 3. Form Validation & Submission
    const form = document.getElementById('audit-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const fields = [
                { id: 'audit_name', type: 'text' },
                { id: 'audit_company', type: 'text' },
                { id: 'audit_phone', type: 'tel' },
                { id: 'audit_email', type: 'email' },
                { id: 'audit_city', type: 'text' },
                { id: 'audit_industry', type: 'select' },
                { id: 'audit_budget', type: 'select' }
            ];

            fields.forEach(field => {
                const el = document.getElementById(field.id);
                const errorEl = el.nextElementSibling;
                const val = el.value.trim();
                if (!val || (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
                    isValid = false;
                    if(errorEl && errorEl.classList.contains('error-msg')) errorEl.style.display = 'block';
                    el.style.borderColor = '#e879a8';
                } else {
                    if(errorEl && errorEl.classList.contains('error-msg')) errorEl.style.display = 'none';
                    el.style.borderColor = 'rgba(255,255,255,0.1)';
                }
            });

            if (industrySelect.value === 'Other' || industrySelect.options[industrySelect.selectedIndex]?.getAttribute('data-translate') === 'audit_form_ind_other') {
                if (!industryOtherInput.value) {
                    isValid = false;
                    industryOtherInput.style.borderColor = '#e879a8';
                    const err = industryOtherInput.nextElementSibling;
                    if(err && err.classList.contains('error-msg')) err.style.display = 'block';
                } else {
                    industryOtherInput.style.borderColor = 'rgba(255,255,255,0.1)';
                    const err = industryOtherInput.nextElementSibling;
                    if(err && err.classList.contains('error-msg')) err.style.display = 'none';
                }
            }

            const globalError = document.getElementById('form-error-global');
            if (!isValid) {
                globalError.style.display = 'block';
                return;
            }
            globalError.style.display = 'none';

            // Prepare Payload
            const submitBtn = document.getElementById('audit-submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span style="color:white;">Processing...</span>';
            submitBtn.style.pointerEvents = 'none';

            const phoneCode = document.getElementById('audit_phone_code').value;
            const phone = document.getElementById('audit_phone').value;
            const industry = industrySelect.value === 'Other' ? industryOtherInput.value : industrySelect.value;
            const website = document.getElementById('audit_website').value || 'Not provided';

            const payload1 = {
                access_key: 'f06c8e4f-4415-4c9e-9299-b35c9bee425d',
                subject: 'New Ad Funnel AI Audit Request',
                name: document.getElementById('audit_name').value,
                company: document.getElementById('audit_company').value,
                phone: `${phoneCode} ${phone}`,
                email: document.getElementById('audit_email').value,
                city: document.getElementById('audit_city').value,
                website: website,
                industry: industry,
                budget: document.getElementById('audit_budget').value
            };
            
            const payload2 = {
                ...payload1,
                access_key: 'feac2717-4f3b-4e00-aec6-713775282534'
            };

            try {
                const fetchConfig = (p) => ({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(p)
                });
                
                const [response, response2] = await Promise.all([
                    fetch('https://api.web3forms.com/submit', fetchConfig(payload1)),
                    fetch('https://api.web3forms.com/submit', fetchConfig(payload2))
                ]);

                const result = await response.json();
                
                if (response.status === 200) {
                    // Fire Meta Pixel Event
                    if (typeof fbq === 'function') {
                        fbq('track', 'Lead');
                    }
                    
                    // Redirect to Thank You page
                    window.location.href = '/thank-you-audit.html';
                } else {
                    console.error(result);
                    globalError.innerText = result.message || 'Submission failed. Please try again.';
                    globalError.style.display = 'block';
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.pointerEvents = 'auto';
                }
            } catch (error) {
                console.error(error);
                globalError.innerText = 'Network error. Please try again.';
                globalError.style.display = 'block';
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.pointerEvents = 'auto';
            }
        });
    }
});
