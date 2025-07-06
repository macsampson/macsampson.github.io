document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output")
  const input = document.getElementById("input")
  const display = document.getElementById("display")
  const audio = document.getElementById("audio")
  const volumeSlider = document.getElementById("volume-slider")
  const volumeDisplay = document.querySelector(".volume-display")
  const volumeIcon = document.querySelector(".volume-icon")

  // Debug logging
  console.log("Terminal initialization starting...")
  console.log("Elements found:", {
    output: !!output,
    input: !!input,
    display: !!display,
    audio: !!audio,
    volumeSlider: !!volumeSlider,
    volumeDisplay: !!volumeDisplay,
    volumeIcon: !!volumeIcon,
  })

  // Command history management
  let commandHistory = []
  let historyIndex = -1

  // Loading state management
  let isLoading = false

  // Audio state management
  let isPlaying = false
  let currentVolume = 50

  // Ensure input gets focus
  if (input) {
    input.focus()
    input.addEventListener("click", () => {
      input.focus()
    })
    console.log("Input focus handlers added")
  } else {
    console.error("Input element not found!")
  }

  // Click anywhere in terminal to focus input
  const terminal = document.getElementById("terminal")
  if (terminal && input) {
    terminal.addEventListener("click", (e) => {
      // Only focus if not clicking on a clickable element
      if (
        !e.target.closest("button") &&
        !e.target.closest("a") &&
        !e.target.closest("input")
      ) {
        input.focus()
        e.preventDefault()
      }
    })
    console.log("Terminal click handler added")
  } else {
    console.error("Terminal element not found!")
  }

  // Mobile-friendly enhancements
  const addMobileSupport = () => {
    // Prevent zoom on input focus for iOS
    if (input) {
      input.addEventListener("focus", () => {
        if (window.innerWidth <= 768) {
          // Temporarily disable zoom
          const viewport = document.querySelector('meta[name="viewport"]')
          if (viewport) {
            viewport.content =
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          }
        }
      })

      input.addEventListener("blur", () => {
        if (window.innerWidth <= 768) {
          // Re-enable zoom after input loses focus
          const viewport = document.querySelector('meta[name="viewport"]')
          if (viewport) {
            viewport.content =
              "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
          }
        }
      })
    }

    // Improve scroll behavior on mobile
    const improveScrolling = () => {
      // Smooth scrolling for terminal output
      if (output) {
        output.style.scrollBehavior = "smooth"
      }
    }

    // Add touch gesture support for command panel
    const addTouchSupport = () => {
      const commandPanel = document.getElementById("commandPanel")
      if (commandPanel) {
        let touchStartY = 0
        let touchEndY = 0

        commandPanel.addEventListener("touchstart", (e) => {
          touchStartY = e.changedTouches[0].screenY
        })

        commandPanel.addEventListener("touchend", (e) => {
          touchEndY = e.changedTouches[0].screenY
          // Add swipe gestures if needed in the future
        })
      }
    }

    // Improve keyboard behavior on mobile
    const improveMobileKeyboard = () => {
      if (input) {
        // Handle virtual keyboard appearance
        const handleKeyboardChange = () => {
          const isKeyboardVisible =
            window.innerHeight < window.screen.height * 0.75

          if (isKeyboardVisible) {
            // Keyboard is visible, adjust layout
            document.body.classList.add("keyboard-visible")
            // Scroll to input when keyboard appears
            setTimeout(() => {
              if (input) {
                input.scrollIntoView({ behavior: "smooth", block: "center" })
              }
            }, 300)
          } else {
            // Keyboard is hidden
            document.body.classList.remove("keyboard-visible")
          }
        }

        // Listen for viewport changes (keyboard show/hide)
        window.addEventListener("resize", handleKeyboardChange)

        // Initial check
        handleKeyboardChange()
      }
    }

    // Add haptic feedback for touch interactions (if supported)
    const addHapticFeedback = () => {
      // This will be called after command panel is initialized
      const addHapticToCommands = () => {
        const commandItems = document.querySelectorAll(".command-item")
        commandItems.forEach((item) => {
          item.addEventListener("touchstart", () => {
            // Haptic feedback for supported devices
            if ("vibrate" in navigator) {
              navigator.vibrate(10) // Very light vibration
            }
          })
        })
      }

      // Return function to be called later
      return addHapticToCommands
    }

    // Initialize mobile enhancements
    improveScrolling()
    addTouchSupport()
    improveMobileKeyboard()

    // Store haptic function for later use
    window.addHapticToCommands = addHapticFeedback()
  }

  // Enhanced commands with better descriptions and functionality
  const commands = {
    help: () => {
      console.log("Help command executed")
      const helpText = `
<div class="help-content">
  <h3 class="text-lg font-bold mb-2 text-pink-500">Available Commands:</h3>
  <ul class="command-list">
    <li><span class="command-name">help</span> - Show this help message</li>
    <li><span class="command-name">projects</span> - View my projects</li>
    <li><span class="command-name">contact</span> - Get my contact information</li>
    <li><span class="command-name">about</span> - Learn more about me</li>
    <li><span class="command-name">skills</span> - View my technical skills</li>
    <li><span class="command-name">resume</span> - View my resume</li>
    <li><span class="command-name">music [play|stop|pause|toggle|status]</span> - Control synthwave music</li>
    <li><span class="command-name">volume [0-100]</span> - Set music volume</li>
    <li><span class="command-name">clear</span> - Clear terminal output</li>
    <li><span class="command-name">whoami</span> - Display current user</li>
    <li><span class="command-name">date</span> - Show current date and time</li>
  </ul>
          <p class="mt-3 text-sm opacity-75"><span class="material-icons">lightbulb</span> Tip: Use Tab for auto-complete, Up/Down arrows for command history</p>
</div>`
      displayContent(helpText)
      return "Help loaded. Use Tab for auto-complete, arrows for history."
    },

    projects: () => {
      const projectsHtml = `
<div class="projects-content">
  <h2 class="text-2xl font-bold mb-4 text-pink-500">My Projects</h2>
  <div class="project-grid">
  <div class="project-card">
      <h3 class="text-lg font-bold text-cyan-300">AI Shorts Video Generator</h3>
      <p class="text-sm mt-2 opacity-75">Automated video creation using Llama 3, Tortoise TTS, Stable Diffusion, and FFmpeg</p>
      <div class="tech-stack">
        <span class="tech-tag">Python</span>
        <span class="tech-tag">Llama 3</span>
        <span class="tech-tag">Tortoise TTS</span>
        <span class="tech-tag">Stable Diffusion</span>
        <span class="tech-tag">FFmpeg</span>
      </div>
    </div>
    <div class="project-card">
      <h3 class="text-lg font-bold text-cyan-300">E-commerce CMS</h3>
      <p class="text-sm mt-2 opacity-75">
        A headless CMS for online shops that allows you to manage your products, orders, and shipping information.
      </p>
      <div class="tech-stack">
        <span class="tech-tag">React</span>
        <span class="tech-tag">TypeScript</span>
        <span class="tech-tag">Next.js</span>
        <span class="tech-tag">Supabase</span>
      </div>
    </div>
    <div class="project-card">
      <h3 class="text-lg font-bold text-cyan-300">
        <a href="https://github.com/macsampson/chatgpt-sidebar" target="_blank" class="text-pink-500 hover:underline">ChatGPT Sidebar</a>
      </h3>
      <p class="text-sm mt-2 opacity-75">A Chrome extension that allows you to use ChatGPT directly in the sidebar of your browser.</p>
      <div class="tech-stack">
        <span class="tech-tag">Chrome Extension</span>
        <span class="tech-tag">JavaScript</span>
      </div>
    </div>
    <div class="project-card">
      <h3 class="text-lg font-bold text-cyan-300">
        <a href="https://github.com/macsampson/codescribe" target="_blank" class="text-pink-500 hover:underline">CodeScribe</a>
      </h3>
      <p class="text-sm mt-2 opacity-75">A Chrome extension that explains code from any GitHub repository.</p>
      <div class="tech-stack">
        <span class="tech-tag">Chrome Extension</span>
        <span class="tech-tag">OpenAI API</span>
      </div>
    </div>
    <div class="project-card">
      <h3 class="text-lg font-bold text-cyan-300">
        <a href="https://github.com/macsampson/cover-letter-gpt" target="_blank" class="text-pink-500 hover:underline">Cover Letter GPT</a>
      </h3>
      <p class="text-sm mt-2 opacity-75">A cover letter generator that utilizes OpenAI's GPT-4.</p>
      <div class="tech-stack">
        <span class="tech-tag">React</span>
        <span class="tech-tag">GPT-4</span>
        <span class="tech-tag">Vercel</span>
      </div>
    </div>
    <div class="project-card">
      <h3 class="text-lg font-bold text-cyan-300">
        <a href="https://parksmart-vancouver.vercel.app/" target="_blank" class="text-pink-500 hover:underline">ParkSmart</a>
      </h3>
      <p class="text-sm mt-2 opacity-75">A web app that helps you to find parking in Metro Vancouver.</p>
      <div class="tech-stack">
        <span class="tech-tag">React</span>
        <span class="tech-tag">JavaScript</span>
        <span class="tech-tag">Google Maps API</span>
      </div>
    </div>
    
    
  </div>
</div>`
      displayContent(projectsHtml)
      return "Projects loaded successfully."
    },

    contact: () => {
      const contactHtml = `
<div class="contact-content">
  <h2 class="text-2xl font-bold mb-4 text-pink-500">Get In Touch</h2>
  <div class="contact-info">
    <div class="contact-item">
      <span class="contact-label"><span class="material-icons">email</span> Email:</span>
      <a href="mailto:mackenzie.sampson@outlook.com" class="text-pink-500 hover:underline">
        mackenzie.sampson@outlook.com
      </a>
    </div>
    <div class="contact-item">
      <span class="contact-label"><span class="material-icons">work</span> LinkedIn:</span>
      <a href="#" class="text-pink-500 hover:underline">linkedin.com/in/mackenzie-sampson</a>
    </div>
    <div class="contact-item">
      <span class="contact-label"><span class="material-icons">code</span> GitHub:</span>
      <a href="#" class="text-pink-500 hover:underline">github.com/mackenzie-sampson</a>
    </div>
    <div class="contact-item">
      <span class="contact-label"><span class="material-icons">language</span> Portfolio:</span>
      <span class="text-cyan-300">You're here! <span class="material-icons">celebration</span></span>
    </div>
  </div>
</div>`
      displayContent(contactHtml)
      return "Contact information loaded."
    },

    about: () => {
      const aboutHtml = `
<div class="about-content">
  <h2 class="text-2xl font-bold mb-4 text-pink-500">About Me</h2>
  <div class="about-text">
    <p class="mb-4">
      Full-stack developer with a passion for creating innovative web applications. 
      I specialize in the MERN stack and Python, with experience in building scalable, 
      user-friendly solutions from concept to deployment.
    </p>
    <p class="mb-4">
      My journey in software development started with curiosity about how things work, 
      and has evolved into a career focused on solving real-world problems through code.
    </p>
    <p class="mb-4">
      When I'm not coding, you can find me exploring new technologies, contributing to 
      open-source projects, or enjoying a good cup of coffee while planning my next project.
    </p>
    <div class="interests">
      <h3 class="text-lg font-bold mb-2 text-cyan-300">Interests:</h3>
      <ul class="interest-list">
        <li><span class="material-icons">rocket_launch</span> Full-stack Development</li>
        <li><span class="material-icons">smart_toy</span> AI/ML Integration</li>
        <li><span class="material-icons">sports_esports</span> Game Development</li>
        <li><span class="material-icons">language</span> Web3 Technologies</li>
        <li><span class="material-icons">phone_android</span> Mobile Development</li>
      </ul>
    </div>
  </div>
</div>`
      displayContent(aboutHtml)
      return "About information loaded."
    },

    skills: () => {
      const skillsHtml = `
<div class="skills-content">
  <h2 class="text-2xl font-bold mb-4 text-pink-500">Technical Skills</h2>
  <div class="skills-grid">
    <div class="skill-category">
      <h3 class="text-lg font-bold text-cyan-300 mb-2">Frontend</h3>
      <div class="skill-tags">
        <span class="skill-tag">React</span>
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">TypeScript</span>
        <span class="skill-tag">HTML/CSS</span>
        <span class="skill-tag">Tailwind CSS</span>
        <span class="skill-tag">Vue.js</span>
      </div>
    </div>
    <div class="skill-category">
      <h3 class="text-lg font-bold text-cyan-300 mb-2">Backend</h3>
      <div class="skill-tags">
        <span class="skill-tag">Node.js</span>
        <span class="skill-tag">Python</span>
        <span class="skill-tag">Express.js</span>
        <span class="skill-tag">Flask</span>
        <span class="skill-tag">Django</span>
        <span class="skill-tag">REST APIs</span>
      </div>
    </div>
    <div class="skill-category">
      <h3 class="text-lg font-bold text-cyan-300 mb-2">Database</h3>
      <div class="skill-tags">
        <span class="skill-tag">MongoDB</span>
        <span class="skill-tag">MySQL</span>
        <span class="skill-tag">PostgreSQL</span>
        <span class="skill-tag">Redis</span>
      </div>
    </div>
    <div class="skill-category">
      <h3 class="text-lg font-bold text-cyan-300 mb-2">Tools & Others</h3>
      <div class="skill-tags">
        <span class="skill-tag">Git</span>
        <span class="skill-tag">Docker</span>
        <span class="skill-tag">AWS</span>
        <span class="skill-tag">Linux</span>
        <span class="skill-tag">CI/CD</span>
      </div>
    </div>
  </div>
</div>`
      displayContent(skillsHtml)
      return "Skills loaded successfully."
    },

    resume: () => {
      const resumeHtml = `
<div class="resume-content space-y-8">
  <h2 class="text-3xl font-bold mb-6 text-pink-500 border-b border-cyan-300 pb-2">Resume</h2>

  <section class="resume-section">
    <h3 class="text-xl font-bold text-pink-500 mb-3">Technical Skills</h3>
    <ul class="list-disc ml-8 text-sm space-y-1 text-cyan-200">
      <li><strong class="text-cyan-300">Languages:</strong> TypeScript/JavaScript, Python, C#, SQL</li>
      <li><strong class="text-cyan-300">Backend:</strong> Node.js, Express.js, FastAPI</li>
      <li><strong class="text-cyan-300">Frontend:</strong> React, Next.js, HTML, CSS</li>
      <li><strong class="text-cyan-300">Databases:</strong> PostgreSQL, MongoDB</li>
      <li><strong class="text-cyan-300">DevOps/Cloud:</strong> Docker, Git, Jenkins, AWS (EC2, S3), Kubernetes</li>
      <li><strong class="text-cyan-300">AI/ML Tools:</strong> Llama 3, Stable Diffusion, Tortoise TTS</li>
    </ul>
  </section>

  <section class="resume-section">
    <h3 class="text-xl font-bold text-pink-500 mb-3">Professional Experience</h3>
    <div class="space-y-6">
      <div>
        <div class="flex flex-col md:flex-row md:justify-between md:items-baseline">
          <span class="font-bold text-gray-100">PocketCaps - Founder & Full-Stack Product Engineer</span>
          <span class="text-xs text-cyan-400 opacity-75">Sept 2020 – Mar 2025 | TypeScript, React, Postgres, NextJS</span>
        </div>
        <ul class="list-disc ml-8 text-sm mt-1 space-y-1">
          <li>Designed and developed a scalable e-commerce platform with Next.js, React, and PostgreSQL.</li>
          <li>Achieved a 250% sales increase and acquired 1,500+ customers within the first year.</li>
          <li>Implemented a custom headless CMS with dynamic inventory and real-time order processing.</li>
          <li>Automated API-driven workflows, reducing manual operations by 80% and minimizing discrepancies.</li>
        </ul>
      </div>
      <div>
        <div class="flex flex-col md:flex-row md:justify-between md:items-baseline">
          <span class="font-bold text-gray-100">Electronic Arts - Tools Software Engineer (Contract)</span>
          <span class="text-xs text-cyan-400 opacity-75">Sept 2019 – Nov 2020 | Python, C#, JIRA</span>
        </div>
        <ul class="list-disc ml-8 text-sm mt-1 space-y-1">
          <li>Developed an automated hair physics integration tool using Python, reducing artist costs by 12%.</li>
          <li>Maintained, updated, and deployed a high-performance asset processing pipeline in C#.</li>
          <li>Reduced processing time by 15% by automating ingestion, transformation, and export of game assets.</li>
          <li>Collaborated with QA, Build Engineering, and Art teams within an Agile framework.</li>
        </ul>
      </div>
      <div>
        <div class="flex flex-col md:flex-row md:justify-between md:items-baseline">
          <span class="font-bold text-gray-100">SAP - Software Engineer Intern (Legal Compliance)</span>
          <span class="text-xs text-cyan-400 opacity-75">May - Dec 2017 | Python, Selenium</span>
        </div>
        <ul class="list-disc ml-8 text-sm mt-1 space-y-1">
          <li>Engineered and presented an automated compliance data entry tool using Python, Pandas, Excel, and Selenium.</li>
          <li>Reduced data entry time by 80% and eliminated 95% of manual errors.</li>
          <li>Improved audit accuracy by 25% and enabled faster compliance reporting through tool integration.</li>
          <li>Tool adoption led to standardized practices and improved efficiency across multiple teams.</li>
        </ul>
      </div>
      <div>
        <div class="flex flex-col md:flex-row md:justify-between md:items-baseline">
          <span class="font-bold text-gray-100">MDA - Junior Web Developer</span>
          <span class="text-xs text-cyan-400 opacity-75">Jan - Sept 2016 | JavaScript, C#, HTML/CSS</span>
        </div>
        <ul class="list-disc ml-8 text-sm mt-1 space-y-1">
          <li>Developed a dynamic infographic using C# and JavaScript, increasing user engagement by 80%.</li>
          <li>Facilitated stakeholder engagement and purchasing of satellite imaging solutions.</li>
          <li>Collaborated with internal clients, resulting in the corporate website release 2 months ahead of schedule.</li>
          <li>Enhanced online presence and reduced project costs by 15%.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="resume-section">
    <h3 class="text-xl font-bold text-pink-500 mb-3">Projects</h3>
    <div class="space-y-6">
      <div>
        <div class="flex flex-col md:flex-row md:justify-between md:items-baseline">
          <span class="font-bold text-gray-100">AI Shorts Video Generator</span>
          <span class="text-xs text-cyan-400 opacity-75">July 2024 - Present | Python, FastAPI, React, Docker, Llama 3, Stable Diffusion, Tortoise TTS, FFmpeg</span>
        </div>
        <ul class="list-disc ml-8 text-sm mt-1 space-y-1">
          <li>Architected a scalable video generation pipeline using FastAPI and Docker.</li>
          <li>Integrated microservices for Llama 3 script generation, Stable Diffusion image creation, and Tortoise TTS voiceovers.</li>
        </ul>
      </div>
      <div>
        <div class="flex flex-col md:flex-row md:justify-between md:items-baseline">
          <span class="font-bold text-gray-100">E-commerce Headless CMS</span>
          <span class="text-xs text-cyan-400 opacity-75">Aug 2021 - June 2024 | React, PostgreSQL, TypeScript, Express, Node</span>
        </div>
        <ul class="list-disc ml-8 text-sm mt-1 space-y-1">
          <li>Engineered a React-based headless CMS with PostgreSQL and Express for RESTful APIs.</li>
          <li>Implemented real-time inventory tracking, automated bundle pricing, and Stripe integration.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="resume-section">
    <h3 class="text-xl font-bold text-pink-500 mb-3">Education</h3>
    <ul class="list-disc ml-8 text-sm space-y-2">
      <li><strong class="text-gray-100">Bachelor of Computer Science</strong><br/><span class="text-cyan-400 opacity-75">University of British Columbia</span></li>
      <li><strong class="text-gray-100">Bachelor of Business Administration (Finance Major)</strong><br/><span class="text-cyan-400 opacity-75">Thompson Rivers University</span></li>
    </ul>
  </section>

  <div class="mt-8">
    <a href="assets/resume/mackenzie_sampson_st.pdf" download target="_blank" class="download-btn text-pink-500 hover:underline flex items-center gap-2 text-lg">
      <span class="material-icons">download</span> Download Full Resume (PDF)
    </a>
  </div>
</div>`
      displayContent(resumeHtml)
      return "Resume loaded. Use the button to download the full PDF."
    },

    music: (action) => {
      if (!audio) {
        return "❌ No audio file found."
      }

      if (action === "play") {
        audio.play().catch(() => {
          return "Music playback requires user interaction first."
        })
        isPlaying = true
        updateVolumeIcon()
        return '<span class="material-icons">music_note</span> Playing happy synthwave music... <span class="material-icons">palette</span>'
      } else if (action === "stop" || action === "pause") {
        audio.pause()
        isPlaying = false
        updateVolumeIcon()
        return "🔇 Music stopped."
      } else if (action === "toggle") {
        if (audio.paused) {
          audio.play().catch(() => {
            return "Music playback requires user interaction first."
          })
          isPlaying = true
          updateVolumeIcon()
          return '<span class="material-icons">music_note</span> Music resumed.'
        } else {
          audio.pause()
          isPlaying = false
          updateVolumeIcon()
          return "⏸️ Music paused."
        }
      } else if (action === "status") {
        const status = audio.paused ? "stopped" : "playing"
        const timeFormatted = formatTime(audio.currentTime)
        const durationFormatted = formatTime(audio.duration)
        return `<span class="material-icons">music_note</span> Music: ${status} | Volume: ${currentVolume} | Time: ${timeFormatted}/${durationFormatted}`
      } else {
        return "Usage: music [play|stop|pause|toggle|status]"
      }
    },

    volume: (level) => {
      if (!audio) {
        return "❌ No audio file found."
      }

      if (level === undefined) {
        return `<span class="material-icons">volume_up</span> Current volume: ${currentVolume}`
      }

      const newVolume = parseInt(level)
      if (isNaN(newVolume) || newVolume < 0 || newVolume > 100) {
        return "Usage: volume [0-100]"
      }

      setVolume(newVolume)
      return `<span class="material-icons">volume_up</span> Volume set to ${newVolume}%`
    },

    clear: () => {
      output.innerHTML = ""
      displayContent(
        '<div class="welcome-message"><h2 class="text-xl text-pink-500">Terminal cleared!</h2><p class="text-sm opacity-75">Type "help" to see available commands.</p></div>'
      )
      return ""
    },

    whoami: () => {
      return "guest@mackenzie-portfolio:~$ You are viewing Mackenzie Sampson's portfolio"
    },

    date: () => {
      const now = new Date()
      return now.toLocaleString()
    },
  }

  // Debug: Log available commands
  console.log("Commands object defined with keys:", Object.keys(commands))
  console.log("Sample command test - help function:", typeof commands.help)

  // Volume control functions
  const setVolume = (volume) => {
    currentVolume = Math.max(0, Math.min(100, volume))
    audio.volume = currentVolume / 100
    volumeSlider.value = currentVolume
    volumeDisplay.textContent = `${currentVolume}`
    updateVolumeIcon()
  }

  const updateVolumeIcon = () => {
    if (currentVolume === 0) {
      volumeIcon.innerHTML = '<span class="material-icons">volume_off</span>'
    } else if (currentVolume < 30) {
      volumeIcon.innerHTML = '<span class="material-icons">volume_down</span>'
    } else if (currentVolume < 70) {
      volumeIcon.innerHTML = '<span class="material-icons">volume_down</span>'
    } else {
      volumeIcon.innerHTML = '<span class="material-icons">volume_up</span>'
    }

    // Add playing animation
    if (isPlaying && !audio.paused) {
      volumeIcon.classList.add("playing")
    } else {
      volumeIcon.classList.remove("playing")
    }
  }

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Auto-complete functionality
  const autoComplete = (input) => {
    const availableCommands = Object.keys(commands)
    const matches = availableCommands.filter((cmd) =>
      cmd.toLowerCase().startsWith(input.toLowerCase())
    )
    return matches
  }

  // Typing animation effect
  const typeWriter = (text, element, speed = 30) => {
    return new Promise((resolve) => {
      element.textContent = ""
      let i = 0
      const timer = setInterval(() => {
        element.textContent += text.charAt(i)
        i++
        if (i > text.length) {
          clearInterval(timer)
          resolve()
        }
      }, speed)
    })
  }

  // Loading state with animated dots
  const createLoadingElement = () => {
    const loadingDiv = document.createElement("div")
    loadingDiv.className = "loading-container"
    loadingDiv.innerHTML = `
      <span class="loading-text">Loading</span>
      <div class="loading-dots">
        <span class="dot">•</span>
        <span class="dot">•</span>
        <span class="dot">•</span>
      </div>
    `
    return loadingDiv
  }

  // Enhanced content display with smooth transitions
  const displayContent = (content) => {
    display.style.opacity = "0"
    display.style.transform = "translateY(10px)"

    setTimeout(() => {
      display.innerHTML = content
      display.style.opacity = "1"
      display.style.transform = "translateY(0)"
    }, 200)
  }

  // Syntax highlighting for code
  const highlightCode = (text) => {
    return text
      .replace(/(`[^`]+`)/g, '<span class="code-highlight">$1</span>')
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" class="text-pink-500 hover:underline">$1</a>'
      )
  }

  // Enhanced terminal output with better formatting
  const printToTerminal = (message, type = "normal") => {
    console.log(`printToTerminal called: "${message}", type: "${type}"`)

    if (!output) {
      console.error("Output element not found in printToTerminal!")
      return
    }

    const p = document.createElement("p")
    p.className = `terminal-line ${type}`

    if (type === "command") {
      p.innerHTML = `<span class="command-prompt">></span> ${highlightCode(
        message
      )}`
    } else if (type === "error") {
      p.innerHTML = `<span class="error-text">❌ ${message}</span>`
    } else if (type === "success") {
      p.innerHTML = `<span class="material-icons">
check_box
</span> ${message}</span>`
    } else {
      p.innerHTML = highlightCode(message)
    }

    output.appendChild(p)
    output.scrollTop = output.scrollHeight
    console.log("Message added to terminal output")
  }

  // Enhanced command handling with better error messages
  const handleCommand = async (commandStr) => {
    console.log(`handleCommand called with: "${commandStr}"`)

    const [command, ...args] = commandStr.trim().split(" ")

    // Add command to history
    if (
      commandStr.trim() &&
      commandHistory[commandHistory.length - 1] !== commandStr
    ) {
      commandHistory.push(commandStr)
    }
    historyIndex = -1

    // Print command
    printToTerminal(commandStr, "command")

    if (!command) {
      console.log("Empty command, returning")
      return
    }

    console.log(
      `Looking for command: "${command}" in commands object:`,
      Object.keys(commands)
    )

    if (commands[command]) {
      console.log(`Command "${command}" found, executing...`)

      // Show loading state for commands that might take time
      if (["projects", "about", "skills", "resume"].includes(command)) {
        isLoading = true
        const loadingElement = createLoadingElement()
        output.appendChild(loadingElement)
        output.scrollTop = output.scrollHeight

        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 800))

        output.removeChild(loadingElement)
        isLoading = false
      }

      try {
        const result = commands[command](...args)
        console.log(`Command result:`, result)
        if (result) {
          printToTerminal(result, "success")
        }

        // Highlight the command in the panel
        highlightActiveCommand(command)
      } catch (error) {
        console.error(`Error executing command "${command}":`, error)
        printToTerminal(`Error executing command: ${error.message}`, "error")
      }
    } else {
      console.log(`Command "${command}" not found`)
      // Enhanced error handling with suggestions
      const suggestions = autoComplete(command)
      let errorMessage = `Command not found: ${command}`

      if (suggestions.length > 0) {
        errorMessage += `\nDid you mean: ${suggestions.slice(0, 3).join(", ")}?`
      }

      printToTerminal(errorMessage, "error")
    }

    if (input) {
      input.value = ""
      input.focus()
    }
  }

  // Enhanced keyboard event handling
  input.addEventListener("keydown", (e) => {
    if (isLoading) return

    switch (e.key) {
      case "Enter":
        if (input.value.trim()) {
          handleCommand(input.value.trim())
        }
        break

      case "Tab":
        e.preventDefault()
        const suggestions = autoComplete(input.value)
        if (suggestions.length === 1) {
          input.value = suggestions[0]
        } else if (suggestions.length > 1) {
          printToTerminal(`Available: ${suggestions.join(", ")}`)
        }
        break

      case "ArrowUp":
        e.preventDefault()
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++
          input.value = commandHistory[commandHistory.length - 1 - historyIndex]
        }
        break

      case "ArrowDown":
        e.preventDefault()
        if (historyIndex > 0) {
          historyIndex--
          input.value = commandHistory[commandHistory.length - 1 - historyIndex]
        } else if (historyIndex === 0) {
          historyIndex = -1
          input.value = ""
        }
        break

      case "Escape":
        input.value = ""
        break
    }
  })

  // Prevent context menu on right click for better terminal feel
  document.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".terminal-container")) {
      e.preventDefault()
    }
  })

  // Volume control event listeners
  if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
      setVolume(parseInt(e.target.value))
    })
  }

  // Volume icon click to toggle mute
  if (volumeIcon) {
    volumeIcon.addEventListener("click", () => {
      if (currentVolume > 0) {
        // Mute
        setVolume(0)
      } else {
        // Unmute to 50%
        setVolume(50)
      }
    })
  }

  // Audio event listeners
  if (audio) {
    audio.addEventListener("loadedmetadata", () => {
      audio.volume = currentVolume / 100
      updateVolumeIcon()
    })

    audio.addEventListener("play", () => {
      isPlaying = true
      updateVolumeIcon()
    })

    audio.addEventListener("pause", () => {
      isPlaying = false
      updateVolumeIcon()
    })

    audio.addEventListener("ended", () => {
      isPlaying = false
      updateVolumeIcon()
    })

    audio.addEventListener("volumechange", () => {
      currentVolume = Math.round(audio.volume * 100)
      volumeSlider.value = currentVolume
      volumeDisplay.textContent = `${currentVolume}`
      updateVolumeIcon()
    })
  }

  // Initialize volume control
  setVolume(currentVolume)

  // Command Panel Functionality
  const initializeCommandPanel = () => {
    console.log("Initializing command panel...")

    const commandPanel = document.getElementById("commandPanel")
    const commandList = document.getElementById("commandList")

    console.log("Command panel elements:", {
      commandPanel: !!commandPanel,
      commandList: !!commandList,
    })

    if (!commandPanel || !commandList) {
      console.error("Command panel elements not found!")
      return
    }

    // Command descriptions and shortcuts
    const commandDescriptions = {
      help: { desc: "Show all available commands", shortcut: "?" },
      projects: { desc: "View my projects and work", shortcut: "p" },
      contact: { desc: "Get contact information", shortcut: "c" },
      about: { desc: "Learn more about me", shortcut: "a" },
      skills: { desc: "View technical skills", shortcut: "s" },
      resume: { desc: "View my resume", shortcut: "r" },
      music: { desc: "Control background music", shortcut: "m" },
      volume: { desc: "Adjust music volume", shortcut: "v" },
      clear: { desc: "Clear terminal output", shortcut: "cls" },
      whoami: { desc: "Display current user", shortcut: "w" },
      date: { desc: "Show current date/time", shortcut: "d" },
    }

    // Generate command list HTML
    const generateCommandList = () => {
      const commandKeys = Object.keys(commands)
      let html = ""

      commandKeys.forEach((cmd) => {
        const info = commandDescriptions[cmd] || {
          desc: "Available command",
          shortcut: "",
        }
        html += `
          <div class="command-item" data-command="${cmd}">
            <span class="command-item-name">${cmd}</span>
            <span class="command-item-desc">${info.desc}</span>
            ${
              info.shortcut
                ? `<span class="command-item-shortcut">${info.shortcut}</span>`
                : ""
            }
          </div>
        `
      })

      return html
    }

    // Populate command list
    commandList.innerHTML = generateCommandList()

    // Add haptic feedback for mobile devices
    if (window.addHapticToCommands) {
      window.addHapticToCommands()
    }

    // Handle command clicks
    commandList.addEventListener("click", (e) => {
      const commandItem = e.target.closest(".command-item")
      if (commandItem) {
        const command = commandItem.dataset.command
        if (command && commands[command]) {
          // Add visual feedback
          commandItem.style.background = "rgba(236, 72, 153, 0.3)"
          setTimeout(() => {
            commandItem.style.background = ""
          }, 200)

          // Execute command
          executeCommandFromPanel(command)
        }
      }
    })

    // Add hover effects with command preview
    commandList.addEventListener("mouseover", (e) => {
      const commandItem = e.target.closest(".command-item")
      if (commandItem) {
        const command = commandItem.dataset.command
        // You could add a tooltip or preview here if desired
      }
    })

    // Add keyboard shortcuts for power users
    document.addEventListener("keydown", (e) => {
      // Only activate shortcuts when not typing in the terminal
      if (e.target === input) return

      if (e.ctrlKey && e.shiftKey) {
        const shortcutMap = {
          KeyH: "help",
          KeyP: "projects",
          KeyC: "contact",
          KeyA: "about",
          KeyS: "skills",
          KeyR: "resume",
          KeyM: "music",
          KeyV: "volume",
          KeyW: "whoami",
          KeyD: "date",
        }

        if (shortcutMap[e.code]) {
          e.preventDefault()
          executeCommandFromPanel(shortcutMap[e.code])
        }
      }
    })
  }

  // Execute command from panel (slightly different from terminal input)
  const executeCommandFromPanel = (command) => {
    // Focus the input and set the command
    input.focus()
    input.value = command

    // Add a small delay to show the command was clicked
    setTimeout(() => {
      handleCommand(command)
    }, 100)
  }

  // Add command highlighting in terminal
  const highlightActiveCommand = (command) => {
    const commandItems = document.querySelectorAll(".command-item")
    commandItems.forEach((item) => {
      if (item.dataset.command === command) {
        item.style.background = "rgba(34, 211, 238, 0.2)"
        item.style.borderColor = "#22d3ee"

        setTimeout(() => {
          item.style.background = ""
          item.style.borderColor = ""
        }, 1000)
      }
    })
  }

  // Initialize command panel
  console.log("About to initialize command panel...")
  initializeCommandPanel()

  // Initialize mobile support
  console.log("About to initialize mobile support...")
  addMobileSupport()

  // Enhanced welcome message
  const welcomeMessage = () => {
    console.log("Welcome message function called")

    if (!display) {
      console.error("Display element not found in welcomeMessage!")
      return
    }

    const isMobile = window.innerWidth <= 768
    const welcomeHtml = `
<div class="welcome-display">
        <h2 class="text-2xl font-bold mb-4 text-pink-500">Welcome! <span class="material-icons">waving_hand</span></h2>
  <p class="mb-4">This is an interactive terminal portfolio. ${
    isMobile ? "Tap to start!" : "Start by typing a command!"
  }</p>
  <div class="quick-commands">
    <h3 class="text-lg font-bold mb-2 text-cyan-300">Quick Start:</h3>
    <ul class="command-suggestions">
      <li>Type <code class="code-highlight">help</code> to see all commands</li>
      <li>Type <code class="code-highlight">resume</code> to view and download my resume</li>
      <li>Type <code class="code-highlight">projects</code> to see my work</li>
      ${!isMobile ? "<li>Use <kbd>Tab</kbd> for auto-complete</li>" : ""}
      ${!isMobile ? "<li>Use <kbd>↑/↓</kbd> for command history</li>" : ""}
      <li>📋 <strong>NEW:</strong> ${
        isMobile ? "Tap" : "Click"
      } commands in the bottom bar!</li>
      
    </ul>
  </div>
</div>`

    console.log("About to display welcome content")
    displayContent(welcomeHtml)

    // Type welcome message in terminal
    setTimeout(() => {
      console.log("About to print welcome messages to terminal")
      printToTerminal(
        'Welcome to Mackenzie Sampson\'s interactive portfolio! <span class="material-icons">rocket_launch</span>',
        "success"
      )
      printToTerminal(
        isMobile
          ? "Tap 'help' to see commands, or tap 'about' to learn more!"
          : "Type 'help' to see available commands, or try 'about' to learn more about me.",
        "normal"
      )
      printToTerminal(
        isMobile
          ? '<span class="material-icons">stars</span> NEW: Tap any command in the bottom bar for instant access!'
          : '<span class="material-icons">stars</span> NEW: Click any command in the bottom bar for instant access!',
        "success"
      )
    }, 500)
  }

  // Initialize the terminal
  console.log("About to call welcomeMessage...")
  welcomeMessage()
  console.log("Terminal initialization complete!")
})
