/* INTRO VIDEO -> PORTFOLIO */
        const introVideo = document.getElementById("car-video");

        introVideo.onended = function () {
            document.getElementById("intro-video").style.display = "none";
            document.getElementById("main-content").style.display = "block";
        };

        /* TYPING ANIMATION */
        const words = [
            "Full Stack Developer",
            "Frontend Developer",
            "Creative Web Designer",
            "Car Enthusiast"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const typingText = document.getElementById("typing-text");
            if (!typingText) return;

            const currentWord = words[wordIndex];

            if (!isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 1200);
                    return;
                }
            } else {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(typeEffect, isDeleting ? 60 : 100);
        }

        window.addEventListener("load", function () {
            typeEffect();
        });

        /* CUSTOM FLOATING CAR CURSOR */
        const dot = document.querySelector(".cursor-dot");
        const outline = document.querySelector(".cursor-outline");

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            dot.style.left = mouseX + "px";
            dot.style.top = mouseY + "px";
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            outline.style.left = outlineX + "px";
            outline.style.top = outlineY + "px";

            requestAnimationFrame(animateOutline);
        }

        animateOutline();

        /* CANVAS NEON TRAIL */
        const canvas = document.getElementById("trailCanvas");
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let trails = [];

        document.addEventListener("mousemove", (e) => {
            trails.push({
                x: e.clientX,
                y: e.clientY,
                life: 24,
                size: Math.random() * 7 + 4
            });

            if (trails.length > 120) {
                trails.shift();
            }
        });

        function animateTrail() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = trails.length - 1; i >= 0; i--) {
                const t = trails[i];

                ctx.beginPath();
                ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 204, 255, ${t.life / 40})`;
                ctx.shadowBlur = 18;
                ctx.shadowColor = "rgba(255, 79, 216, 0.7)";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(t.x + 2, t.y, t.size * 0.55, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 79, 216, ${t.life / 55})`;
                ctx.fill();

                t.life -= 1;

                if (t.life <= 0) {
                    trails.splice(i, 1);
                }
            }

            requestAnimationFrame(animateTrail);
        }

        animateTrail();
        /* SKILL GAUGE ANIMATION */
        const speedometers = document.querySelectorAll(".speedometer");

        let engineAnimated = false;

        function animateSpeedometers() {

            const engineSection = document.getElementById("engine");
            const sectionTop = engineSection.getBoundingClientRect().top;

            if (sectionTop < window.innerHeight && !engineAnimated) {

                speedometers.forEach((meter) => {

                    const speed = meter.getAttribute("data-speed");
                    const needle = meter.querySelector(".needle");

                    const degree = (speed / 100) * 180 - 90;

                    setTimeout(() => {
                        needle.style.transform = "rotate(" + degree + "deg)";
                    }, 300);

                });

                engineAnimated = true;

            }

        }

        window.addEventListener("scroll", animateSpeedometers);

        // pitstop

        const revealElements = document.querySelectorAll("#driver .content, #engine .content, #garage .content, #pitstop .content");

        function revealOnScroll() {
            revealElements.forEach((el) => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight - 100) {
                    el.classList.add("show-reveal");
                }
            });
        }

        window.addEventListener("scroll", revealOnScroll);
        window.addEventListener("load", revealOnScroll);

        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-links a");

        window.addEventListener("scroll", () => {
            let current = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 160;
                const sectionHeight = section.offsetHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active-link");

                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active-link");
                }
            });
        });