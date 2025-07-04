document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output")
  const input = document.getElementById("input")
  const display = document.getElementById("display")
  const audio = document.getElementById("audio")
  const volumeSlider = document.getElementById("volume-slider")
  const volumeDisplay = document.querySelector(".volume-display")
  const volumeIcon = document.querySelector(".volume-icon")

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
  }

  // Enhanced commands with better descriptions and functionality
  const commands = {
    help: () => {
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
    <li><span class="command-name">theme [default|light|matrix|neon]</span> - Change theme</li>
    <li><span class="command-name">music [play|stop|pause|toggle|status]</span> - Control synthwave music</li>
    <li><span class="command-name">volume [0-100]</span> - Set music volume</li>
    <li><span class="command-name">clear</span> - Clear terminal output</li>
    <li><span class="command-name">whoami</span> - Display current user</li>
    <li><span class="command-name">date</span> - Show current date and time</li>
  </ul>
  <p class="mt-3 text-sm opacity-75">💡 Tip: Use Tab for auto-complete, Up/Down arrows for command history</p>
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
      <p class="text-sm mt-2 opacity-75">Automated video creation using OpenAI and FFmpeg</p>
      <div class="tech-stack">
        <span class="tech-tag">Python</span>
        <span class="tech-tag">OpenAI API</span>
        <span class="tech-tag">FFmpeg</span>
      </div>
    </div>
    <div class="project-card">
      <h3 class="text-lg font-bold text-cyan-300">E-commerce Headless CMS</h3>
      <p class="text-sm mt-2 opacity-75">Scalable e-commerce solution with modern architecture</p>
      <div class="tech-stack">
        <span class="tech-tag">React</span>
        <span class="tech-tag">Node.js</span>
        <span class="tech-tag">MongoDB</span>
      </div>
    </div>
    <div class="project-card">
      <h3 class="text-lg font-bold text-cyan-300">
        <a href="https://pocketcaps.com/" target="_blank" class="text-pink-500 hover:underline">PocketCaps</a>
      </h3>
      <p class="text-sm mt-2 opacity-75">Comprehensive trading card management platform</p>
      <div class="tech-stack">
        <span class="tech-tag">MERN Stack</span>
        <span class="tech-tag">Authentication</span>
        <span class="tech-tag">Real-time Updates</span>
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
      <span class="contact-label">📧 Email:</span>
      <a href="mailto:mackenzie.sampson@outlook.com" class="text-pink-500 hover:underline">
        mackenzie.sampson@outlook.com
      </a>
    </div>
    <div class="contact-item">
      <span class="contact-label">💼 LinkedIn:</span>
      <a href="#" class="text-pink-500 hover:underline">linkedin.com/in/mackenzie-sampson</a>
    </div>
    <div class="contact-item">
      <span class="contact-label">💻 GitHub:</span>
      <a href="#" class="text-pink-500 hover:underline">github.com/mackenzie-sampson</a>
    </div>
    <div class="contact-item">
      <span class="contact-label">🌐 Portfolio:</span>
      <span class="text-cyan-300">You're here! 🎉</span>
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
        <li>🚀 Full-stack Development</li>
        <li>🤖 AI/ML Integration</li>
        <li>🎮 Game Development</li>
        <li>🌐 Web3 Technologies</li>
        <li>📱 Mobile Development</li>
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
<div class="resume-content">
  <h2 class="text-2xl font-bold mb-4 text-pink-500">Resume</h2>
  <div class="resume-section">
    <h3 class="text-lg font-bold text-cyan-300 mb-2">Experience</h3>
    <div class="experience-item">
      <h4 class="font-bold">Full-Stack Developer</h4>
      <p class="text-sm opacity-75">2022 - Present</p>
      <p class="text-sm mt-1">
        Developing modern web applications with focus on user experience and scalability.
        Working with MERN stack, Python, and cloud technologies.
      </p>
    </div>
  </div>
  <div class="resume-section">
    <h3 class="text-lg font-bold text-cyan-300 mb-2">Education</h3>
    <div class="education-item">
      <h4 class="font-bold">Computer Science</h4>
      <p class="text-sm opacity-75">Ongoing Studies</p>
      <p class="text-sm mt-1">
        Focused on software engineering principles, algorithms, and modern development practices.
      </p>
    </div>
  </div>
  <div class="mt-4">
    <button class="download-btn text-pink-500 hover:underline">
      📄 Download Full Resume (PDF)
    </button>
  </div>
</div>`
      displayContent(resumeHtml)
      return "Resume loaded. Click download for full PDF."
    },

    theme: (theme) => {
      const themes = {
        default: {
          bg: "bg-purple-900",
          text: "text-cyan-300",
          prompt: "text-pink-500",
          name: "default retro",
        },
        light: {
          bg: "bg-gray-100",
          text: "text-gray-900",
          prompt: "text-blue-600",
          name: "light mode",
        },
        matrix: {
          bg: "bg-black",
          text: "text-green-400",
          prompt: "text-green-400",
          name: "matrix",
        },
        neon: {
          bg: "bg-gray-900",
          text: "text-cyan-400",
          prompt: "text-magenta-500",
          name: "neon",
        },
      }

      if (themes[theme]) {
        const body = document.querySelector("body")
        const prompt = document.querySelector(".flex > span")

        Object.values(themes).forEach((t) => {
          body.classList.remove(t.bg, t.text)
          if (prompt) prompt.classList.remove(t.prompt)
        })

        body.classList.add(themes[theme].bg, themes[theme].text)
        if (prompt) prompt.classList.add(themes[theme].prompt)
        return `Theme changed to ${themes[theme].name}`
      } else {
        return "Available themes: default, light, matrix, neon"
      }
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
        return "🎵 Playing happy synthwave music... 🌈"
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
          return "🎵 Music resumed."
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
        return `🎵 Music: ${status} | Volume: ${currentVolume} | Time: ${timeFormatted}/${durationFormatted}`
      } else {
        return "Usage: music [play|stop|pause|toggle|status]"
      }
    },

    volume: (level) => {
      if (!audio) {
        return "❌ No audio file found."
      }

      if (level === undefined) {
        return `🔊 Current volume: ${currentVolume}`
      }

      const newVolume = parseInt(level)
      if (isNaN(newVolume) || newVolume < 0 || newVolume > 100) {
        return "Usage: volume [0-100]"
      }

      setVolume(newVolume)
      return `🔊 Volume set to ${newVolume}%`
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
      volumeIcon.textContent = "🔇"
    } else if (currentVolume < 30) {
      volumeIcon.textContent = "🔈"
    } else if (currentVolume < 70) {
      volumeIcon.textContent = "🔉"
    } else {
      volumeIcon.textContent = "🔊"
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
    const p = document.createElement("p")
    p.className = `terminal-line ${type}`

    if (type === "command") {
      p.innerHTML = `<span class="command-prompt">></span> ${highlightCode(
        message
      )}`
    } else if (type === "error") {
      p.innerHTML = `<span class="error-text">❌ ${message}</span>`
    } else if (type === "success") {
      p.innerHTML = `<span class="success-text">✅ ${message}</span>`
    } else {
      p.innerHTML = highlightCode(message)
    }

    output.appendChild(p)
    output.scrollTop = output.scrollHeight
  }

  // Enhanced command handling with better error messages
  const handleCommand = async (commandStr) => {
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
      return
    }

    if (commands[command]) {
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
        if (result) {
          printToTerminal(result, "success")
        }
      } catch (error) {
        printToTerminal(`Error executing command: ${error.message}`, "error")
      }
    } else {
      // Enhanced error handling with suggestions
      const suggestions = autoComplete(command)
      let errorMessage = `Command not found: ${command}`

      if (suggestions.length > 0) {
        errorMessage += `\nDid you mean: ${suggestions.slice(0, 3).join(", ")}?`
      }

      printToTerminal(errorMessage, "error")
    }

    input.value = ""
    input.focus()
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

  // Enhanced welcome message
  const welcomeMessage = () => {
    const welcomeHtml = `
<div class="welcome-display">
  <h2 class="text-2xl font-bold mb-4 text-pink-500">Welcome! 👋</h2>
  <p class="mb-4">This is an interactive terminal portfolio. Start by typing a command!</p>
  <div class="quick-commands">
    <h3 class="text-lg font-bold mb-2 text-cyan-300">Quick Start:</h3>
    <ul class="command-suggestions">
      <li>Type <code class="code-highlight">help</code> to see all commands</li>
      <li>Type <code class="code-highlight">about</code> to learn about me</li>
      <li>Type <code class="code-highlight">projects</code> to see my work</li>
      <li>Use <kbd>Tab</kbd> for auto-complete</li>
      <li>Use <kbd>↑/↓</kbd> for command history</li>
    </ul>
  </div>
</div>`

    displayContent(welcomeHtml)

    // Type welcome message in terminal
    setTimeout(() => {
      printToTerminal(
        "Welcome to Mackenzie Sampson's interactive portfolio! 🚀",
        "success"
      )
      printToTerminal(
        "Type 'help' to see available commands, or try 'about' to learn more about me.",
        "normal"
      )
    }, 500)
  }

  // Initialize the terminal
  welcomeMessage()
})
