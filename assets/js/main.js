// Clean Portfolio JavaScript - Minimal and focused
document.addEventListener('DOMContentLoaded', function () {
	// Smooth scrolling for navigation links
	const navLinks = document.querySelectorAll('a[href^="#"]');

	navLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('href');
			const targetSection = document.querySelector(targetId);

			if (targetSection) {
				const offsetTop = targetSection.offsetTop - 32; // Small offset for clean spacing

				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth',
				});
			}
		});
	});

	// Simple fade-in animation for sections
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	// Observe sections for subtle animations
	const sections = document.querySelectorAll('section');
	sections.forEach((section) => {
		section.style.opacity = '0';
		section.style.transform = 'translateY(10px)';
		section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
		observer.observe(section);
	});

	// Email link tracking (optional)
	const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
	emailLinks.forEach((link) => {
		link.addEventListener('click', function () {
			console.log('Email link clicked');
		});
	});
});
